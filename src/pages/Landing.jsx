import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setCurrency,
} from "../features/preferencesSlice";
import { formatMoney, t } from "../i18n";

const prices = [
  ["UP TO 2 KG", 218, "documents"],
  ["2 – 5 KG", 392.4, "books"],
  ["5 – 10 KG", 741.2, "clothing"],
  ["10 KG+", 69.8, "heavyCargo"],
];

export default function Landing() {
  const dispatch = useDispatch();

  const { language, currency } = useSelector(
    (state) => state.preferences
  );

  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">

          <div className="preferences">
            <select
              value={language}
              onChange={(e) =>
                dispatch(setLanguage(e.target.value))
              }
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>

            <select
              value={currency}
              onChange={(e) =>
                dispatch(setCurrency(e.target.value))
              }
              aria-label="Currency"
            >
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="eyebrow">
            ● {t(language, "worldwide")}
          </div>

          <h1>
            {t(language, "heroTitle")}
            <br />
            <span>{t(language, "heroTitle2")}</span>
          </h1>

          <p>
            {t(language, "heroDescription")}
          </p>

          <div className="actions">
            <Link
              to="/register"
              className="btn"
            >
              {t(language, "sendParcel")}
            </Link>

            <Link
              to="/login"
              className="btn btn-outline"
            >
              {t(language, "trackOrder")}
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <Stat
            value="42,890"
            label={t(language, "parcelsDelivered")}
          />

          <Stat
            value="68"
            label={t(language, "citiesCovered")}
          />

          <Stat
            value="98.4%"
            label={t(language, "onTimeRate")}
          />
        </div>
      </section>

      <section className="section container">
        <h2>
          {t(language, "shipThreeSteps")}
        </h2>

        <div className="three-grid">
          <Step
            number="01"
            title={t(language, "createOrder")}
          >
            {t(language, "createOrderDescription")}
          </Step>

          <Step
            number="02"
            title={t(language, "wePickUp")}
          >
            {t(language, "wePickUpDescription")}
          </Step>

          <Step
            number="03"
            title={t(language, "liveTracking")}
          >
            {t(language, "liveTrackingDescription")}
          </Step>
        </div>
      </section>

      <section className="section pricing container">
        <div className="eyebrow">
          {t(language, "pricing")}
        </div>

        <h2>
          {t(language, "weightQuotes")}
        </h2>

        <div className="pricing-grid">
          {prices.map(
            ([weight, price, descriptionKey]) => (
              <div
                className="price-card"
                key={weight}
              >
                <small>{weight}</small>

                <strong>
                  {formatMoney(price, currency)}
                </strong>

                <p>
                  {t(language, descriptionKey)}
                </p>
              </div>
            )
          )}
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