import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCredentials } from "../features/authSlice";
import api from "../api";
import { t } from "../i18n";

export default function Auth({ mode = "login" }) {
  const isLogin = mode === "login";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const language = useSelector(
    (state) => state.preferences?.language || "en"
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const endpoint = isLogin
        ? "/auth/login"
        : "/auth/register";

      const payload = isLogin
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
          };

      const response = await api.post(endpoint, payload);

      dispatch(setCredentials(response.data));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          (isLogin
            ? "Invalid email or password."
            : "Unable to create your account.")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-layout">

        {/* ==================================================
            LEFT SIDE — SENDIT BRAND
            ================================================== */}

        <div className="auth-brand-panel">

          <div className="auth-brand-content">

            <div className="auth-brand-logo">
              <div className="auth-logo-mark">S</div>

              <span>SendIT</span>
            </div>

            <div className="auth-brand-copy">

              <div className="auth-kicker">
                GLOBAL COURIER SERVICE
              </div>

              <h1>
                {isLogin ? (
                  <>
                    Your parcels.
                    <br />
                    <span>Our responsibility.</span>
                  </>
                ) : (
                  <>
                    Deliver with
                    <br />
                    <span>confidence.</span>
                  </>
                )}
              </h1>

              <p>
                Fast, reliable parcel delivery with transparent
                pricing, live tracking and worldwide destinations.
              </p>

            </div>

            {/* Decorative delivery illustration */}
            <div className="auth-visual">

              <div className="auth-route-line">
                <span className="route-dot route-start" />
                <span className="route-dot route-end" />
              </div>

              <div className="auth-package">
                <div className="package-top" />
                <div className="package-front">
                  <span>BOX</span>
                </div>
                <div className="package-side" />
              </div>

              <div className="auth-location auth-location-start">
                <span className="location-pin">●</span>
                <span>Nairobi</span>
              </div>

              <div className="auth-location auth-location-end">
                <span className="location-pin">●</span>
                <span>Worldwide</span>
              </div>

            </div>

            <div className="auth-benefits">

              <div className="auth-benefit">
                <strong>01</strong>
                <span>Reliable delivery</span>
              </div>

              <div className="auth-benefit">
                <strong>02</strong>
                <span>Live parcel tracking</span>
              </div>

              <div className="auth-benefit">
                <strong>03</strong>
                <span>Worldwide service</span>
              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            RIGHT SIDE — FORM
            ================================================== */}

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">

            <div className="auth-mobile-logo">
              <div className="auth-logo-mark">S</div>
              <span>SendIT</span>
            </div>

            <div className="auth-form-header">

              <div className="auth-eyebrow">
                {isLogin
                  ? "WELCOME BACK"
                  : "GET STARTED"}
              </div>

              <h2>
                {isLogin
                  ? "Sign In"
                  : "Create Account"}
              </h2>

              <p>
                {isLogin
                  ? "Sign in to manage your deliveries and track your parcels."
                  : "Create your SendIT account and start sending parcels today."}
              </p>

            </div>

            <form
              className="auth-form"
              onSubmit={submit}
            >

              {!isLogin && (
                <div className="auth-field">

                  <label htmlFor="name">
                    {t(language, "name")}
                  </label>

                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                      👤
                    </span>

                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        updateField(
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />
                  </div>

                </div>
              )}

              <div className="auth-field">

                <label htmlFor="email">
                  {t(language, "email")}
                </label>

                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

              </div>

              <div className="auth-field">

                <div className="auth-label-row">

                  <label htmlFor="password">
                    {t(language, "password")}
                  </label>

                  {isLogin && (
                    <span className="auth-secure-label">
                      SECURE
                    </span>
                  )}

                </div>

                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    •••
                  </span>

                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      updateField(
                        "password",
                        e.target.value
                      )
                    }
                    placeholder="Enter your password"
                    autoComplete={
                      isLogin
                        ? "current-password"
                        : "new-password"
                    }
                    required
                  />
                </div>

              </div>

              {error && (
                <div className="auth-error">
                  <span>!</span>
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? isLogin
                      ? "SIGNING IN..."
                      : "CREATING ACCOUNT..."
                    : isLogin
                    ? "SIGN IN"
                    : "CREATE ACCOUNT"}
                </span>

                {!loading && (
                  <span className="auth-arrow">
                    →
                  </span>
                )}
              </button>

            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <div className="auth-switch">

              <span>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>

              <Link
                to={isLogin ? "/register" : "/login"}
              >
                {isLogin
                  ? "Create one"
                  : "Sign in"}
              </Link>

            </div>

            <div className="auth-footer-note">
              By continuing, you agree to SendIT's
              terms of service and privacy policy.
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}