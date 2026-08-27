import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import api from "../api";

import {
  formatMoney,
  t,
} from "../i18n";

export default function Dashboard() {
  const [parcels, setParcels] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [error, setError] =
    useState("");

  const {
    language,
    currency,
  } = useSelector(
    (state) => state.preferences
  );

  useEffect(() => {
    async function loadOrders() {
      try {
        setError("");

        const response =
          await api.get(
            "/parcels?page=1&per_page=20"
          );

        setParcels(
          response.data.data || []
        );
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Unable to load orders."
        );
      }
    }

    loadOrders();
  }, []);

  const visible =
    filter === "all"
      ? parcels
      : parcels.filter(
          (parcel) =>
            parcel.status === filter
        );

  const count = (status) =>
    status === "all"
      ? parcels.length
      : parcels.filter(
          (p) => p.status === status
        ).length;

  return (
    <main className="page container">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            {t(
              language,
              "dashboard"
            )}
          </div>

          <h1>
            {t(
              language,
              "myOrders"
            )}
          </h1>
        </div>

        <Link
          to="/orders/new"
          className="btn"
        >
          +{" "}
          {t(
            language,
            "newOrder"
          )}
        </Link>
      </div>

      <div className="stats-grid">
        <Stat
          value={count("all")}
          label={t(
            language,
            "totalOrders"
          )}
        />

        <Stat
          value={count("pending")}
          label={t(
            language,
            "pending"
          )}
        />

        <Stat
          value={count("in_transit")}
          label={t(
            language,
            "inTransit"
          )}
        />

        <Stat
          value={count("delivered")}
          label={t(
            language,
            "delivered"
          )}
        />
      </div>

      <div className="filters">
        {[
          "all",
          "pending",
          "in_transit",
          "delivered",
          "cancelled",
        ].map((item) => (
          <button
            key={item}
            className={
              filter === item
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(item)
            }
          >
            {item
              .replace("_", " ")
              .toUpperCase()}
          </button>
        ))}
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="orders-panel">
        {visible.length === 0 ? (
          <div className="empty">
            <p>
              {t(
                language,
                "noOrders"
              )}
            </p>

            <Link
              to="/orders/new"
              className="btn"
            >
              +{" "}
              {t(
                language,
                "newOrder"
              )}
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>
                    {t(
                      language,
                      "trackingId"
                    )}
                  </th>

                  <th>
                    {t(
                      language,
                      "pickup"
                    ).toUpperCase()}
                  </th>

                  <th>
                    {t(
                      language,
                      "destinationHeader"
                    )}
                  </th>

                  <th>
                    {t(
                      language,
                      "status"
                    )}
                  </th>

                  <th>
                    {t(
                      language,
                      "price"
                    ).toUpperCase()}
                  </th>
                </tr>
              </thead>

              <tbody>
                {visible.map(
                  (parcel) => (
                    <tr
                      key={parcel.id}
                    >
                      <td>
                        <Link
                          to={`/orders/${parcel.id}`}
                        >
                          {
                            parcel.tracking_id
                          }
                        </Link>
                      </td>

                      <td>
                        {
                          parcel.pickup_location
                        }
                      </td>

                      <td>
                        {
                          parcel.destination
                        }
                      </td>

                      <td>
                        <Status
                          value={
                            parcel.status
                          }
                          language={
                            language
                          }
                        />
                      </td>

                      <td>
                        {formatMoney(
                          parcel.price,
                          currency
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({
  value,
  label,
}) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

export function Status({
  value,
  language = "en",
}) {
  const labels = {
    pending: t(
      language,
      "pending"
    ),

    in_transit: t(
      language,
      "inTransit"
    ),

    delivered: t(
      language,
      "delivered"
    ),

    cancelled: t(
      language,
      "cancelled"
    ),
  };

  return (
    <span
      className={`status status-${value}`}
    >
      {labels[value] ||
        value.replace(
          "_",
          " "
        )}
    </span>
  );
}