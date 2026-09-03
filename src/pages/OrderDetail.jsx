import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../api";
import MapTracker from "../components/MapTracker";
import { formatMoney, t } from "../i18n";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { language, currency } = useSelector(
    (state) => state.preferences || { language: "en", currency: "KES" }
  );

  const [parcel, setParcel] = useState(null);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [error, setError] = useState("");

  const [destination, setDestination] = useState("");
  const [updatingDestination, setUpdatingDestination] = useState(false);

  const [cancelling, setCancelling] = useState(false);
  const [paying, setPaying] = useState(false);

  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  /*
   * ---------------------------------------------------------
   * LOAD PARCEL
   * ---------------------------------------------------------
   */

  const loadParcel = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setLoading(true);
      }

      try {
        const response = await api.get(`/parcels/${id}`);

        const data = response.data?.parcel || response.data;

        setParcel(data);
        setDestination(data?.destination || "");
        setError("");
      } catch (err) {
        console.error("Failed to load parcel:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("sendit_token");
          localStorage.removeItem("sendit_user");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.error ||
            "Unable to load this parcel. Please try again."
        );
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [id, navigate]
  );

  /*
   * ---------------------------------------------------------
   * LOAD LOCATION HISTORY
   * ---------------------------------------------------------
   */

  const loadLocations = useCallback(async () => {
    setLocationsLoading(true);

    try {
      const response = await api.get(`/parcels/${id}/locations`);

      const data = response.data;

      if (Array.isArray(data)) {
        setLocations(data);
      } else {
        setLocations(data?.locations || []);
      }
    } catch (err) {
      console.error("Failed to load location history:", err);

      // Location history should not prevent the parcel page
      // from working.
      setLocations([]);
    } finally {
      setLocationsLoading(false);
    }
  }, [id]);

  /*
   * ---------------------------------------------------------
   * INITIAL LOAD
   * ---------------------------------------------------------
   */

  useEffect(() => {
    loadParcel();
    loadLocations();
  }, [loadParcel, loadLocations]);

  /*
   * ---------------------------------------------------------
   * AUTO REFRESH WHILE IN TRANSIT
   * ---------------------------------------------------------
   *
   * The parcel is refreshed every 5 seconds while it is moving.
   * This allows the customer to see updated GPS coordinates.
   */

  useEffect(() => {
    if (!parcel) {
      return undefined;
    }

    if (parcel.status !== "in_transit") {
      return undefined;
    }

    const interval = setInterval(() => {
      loadParcel(false);
      loadLocations();
    }, 5000);

    return () => clearInterval(interval);
  }, [parcel?.status, loadParcel, loadLocations]);

  /*
   * ---------------------------------------------------------
   * HELPERS
   * ---------------------------------------------------------
   */

  const status = String(parcel?.status || "pending").toLowerCase();

  const paymentStatus = String(
    parcel?.payment_status || "pending"
  ).toLowerCase();

  const isPaid = paymentStatus === "paid";

  const canEditDestination =
    status !== "delivered" && status !== "cancelled";

  const canCancel = status !== "delivered" && status !== "cancelled";

  const statusLabel = useMemo(() => {
    const statusMap = {
      pending: t(language, "pending"),
      in_transit: t(language, "inTransit"),
      delivered: t(language, "delivered"),
      cancelled: t(language, "cancelled"),
    };

    return statusMap[status] || status.replace("_", " ");
  }, [language, status]);

  const statusClass = `status-badge status-${status.replace("_", "-")}`;

  /*
   * ---------------------------------------------------------
   * FORMAT DATE
   * ---------------------------------------------------------
   */

  function formatDate(value) {
    if (!value) {
      return "—";
    }

    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  }

  /*
   * ---------------------------------------------------------
   * UPDATE DESTINATION
   * ---------------------------------------------------------
   */

  async function handleDestinationUpdate(event) {
    event.preventDefault();

    const newDestination = destination.trim();

    if (!newDestination) {
      setActionError("Please enter a destination.");
      setActionMessage("");
      return;
    }

    setUpdatingDestination(true);
    setActionError("");
    setActionMessage("");

    try {
      const response = await api.patch(`/parcels/${id}/destination`, {
        destination: newDestination,
      });

      const updatedParcel =
        response.data?.parcel || response.data;

      if (updatedParcel) {
        setParcel(updatedParcel);
        setDestination(updatedParcel.destination || newDestination);
      } else {
        await loadParcel(false);
      }

      setActionMessage(
        t(language, "destinationUpdated") ||
          "Destination updated successfully."
      );
    } catch (err) {
      console.error("Destination update failed:", err);

      setActionError(
        err.response?.data?.error ||
          "Unable to update the destination."
      );
    } finally {
      setUpdatingDestination(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * CANCEL PARCEL
   * ---------------------------------------------------------
   */

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this parcel?"
    );

    if (!confirmed) {
      return;
    }

    setCancelling(true);
    setActionError("");
    setActionMessage("");

    try {
      const response = await api.patch(`/parcels/${id}/cancel`);

      const updatedParcel =
        response.data?.parcel || response.data;

      if (updatedParcel) {
        setParcel(updatedParcel);
      } else {
        await loadParcel(false);
      }

      setActionMessage(
        t(language, "orderCancelled") ||
          "Order cancelled successfully."
      );
    } catch (err) {
      console.error("Cancel failed:", err);

      setActionError(
        err.response?.data?.error ||
          "Unable to cancel this parcel."
      );
    } finally {
      setCancelling(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * PAYMENT
   * ---------------------------------------------------------
   *
   * This calls the current demo payment endpoint.
   *
   * The backend marks the parcel as paid.
   *
   * In a real deployment this should be replaced with
   * M-Pesa / Stripe payment confirmation.
   */

  async function handlePayment() {
    setPaying(true);
    setActionError("");
    setActionMessage("");

    try {
      const response = await api.post(`/parcels/${id}/pay`);

      const updatedParcel =
        response.data?.parcel || response.data;

      if (updatedParcel) {
        setParcel(updatedParcel);
      } else {
        await loadParcel(false);
      }

      setActionMessage(
        t(language, "paymentSuccessful") ||
          "Payment successful."
      );
    } catch (err) {
      console.error("Payment failed:", err);

      setActionError(
        err.response?.data?.error ||
          "Payment could not be completed."
      );
    } finally {
      setPaying(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * MAP DATA
   * ---------------------------------------------------------
   */

  const pickup = useMemo(() => {
    if (
      parcel?.pickup_lat == null ||
      parcel?.pickup_lng == null
    ) {
      return null;
    }

    return {
      lat: Number(parcel.pickup_lat),
      lng: Number(parcel.pickup_lng),
      label: parcel.pickup_location,
    };
  }, [
    parcel?.pickup_lat,
    parcel?.pickup_lng,
    parcel?.pickup_location,
  ]);

  const destinationPoint = useMemo(() => {
    if (
      parcel?.destination_lat == null ||
      parcel?.destination_lng == null
    ) {
      return null;
    }

    return {
      lat: Number(parcel.destination_lat),
      lng: Number(parcel.destination_lng),
      label: parcel.destination,
    };
  }, [
    parcel?.destination_lat,
    parcel?.destination_lng,
    parcel?.destination,
  ]);

  const current = useMemo(() => {
    if (
      parcel?.current_lat == null ||
      parcel?.current_lng == null
    ) {
      return null;
    }

    return {
      lat: Number(parcel.current_lat),
      lng: Number(parcel.current_lng),
      label:
        parcel.current_location ||
        t(language, "currentLocation") ||
        "Current location",
    };
  }, [
    parcel?.current_lat,
    parcel?.current_lng,
    parcel?.current_location,
    language,
  ]);

  /*
   * ---------------------------------------------------------
   * LOADING
   * ---------------------------------------------------------
   */

  if (loading) {
    return (
      <main className="page-shell">
        <div className="loading-card">
          <div className="spinner" />
          <p>{t(language, "loading") || "Loading order..."}</p>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * ERROR
   * ---------------------------------------------------------
   */

  if (error && !parcel) {
    return (
      <main className="page-shell">
        <div className="error-card">
          <div className="error-icon">!</div>

          <h2>
            {t(language, "somethingWentWrong") ||
              "Something went wrong"}
          </h2>

          <p>{error}</p>

          <div className="button-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => loadParcel()}
            >
              {t(language, "tryAgain") || "Try Again"}
            </button>

            <Link to="/dashboard" className="btn btn-secondary">
              {t(language, "backToOrders") || "Back to Orders"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */

  return (
    <main className="page-shell order-detail-page">
      <div className="page-container">

        {/* -------------------------------------------------- */}
        {/* BACK BUTTON */}
        {/* -------------------------------------------------- */}

        <div className="back-link-wrapper">
          <Link to="/dashboard" className="back-link">
            ← {t(language, "backToOrders") || "Back to Orders"}
          </Link>
        </div>

        {/* -------------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------------- */}

        <section className="order-header-card">
          <div className="order-header-main">
            <div>
              <p className="eyebrow">
                {t(language, "trackingNumber") ||
                  "Tracking Number"}
              </p>

              <h1>
                {parcel?.tracking_id ||
                  `SIT-${String(parcel?.id || id).padStart(6, "0")}`}
              </h1>

              <p className="order-created">
                {t(language, "created") || "Created"}{" "}
                {formatDate(parcel?.created_at)}
              </p>
            </div>

            <div className="order-header-status">
              <span className={statusClass}>
                {statusLabel}
              </span>

              {status === "in_transit" && (
                <span className="live-indicator">
                  <span className="live-dot" />
                  LIVE
                </span>
              )}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* ACTION MESSAGES */}
        {/* -------------------------------------------------- */}

        {actionMessage && (
          <div className="alert alert-success">
            <span>✓</span>
            <p>{actionMessage}</p>
          </div>
        )}

        {actionError && (
          <div className="alert alert-error">
            <span>!</span>
            <p>{actionError}</p>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* MAIN GRID */}
        {/* -------------------------------------------------- */}

        <div className="order-detail-grid">

          {/* ================================================= */}
          {/* LEFT COLUMN */}
          {/* ================================================= */}

          <div className="order-main-column">

            {/* ------------------------------------------------ */}
            {/* ROUTE */}
            {/* ------------------------------------------------ */}

            <section className="detail-card route-card">
              <div className="card-heading">
                <div>
                  <p className="card-kicker">
                    {t(language, "deliveryRoute") ||
                      "Delivery Route"}
                  </p>

                  <h2>
                    {t(language, "parcelJourney") ||
                      "Parcel Journey"}
                  </h2>
                </div>

                <span className="route-icon">↗</span>
              </div>

              <div className="route-points">

                <div className="route-point">
                  <div className="route-marker pickup-marker">
                    <span />
                  </div>

                  <div className="route-content">
                    <span className="route-label">
                      {t(language, "pickup") || "Pickup"}
                    </span>

                    <strong>
                      {parcel?.pickup_location || "—"}
                    </strong>
                  </div>
                </div>

                <div className="route-line">
                  <span />
                </div>

                <div className="route-point">
                  <div className="route-marker destination-marker">
                    <span>●</span>
                  </div>

                  <div className="route-content">
                    <span className="route-label">
                      {t(language, "destination") ||
                        "Destination"}
                    </span>

                    <strong>
                      {parcel?.destination || "—"}
                    </strong>
                  </div>
                </div>

              </div>
            </section>

            {/* ------------------------------------------------ */}
            {/* MAP */}
            {/* ------------------------------------------------ */}

            <section className="detail-card map-card">
              <div className="card-heading">
                <div>
                  <p className="card-kicker">
                    {t(language, "liveTracking") ||
                      "Live Tracking"}
                  </p>

                  <h2>
                    {t(language, "whereIsMyParcel") ||
                      "Where is my parcel?"}
                  </h2>
                </div>

                {status === "in_transit" && (
                  <span className="map-live-badge">
                    <span className="live-dot" />
                    {t(language, "live") || "Live"}
                  </span>
                )}
              </div>

              <div className="tracking-map-container">
                <MapTracker
                  pickup={pickup}
                  destination={destinationPoint}
                  current={current}
                  live={status === "in_transit"}
                  onRoute={status === "in_transit"}
                />
              </div>

              {!pickup &&
                !destinationPoint &&
                !current && (
                  <div className="map-info-message">
                    <span>📍</span>

                    <div>
                      <strong>
                        {t(language, "mapWaiting") ||
                          "Map coordinates are not available yet."}
                      </strong>

                      <p>
                        {t(language, "mapWaitingDescription") ||
                          "The map will show the delivery route once location coordinates are available."}
                      </p>
                    </div>
                  </div>
                )}

              <div className="map-attribution-note">
                © OpenStreetMap contributors
              </div>
            </section>

            {/* ------------------------------------------------ */}
            {/* LOCATION HISTORY */}
            {/* ------------------------------------------------ */}

            <section className="detail-card history-card">
              <div className="card-heading">
                <div>
                  <p className="card-kicker">
                    {t(language, "tracking") || "Tracking"}
                  </p>

                  <h2>
                    {t(language, "trackingHistory") ||
                      "Tracking History"}
                  </h2>
                </div>
              </div>

              {locationsLoading && locations.length === 0 ? (
                <div className="small-loading">
                  <div className="spinner spinner-small" />
                  <span>
                    {t(language, "loading") || "Loading..."}
                  </span>
                </div>
              ) : locations.length === 0 ? (
                <div className="empty-history">
                  <span className="empty-history-icon">
                    ◷
                  </span>

                  <p>
                    {t(language, "noLocationHistory") ||
                      "No location updates have been recorded yet."}
                  </p>
                </div>
              ) : (
                <div className="tracking-history">

                  {locations.map((location, index) => (
                    <div
                      className="history-item"
                      key={
                        location.id ||
                        `${location.created_at}-${index}`
                      }
                    >
                      <div className="history-timeline">
                        <span
                          className={
                            index === 0
                              ? "history-dot history-dot-current"
                              : "history-dot"
                          }
                        />

                        {index < locations.length - 1 && (
                          <span className="history-line" />
                        )}
                      </div>

                      <div className="history-content">
                        <strong>
                          {location.location ||
                            t(language, "locationUpdated") ||
                            "Location updated"}
                        </strong>

                        <span>
                          {formatDate(location.created_at)}
                        </span>

                        {location.latitude != null &&
                          location.longitude != null && (
                            <small>
                              {Number(location.latitude).toFixed(5)},{" "}
                              {Number(location.longitude).toFixed(5)}
                            </small>
                          )}
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </section>

          </div>

          {/* ================================================= */}
          {/* RIGHT COLUMN */}
          {/* ================================================= */}

          <aside className="order-sidebar">

            {/* ------------------------------------------------ */}
            {/* ORDER SUMMARY */}
            {/* ------------------------------------------------ */}

            <section className="detail-card summary-card">
              <div className="card-heading">
                <div>
                  <p className="card-kicker">
                    {t(language, "order") || "Order"}
                  </p>

                  <h2>
                    {t(language, "orderSummary") ||
                      "Order Summary"}
                  </h2>
                </div>
              </div>

              <div className="summary-list">

                <div className="summary-row">
                  <span>
                    {t(language, "weight") || "Weight"}
                  </span>

                  <strong>
                    {parcel?.weight ?? "—"} kg
                  </strong>
                </div>

                <div className="summary-row">
                  <span>
                    {t(language, "distance") || "Distance"}
                  </span>

                  <strong>
                    {parcel?.distance != null
                      ? `${Number(parcel.distance).toFixed(1)} km`
                      : "—"}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>
                    {t(language, "estimatedTime") ||
                      "Estimated Time"}
                  </span>

                  <strong>
                    {parcel?.duration || "—"}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>
                    {t(language, "paymentStatus") ||
                      "Payment Status"}
                  </span>

                  <span
                    className={`payment-badge ${
                      isPaid
                        ? "payment-paid"
                        : "payment-pending"
                    }`}
                  >
                    {isPaid
                      ? t(language, "paid") || "Paid"
                      : t(language, "pending") || "Pending"}
                  </span>
                </div>

              </div>

              <div className="price-total">
                <span>
                  {t(language, "total") || "Total"}
                </span>

                <strong>
                  {formatMoney(
                    parcel?.price || 0,
                    currency
                  )}
                </strong>
              </div>
            </section>

            {/* ------------------------------------------------ */}
            {/* PAYMENT */}
            {/* ------------------------------------------------ */}

            {!isPaid &&
              status !== "cancelled" &&
              status !== "delivered" && (
                <section className="detail-card payment-card">

                  <div className="payment-icon">₿</div>

                  <h2>
                    {t(language, "completePayment") ||
                      "Complete Payment"}
                  </h2>

                  <p>
                    {t(language, "paymentRequired") ||
                      "Payment is required before your parcel can be placed in transit."}
                  </p>

                  <div className="payment-amount">
                    {formatMoney(
                      parcel?.price || 0,
                      currency
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-full"
                    onClick={handlePayment}
                    disabled={paying}
                  >
                    {paying
                      ? t(language, "processing") ||
                        "Processing..."
                      : t(language, "payNow") || "Pay Now"}
                  </button>

                  <small className="payment-demo-note">
                    Demo payment confirmation
                  </small>

                </section>
              )}

            {/* ------------------------------------------------ */}
            {/* PAYMENT SUCCESS */}
            {/* ------------------------------------------------ */}

            {isPaid && (
              <section className="detail-card payment-success-card">

                <div className="success-circle">✓</div>

                <h2>
                  {t(language, "paymentComplete") ||
                    "Payment Complete"}
                </h2>

                <p>
                  {t(language, "paymentCompleteDescription") ||
                    "Your parcel has been paid for and can now be moved into transit by the administrator."}
                </p>

                {parcel?.payment_reference && (
                  <div className="payment-reference">
                    <span>
                      {t(language, "reference") ||
                        "Reference"}
                    </span>

                    <strong>
                      {parcel.payment_reference}
                    </strong>
                  </div>
                )}
              </section>
            )}

            {/* ------------------------------------------------ */}
            {/* CHANGE DESTINATION */}
            {/* ------------------------------------------------ */}

            {canEditDestination && (
              <section className="detail-card edit-card">

                <div className="card-heading">
                  <div>
                    <p className="card-kicker">
                      {t(language, "manage") || "Manage"}
                    </p>

                    <h2>
                      {t(language, "changeDestination") ||
                        "Change Destination"}
                    </h2>
                  </div>
                </div>

                <form onSubmit={handleDestinationUpdate}>
                  <label htmlFor="destination">
                    {t(language, "newDestination") ||
                      "New Destination"}
                  </label>

                  <textarea
                    id="destination"
                    value={destination}
                    onChange={(event) =>
                      setDestination(event.target.value)
                    }
                    placeholder={
                      t(language, "destinationPlaceholder") ||
                      "Enter the new delivery destination"
                    }
                    rows={4}
                    disabled={updatingDestination}
                  />

                  <button
                    type="submit"
                    className="btn btn-secondary btn-full"
                    disabled={updatingDestination}
                  >
                    {updatingDestination
                      ? t(language, "updating") ||
                        "Updating..."
                      : t(language, "updateDestination") ||
                        "Update Destination"}
                  </button>
                </form>

                <p className="helper-text">
                  {t(language, "destinationChangeNote") ||
                    "You can change the destination until the parcel is delivered or cancelled."}
                </p>

              </section>
            )}

            {/* ------------------------------------------------ */}
            {/* CANCEL */}
            {/* ------------------------------------------------ */}

            {canCancel && (
              <section className="detail-card danger-card">

                <h2>
                  {t(language, "cancelOrder") ||
                    "Cancel Order"}
                </h2>

                <p>
                  {t(language, "cancelOrderDescription") ||
                    "Cancel this delivery if you no longer need it."}
                </p>

                <button
                  type="button"
                  className="btn btn-danger btn-full"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling
                    ? t(language, "cancelling") ||
                      "Cancelling..."
                    : t(language, "cancelOrder") ||
                      "Cancel Order"}
                </button>

              </section>
            )}

            {/* ------------------------------------------------ */}
            {/* CANCELLED MESSAGE */}
            {/* ------------------------------------------------ */}

            {status === "cancelled" && (
              <section className="detail-card cancelled-card">

                <div className="cancelled-icon">×</div>

                <h2>
                  {t(language, "orderCancelled") ||
                    "Order Cancelled"}
                </h2>

                <p>
                  {t(language, "orderCancelledDescription") ||
                    "This delivery has been cancelled and can no longer be modified."}
                </p>

              </section>
            )}

            {/* ------------------------------------------------ */}
            {/* DELIVERED MESSAGE */}
            {/* ------------------------------------------------ */}

            {status === "delivered" && (
              <section className="detail-card delivered-card">

                <div className="delivered-icon">✓</div>

                <h2>
                  {t(language, "delivered") ||
                    "Delivered"}
                </h2>

                <p>
                  {t(language, "deliveryComplete") ||
                    "Your parcel has been successfully delivered."}
                </p>

              </section>
            )}

          </aside>
        </div>

        {/* -------------------------------------------------- */}
        {/* REFRESH */}
        {/* -------------------------------------------------- */}

        <div className="order-refresh-row">
          <button
            type="button"
            className="refresh-button"
            onClick={() => {
              loadParcel();
              loadLocations();
            }}
          >
            ↻ {t(language, "refresh") || "Refresh"}
          </button>
        </div>

      </div>
    </main>
  );
}