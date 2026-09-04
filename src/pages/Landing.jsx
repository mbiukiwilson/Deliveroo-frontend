import { Link } from "react-router-dom";

const prices = [
  ["UP TO 2 KG", "KSh 218.0", "Documents, letters, small items"],
  ["2 – 5 KG", "KSh 392.4", "Books, small electronics, gifts"],
  ["5 – 10 KG", "KSh 741.2", "Clothing bundles, medium parcels"],
  ["10 KG+", "KSh 69.8/kg", "Heavy cargo, industrial parts"],
];

export default function Landing() {
  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">● COURIER & LOGISTICS PLATFORM — WORLDWIDE</div>
          <h1>
            Deliver anything,<br />
            <span>anywhere in the world.</span>
          </h1>
          <p>
            SendIT gives you real-time tracking, weight-based pricing, and
            live route maps for every parcel — from a single document to
            heavy cargo.
          </p>
          <div className="actions">
            <Link to="/register" className="btn">SEND A PARCEL →</Link>
            <Link to="/login" className="btn btn-outline">TRACK AN ORDER</Link>
          </div>
        </div>

        <div className="hero-stats">
          <Stat value="42,890" label="PARCELS DELIVERED" />
          <Stat value="68" label="CITIES COVERED" />
          <Stat value="98.4%" label="ON-TIME RATE" />
        </div>
      </section>

      <section className="section container">
        <h2>Ship in three steps</h2>
        <div className="three-grid">
          <Step number="01" title="Create Order">
            Enter pickup and delivery addresses, describe your parcel and
            select a weight category for instant pricing.
          </Step>
          <Step number="02" title="We Pick Up">
            Our rider arrives at your pickup location within the hour.
            We handle fragile items with care.
          </Step>
          <Step number="03" title="Live Tracking">
            Follow your parcel on a live map from the moment it leaves your
            door to final delivery confirmation.
          </Step>
        </div>
      </section>

      <section className="section pricing container">
        <div className="eyebrow">PRICING</div>
        <h2>Weight-based quotes</h2>
        <div className="pricing-grid">
          {prices.map(([weight, price, description]) => (
            <div className="price-card" key={weight}>
              <small>{weight}</small>
              <strong>{price}</strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <article className="step-card">
      <b>{number}</b>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
