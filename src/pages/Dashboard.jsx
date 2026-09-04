import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api";
import { formatMoney, t } from "../i18n";

export default function Dashboard() {
  const [parcels, setParcels] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const { language, currency } = useSelector((state) => state.preferences);

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const response = await api.get("/parcels?page=1&per_page=20");
        setParcels(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Unable to load orders.");
      }
    }
    load();
  }, []);

  const visible = filter === "all"
    ? parcels
    : parcels.filter((parcel) => parcel.status === filter);

  const count = (status) =>
    status === "all"
      ? parcels.length
      : parcels.filter((parcel) => parcel.status === status).length;

  const filters = [
    ["all", "ALL"],
    ["pending", t(language, "pending")],
    ["in_transit", t(language, "inTransit")],
    ["delivered", t(language, "delivered")],
    ["cancelled", t(language, "cancelled")],
  ];

  return (
    <main className="page container dashboard-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">{t(language, "dashboard")}</div>
          <h1>{t(language, "myOrders")}</h1>
          <p className="page-subtitle">Track and manage your parcel deliveries.</p>
        </div>
        <Link to="/orders/new" className="btn">
          + {t(language, "newOrder")}
        </Link>
      </div>

      <div className="stats-grid">
        <Stat value={count("all")} label="TOTAL ORDERS" />
        <Stat value={count("pending")} label={t(language, "pending")} />
        <Stat value={count("in_transit")} label={t(language, "inTransit")} />
        <Stat value={count("delivered")} label={t(language, "delivered")} />
      </div>

      <div className="filters" aria-label="Order filters">
        {filters.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={filter === value ? "active" : ""}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <div className="error">{error}</div>}

      <section className="orders-panel">
        {visible.length === 0 ? (
          <div className="empty">
            <div>
              <div className="eyebrow">NO ORDERS</div>
              <p>{t(language, "noOrders")}</p>
            </div>
            <Link to="/orders/new" className="btn btn-small">
              + {t(language, "newOrder")}
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t(language, "trackingId") || "TRACKING ID"}</th>
                  <th>{t(language, "pickup")}</th>
                  <th>{t(language, "destination")}</th>
                  <th>{t(language, "status") || "STATUS"}</th>
                  <th>{t(language, "price")}</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((parcel) => (
                  <tr key={parcel.id}>
                    <td>
                      <Link to={`/orders/${parcel.id}`}>{parcel.tracking_id}</Link>
                    </td>
                    <td>{parcel.pickup_location}</td>
                    <td>{parcel.destination}</td>
                    <td><Status value={parcel.status} language={language} /></td>
                    <td>{formatMoney(parcel.price, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
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

export function Status({ value, language = "en" }) {
  const labels = {
    pending: t(language, "pending"),
    in_transit: t(language, "inTransit"),
    delivered: t(language, "delivered"),
    cancelled: t(language, "cancelled"),
  };

  return (
    <span className={`status status-${value}`}>
      {labels[value] || value?.replace("_", " ")}
    </span>
  );
}
