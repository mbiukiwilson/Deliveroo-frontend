import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setError("");
    setLoading(true);
    setParcel(null);

    try {
      const res = await api.get(`/parcels/track/${trackingId.trim()}`);
      setParcel(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Parcel not found with this tracking ID.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page narrow" style={{ padding: "3rem 1rem", maxWidth: "600px", margin: "0 auto" }}>
      <Link className="back" to="/dashboard">← BACK TO DASHBOARD</Link>
      <div className="eyebrow" style={{ marginTop: "1rem" }}>ORDER TRACKER</div>
      <h1>Track Your Parcel</h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        Enter your tracking ID below to check live delivery status instantly.
      </p>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <label className="field" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span>TRACKING ID</span>
          <input 
            type="text" 
            placeholder="e.g. TRK-98765" 
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
            style={{ padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>
        <button className="btn full" type="submit" disabled={loading} style={{ padding: "0.75rem" }}>
          {loading ? "SEARCHING..." : "TRACK PARCEL"}
        </button>
      </form>

      {error && <div className="error" style={{ marginTop: "1rem", color: "#e53e3e" }}>{error}</div>}

      {parcel && (
        <div className="order-card" style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <strong style={{ fontSize: "1.1rem" }}>{parcel.tracking_id}</strong>
            <span style={{ padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "600", background: "#e2e8f0" }}>
              {parcel.status?.replace("_", " ").toUpperCase()}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}><span>PICKUP</span><strong>{parcel.pickup_location}</strong></div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}><span>DESTINATION</span><strong>{parcel.destination}</strong></div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}><span>CURRENT LOCATION</span><strong>{parcel.current_location || "Awaiting pickup"}</strong></div>
        </div>
      )}
    </main>
  );
}