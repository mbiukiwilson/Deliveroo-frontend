import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [parcels, setParcels] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/parcels?page=1&per_page=20")
      .then((res) => setParcels(res.data.data))
      .catch((err) => setError(err.response?.data?.error || "Unable to load orders."));
  }, []);

  const visible = filter === "all"
    ? parcels
    : parcels.filter((parcel) => parcel.status === filter);

  const count = (status) =>
    status === "all" ? parcels.length : parcels.filter((p) => p.status === status).length;

  return (
    <main className="page container">
      <div className="page-heading">
        <div>
          <div className="eyebrow">DASHBOARD</div>
          <h1>My orders</h1>
        </div>
        <Link to="/orders/new" className="btn">+ NEW ORDER</Link>
      </div>

      <div className="stats-grid">
        <Stat value={count("all")} label="TOTAL ORDERS" />
        <Stat value={count("pending")} label="PENDING" />
        <Stat value={count("in_transit")} label="IN TRANSIT" />
        <Stat value={count("delivered")} label="DELIVERED" />
      </div>

      <div className="filters">
        {["all", "pending", "in_transit", "delivered", "cancelled"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="orders-panel">
        {visible.length === 0 ? (
          <div className="empty">
            <p>No orders match this filter.</p>
            <Link to="/orders/new" className="btn">CREATE FIRST ORDER</Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>TRACKING ID</th>
                  <th>PICKUP</th>
                  <th>DESTINATION</th>
                  <th>STATUS</th>
                  <th>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((parcel) => (
                  <tr key={parcel.id}>
                    <td><Link to={`/orders/${parcel.id}`}>{parcel.tracking_id}</Link></td>
                    <td>{parcel.pickup_location}</td>
                    <td>{parcel.destination}</td>
                    <td><Status value={parcel.status} /></td>
                    <td>KSh {parcel.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

export function Status({ value }) {
  return <span className={`status status-${value}`}>{value.replace("_", " ")}</span>;
}
