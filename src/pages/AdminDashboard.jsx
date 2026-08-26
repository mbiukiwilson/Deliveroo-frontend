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