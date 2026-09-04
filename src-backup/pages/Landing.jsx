import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setLanguage,
  setCurrency,
} from "../features/preferencesSlice";

import {
  languages,
  currencies,
  t,
  formatMoney,
} from "../i18n";

export default function Landing() {
  const dispatch = useDispatch();

  const {
    language = "en",
    currency = "KES",
  } = useSelector(
    (state) =>
      state.preferences || {
        language: "en",
        currency: "KES",
      }
  );

  return (
    <main className="landing-page">

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            {t(language, "welcome") || "WELCOME TO SENDIT"}
          </p>

          <h1>
            {t(language, "heroTitle") ||
              "Fast, reliable parcel delivery."}
          </h1>

          <p>
            {t(language, "heroDescription") ||
              "Send parcels anywhere with reliable tracking, transparent pricing and real-time delivery updates."}
          </p>

          <div className="hero-buttons">
            <Link
              to="/create-order"
              className="btn btn-primary"
            >
              {t(language, "sendParcel") ||
                "Send a Parcel"}
            </Link>

            <Link
              to="/login"
              className="btn btn-secondary"
            >
              {t(language, "login") || "Login"}
            </Link>
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-package">
            📦
          </div>
        </div>

      </section>

      {/* PRICING */}
      <section className="pricing-section">

        <div className="section-heading">

          <h2>
            {t(language, "pricing") || "Simple Pricing"}
          </h2>

          <p>
            {t(language, "pricingDescription") ||
              "Affordable delivery based on parcel weight."}
          </p>

        </div>

        <div className="pricing-grid">

          <div className="price-card">
            <h3>UP TO 2 KG</h3>
            <p className="price">
              {formatMoney(218, currency)}
            </p>
          </div>

          <div className="price-card">
            <h3>2 – 5 KG</h3>
            <p className="price">
              {formatMoney(392.4, currency)}
            </p>
          </div>

          <div className="price-card">
            <h3>5 – 10 KG</h3>
            <p className="price">
              {formatMoney(741.2, currency)}
            </p>
          </div>

          <div className="price-card">
            <h3>OVER 10 KG</h3>
            <p className="price">
              {formatMoney(69.8, currency)}/kg
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}