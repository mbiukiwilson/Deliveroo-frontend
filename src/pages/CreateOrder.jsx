import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api";
import { calculateRoute, geocodeAddress } from "../maps";
import { formatMoney, t } from "../i18n";

function calculatePrice(weight) {
  if (!weight || weight <= 0) return 0;
  if (weight <= 2) return 25;
  if (weight <= 5) return 45;
  if (weight <= 10) return 85;
  return weight * 8;
}

export default function CreateOrder() {
  const navigate = useNavigate();
  const { language, currency } = useSelector((state) => state.preferences);
  const [form, setForm] = useState({
    pickup_location: "",
    destination: "",
    weight: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const price = useMemo(() => calculatePrice(Number(form.weight)), [form.weight]);

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const pickup = await geocodeAddress(form.pickup_location);
      const destination = await geocodeAddress(form.destination);
      const route = await calculateRoute(pickup, destination);

      const response = await api.post("/parcels", {
        ...form,
        weight: Number(form.weight),
        currency,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        destination_lat: destination.lat,
        destination_lng: destination.lng,
        distance: route.distanceKm,
        duration: route.duration,
      });

      navigate(`/orders/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Unable to create order.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page container">
      <div className="create-order-page">
        <div className="eyebrow">NEW DELIVERY</div>
        <h1>{t(language, "createOrder")}</h1>
        <p className="page-subtitle">
          Enter your pickup and destination details to get a delivery quote.
        </p>

        <form className="order-card" onSubmit={submit}>
          <div className="order-form-grid">
            <Field
              label={t(language, "pickup")}
              placeholder="e.g. CBD, Nairobi"
              value={form.pickup_location}
              onChange={(e) => update("pickup_location", e.target.value)}
            />
            <Field
              label={t(language, "destination")}
              placeholder="e.g. Westlands, Nairobi"
              value={form.destination}
              onChange={(e) => update("destination", e.target.value)}
            />
            <Field
              label={`${t(language, "weight")} (KG)`}
              type="number"
              min="0.1"
              step="0.1"
              placeholder="3.5"
              value={form.weight}
              onChange={(e) => update("weight", e.target.value)}
            />
            <label className="field">
              <span>{t(language, "description")}</span>
              <textarea
                rows="4"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe your parcel..."
                required
              />
            </label>
          </div>

          <div className="price-preview">
            <div>
              <span>{t(language, "estimatedPrice")}</span>
              <small>Calculated from parcel weight</small>
            </div>
            <strong>{formatMoney(price, currency)}</strong>
          </div>

          <p className="payment-note">
            Payment is required before an admin can mark this parcel as in transit.
          </p>

          {error && <div className="error">{error}</div>}

          <button className="btn full" disabled={busy}>
            {busy ? "CALCULATING ROUTE..." : t(language, "confirmOrder")}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({ label, type = "text", placeholder, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
