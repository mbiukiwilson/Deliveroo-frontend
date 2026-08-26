import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import { t } from "../i18n";

export default function AdminDashboard() {
  const user = useSelector((state) => state.auth.user);
  const { language } = useSelector((state) => state.preferences);
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const watchId = useRef(null);
  const activeParcel = useRef(null);

  async function load() {
    try { setParcels((await api.get("/admin/parcels?page=1&per_page=50")).data.data); }
    catch (err) { setError(err.response?.data?.error || "Unable to load admin parcels."); }
  }

  useEffect(() => {
    load();
    return () => stopGps();
  }, []);

  async function updateStatus(id, status) {
    try { await api.patch(`/admin/parcels/${id}/status`, { status }); await load(); }
    catch (err) { setError(err.response?.data?.error || "Unable to update status."); }
  }

  function stopGps() {
    if (watchId.current !== null) navigator.geolocation?.clearWatch(watchId.current);
    watchId.current = null; activeParcel.current = null;
  }

  function startGps(parcel) {
    if (!navigator.geolocation) { setError("This browser does not support GPS."); return; }
    stopGps();
    activeParcel.current = parcel.id;
    watchId.current = navigator.geolocation.watchPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        await api.patch(`/admin/parcels/${parcel.id}/location`, {
          location: `GPS ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          latitude, longitude,
        });
        load();
      } catch (err) { setError(err.response?.data?.error || "Unable to update GPS location."); }
    }, (err) => setError(err.message), { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 });
  }

  if (user?.role !== "admin") return <main className="page container"><div className="error">Admin access required.</div></main>;

  return <main className="page container">
    <div className="page-heading"><div><div className="eyebrow">ADMIN</div><h1>Parcel operations</h1></div><button className="btn btn-outline" onClick={stopGps}>{t(language, "stopGps")}</button></div>
    {error && <div className="error">{error}</div>}
    <div className="orders-panel admin-panel"><div className="table-wrap"><table><thead><tr><th>ID</th><th>STATUS</th><th>PAYMENT</th><th>CURRENT LOCATION</th><th>ACTIONS</th></tr></thead><tbody>
      {parcels.map((parcel) => <tr key={parcel.id}><td>{parcel.tracking_id}</td><td>{parcel.status}</td><td>{parcel.payment_status}</td><td>{parcel.current_location || "—"}</td><td className="admin-actions"><button className="btn btn-small" onClick={() => startGps(parcel)}>{t(language, "gps")}</button><button className="btn btn-small" onClick={() => updateStatus(parcel.id, "in_transit")} disabled={parcel.payment_status !== "paid"}>IN TRANSIT</button><button className="btn btn-small btn-outline" onClick={() => updateStatus(parcel.id, "delivered")}>DELIVERED</button></td></tr>)}
    </tbody></table></div></div>
  </main>;
}