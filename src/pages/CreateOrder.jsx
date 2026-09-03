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
  const [loading, setLoading] = useState(false);

  const price = useMemo(
    () => calculatePrice(Number(form.weight)),
    [form.weight]
  );

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/parcels", {
        pickup_location: form.pickup_location,
        destination: form.destination,
        weight: Number(form.weight),
        description: form.description,
      });

      navigate(`/orders/${response.data.id}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to create order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="create-order-page">
        <div className="eyebrow">NEW DELIVERY</div>

        <div className="create-order-card">
          <h1>Create a Parcel Order</h1>

          <p>
            Enter your pickup and destination details to create a new
            delivery.
          </p>

          <form className="order-form" onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="pickup_location">
                PICKUP LOCATION
              </label>

              <input
                id="pickup_location"
                type="text"
                placeholder="e.g. 15 Ring Road, Nairobi"
                value={form.pickup_location}
                onChange={(e) =>
                  updateField("pickup_location", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="destination">
                DESTINATION ADDRESS
              </label>

              <input
                id="destination"
                type="text"
                placeholder="e.g. 24 Oxford Street, Nairobi"
                value={form.destination}
                onChange={(e) =>
                  updateField("destination", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">WEIGHT (KG)</label>

              <input
                id="weight"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="e.g. 3.5"
                value={form.weight}
                onChange={(e) =>
                  updateField("weight", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">DESCRIPTION</label>

              <textarea
                id="description"
                rows="5"
                placeholder="Describe your parcel..."
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
              />
            </div>

            <div className="price-preview full-width">
              <div>
                <span>ESTIMATED PRICE</span>
                <small>Based on parcel weight</small>
              </div>

              <strong>KSh {price.toFixed(2)}</strong>
            </div>

            {error && (
              <div className="alert alert-error full-width">
                <span>⚠</span>
                <p>{error}</p>
              </div>
            )}

            <div className="full-width">
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading
                  ? "CREATING ORDER..."
                  : "CONFIRM & PLACE ORDER"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}