import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function calculatePrice(weight) {
  if (!weight || weight <= 0) return 0;
  if (weight <= 2) return 25;
  if (weight <= 5) return 45;
  if (weight <= 10) return 85;
  return weight * 8;
}

export default function CreateOrder() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pickup_location: "",
    destination: "",
    weight: "",
    description: "",
  });
  const [error, setError] = useState("");
  const price = useMemo(() => calculatePrice(Number(form.weight)), [form.weight]);

  async function submit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/parcels", {
        ...form,
        weight: Number(form.weight),
      });
      navigate(`/orders/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to create order.");
    }
  }

  return (
    <main className="page narrow">
      <div className="eyebrow">NEW DELIVERY</div>
      <h1>Create a Parcel Order</h1>

      <form className="order-card" onSubmit={submit}>
        <Field label="PICKUP LOCATION" placeholder="e.g. 15 Ring Road, Nairobi" value={form.pickup_location}
          onChange={(e) => setForm({ ...form, pickup_location: e.target.value })} />

        <Field label="DESTINATION ADDRESS" placeholder="e.g. 24 Oxford Street, Nairobi" value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })} />

        <Field label="WEIGHT (KG)" type="number" step="0.1" placeholder="3.5" value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })} />

        <label className="field">
          <span>DESCRIPTION</span>
          <textarea rows="4" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe your parcel..." />
        </label>

        <div className="price-preview">
          <span>ESTIMATED PRICE</span>
          <strong>KSh {price.toFixed(2)}</strong>
        </div>

        {error && <div className="error">{error}</div>}

        <button className="btn full">CONFIRM & PLACE ORDER</button>
      </form>
    </main>
  );
}

function Field({ label, type = "text", placeholder, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} required />
    </label>
  );
}
