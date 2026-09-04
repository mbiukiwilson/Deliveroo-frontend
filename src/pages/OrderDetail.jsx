import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api";
import { Status } from "./Dashboard";
import MapTracker from "../components/MapTracker";
import { calculateRoute, geocodeAddress } from "../maps";
import { formatMoney, t } from "../i18n";

export default function OrderDetail() {
  const { id } = useParams();
  const { language, currency } = useSelector((state) => state.preferences);
  const [parcel, setParcel] = useState(null);
  const [destination, setDestination] = useState("");
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [paying, setPaying] = useState(false);

  async function load() {
    try {
      const response = await api.get(`/parcels/${id}`);
      setParcel(response.data);
      setDestination(response.data.destination);
    } catch (err) { setError(err.response?.data?.error || "Unable to load order."); }
  }

  useEffect(() => {
    load();
    const timer = setInterval(() => {
      if (parcel?.status === "in_transit") load();
    }, 5000);
    return () => clearInterval(timer);
  }, [id, parcel?.status]);

  async function saveDestination() {
    try {
      const place = await geocodeAddress(destination);
      const origin = parcel.current_lat && parcel.current_lng ? { lat: Number(parcel.current_lat), lng: Number(parcel.current_lng) } : { lat: Number(parcel.pickup_lat), lng: Number(parcel.pickup_lng) };
      const route = await calculateRoute(origin, place);
      const response = await api.patch(`/parcels/${id}/destination`, { destination, destination_lat: place.lat, destination_lng: place.lng, distance: route.distanceKm, duration: route.duration });
      setParcel(response.data);
      setEditing(false);
      setMessage("Destination updated.");
    } catch (err) { setError(err.response?.data?.error || err.message || "Unable to update destination."); }
  }

  async function cancel() {
    if (!window.confirm("Cancel this parcel order?")) return;
    try { setParcel((await api.patch(`/parcels/${id}/cancel`)).data); }
    catch (err) { setError(err.response?.data?.error || "Unable to cancel order."); }
  }

  async function pay() {
    setPaying(true); setError(""); setMessage("");
    try { setParcel((await api.post(`/parcels/${id}/pay`)).data); setMessage(t(language, "paymentSuccess")); }
    catch (err) { setError(err.response?.data?.error || "Unable to process payment."); }
    finally { setPaying(false); }
  }

  if (error && !parcel) return <main className="page container"><div className="error">{error}</div></main>;
  if (!parcel) return <main className="page container"><p>Loading...</p></main>;

  const locked = ["delivered", "cancelled"].includes(parcel.status);
  const pickup = parcel.pickup_lat && parcel.pickup_lng ? { lat: Number(parcel.pickup_lat), lng: Number(parcel.pickup_lng) } : null;
  const destinationPoint = parcel.destination_lat && parcel.destination_lng ? { lat: Number(parcel.destination_lat), lng: Number(parcel.destination_lng) } : null;
  const current = parcel.current_lat && parcel.current_lng ? { lat: Number(parcel.current_lat), lng: Number(parcel.current_lng) } : pickup;

  return (
    <main className="page container">
      <Link className="back" to="/dashboard">← {t(language, "myOrders")}</Link>
      <div className="detail-heading"><div><div className="eyebrow">{t(language, "orderDetail")}</div><h1>{parcel.tracking_id}</h1></div><Status value={parcel.status} language={language} /></div>
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
      <div className="detail-grid">
        <section className="detail-card">
          <div className="detail-row"><span>{t(language, "pickup")}</span><strong>{parcel.pickup_location}</strong></div>
          <div className="detail-row"><span>{t(language, "destination")}</span>{editing ? <div className="edit-row"><input value={destination} onChange={(e) => setDestination(e.target.value)} /><button onClick={saveDestination}>{t(language, "save")}</button></div> : <strong>{parcel.destination}</strong>}</div>
          <div className="detail-row"><span>{t(language, "weight")}</span><strong>{parcel.weight} KG</strong></div>
          <div className="detail-row"><span>{t(language, "price")}</span><strong>{formatMoney(parcel.price, currency)}</strong></div>
          <div className="detail-row"><span>{t(language, "paymentRequired")}</span><strong className={parcel.payment_status === "paid" ? "paid-text" : "unpaid-text"}>{parcel.payment_status === "paid" ? t(language, "paid") : t(language, "paymentRequired")}</strong></div>
          <div className="detail-row"><span>{t(language, "currentLocation")}</span><strong>{parcel.current_location || "Awaiting pickup"}</strong></div>
          {parcel.payment_status !== "paid" && !locked && <button className="btn full pay-button" onClick={pay} disabled={paying}>{paying ? "PROCESSING..." : `${t(language, "payNow")} · ${formatMoney(parcel.price, currency)}`}</button>}
          {parcel.payment_status !== "paid" && !locked && <p className="payment-note">{t(language, "paymentBlock")}</p>}
          {!locked && <div className="detail-actions">{!editing && <button className="btn btn-outline" onClick={() => setEditing(true)}>{t(language, "changeDestination")}</button>}<button className="danger-button" onClick={cancel}>{t(language, "cancelOrder")}</button></div>}
        </section>
        <section className="map-card">
          {pickup && destinationPoint ? <MapTracker pickup={pickup} destination={destinationPoint} current={current} live={parcel.status === "in_transit"} onRoute={() => {}} /> : <div className="map-placeholder"><div className="map-label">Map coordinates are not available for this order yet.</div></div>}
          <div className="route-meta"><div><small>{t(language, "distance")}</small><strong>{parcel.distance ? `${Number(parcel.distance).toFixed(1)} km` : "—"}</strong></div><div><small>{t(language, "duration")}</small><strong>{parcel.duration || "—"}</strong></div><div><small>PAYMENT</small><strong>{parcel.payment_status?.toUpperCase()}</strong></div></div>
        </section>
      </div>
    </main>
  );
}
