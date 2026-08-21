import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { Status } from "./Dashboard";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [destination, setDestination] = useState("");
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/parcels/${id}`)
      .then((res) => {
        setParcel(res.data);
        setDestination(res.data.destination);
      })
      .catch((err) => setError(err.response?.data?.error || "Unable to load order."));
  }, [id]);

  async function saveDestination() {
    try {
      const response = await api.patch(`/parcels/${id}/destination`, { destination });
      setParcel(response.data);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to update destination.");
    }
  }

  async function cancel() {
    if (!window.confirm("Cancel this parcel order?")) return;

    try {
      const response = await api.patch(`/parcels/${id}/cancel`);
      setParcel(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to cancel order.");
    }
  }

  if (error) return <main className="page container"><div className="error">{error}</div></main>;
  if (!parcel) return <main className="page container"><p>Loading...</p></main>;

  const locked = ["delivered", "cancelled"].includes(parcel.status);

  return (
    <main className="page container">
      <Link className="back" to="/dashboard">← MY ORDERS</Link>

      <div className="detail-heading">
        <div>
          <div className="eyebrow">ORDER DETAIL</div>
          <h1>{parcel.tracking_id}</h1>
        </div>
        <Status value={parcel.status} />
      </div>

      <div className="detail-grid">
        <section className="detail-card">
          <div className="detail-row"><span>PICKUP</span><strong>{parcel.pickup_location}</strong></div>

          <div className="detail-row">
            <span>DESTINATION</span>
            {editing ? (
              <div className="edit-row">
                <input value={destination} onChange={(e) => setDestination(e.target.value)} />
                <button onClick={saveDestination}>SAVE</button>
              </div>
            ) : (
              <strong>{parcel.destination}</strong>
            )}
          </div>

          <div className="detail-row"><span>WEIGHT</span><strong>{parcel.weight} KG</strong></div>
          <div className="detail-row"><span>PRICE</span><strong>KSh {parcel.price?.toFixed(2)}</strong></div>
          <div className="detail-row"><span>CURRENT LOCATION</span><strong>{parcel.current_location || "Awaiting pickup"}</strong></div>

          {!locked && (
            <div className="detail-actions">
              {!editing && (
                <button className="btn btn-outline" onClick={() => setEditing(true)}>
                  CHANGE DESTINATION
                </button>
              )}
              <button className="danger-button" onClick={cancel}>CANCEL ORDER</button>
            </div>
          )}
        </section>

        <section className="map-card">
          <div className="map-placeholder">
            <span className="map-pin pin-a">A</span>
            <span className="map-pin pin-b">B</span>
            <div className="route-line" />
            <div className="map-label">GOOGLE MAPS ROUTE</div>
          </div>
          <div className="route-meta">
            <div><small>DISTANCE</small><strong>{parcel.distance || "—"} km</strong></div>
            <div><small>DURATION</small><strong>{parcel.duration || "—"}</strong></div>
          </div>
        </section>
      </div>
    </main>
  );
}
