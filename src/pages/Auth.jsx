import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/authSlice";
import api from "../api";
import { t } from "../i18n";

export default function Auth({ mode }) {
  const isLogin = mode === "login";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useSelector((state) => state.preferences);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await api.post(endpoint, form);
      dispatch(setCredentials(response.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="eyebrow">{isLogin ? "WELCOME BACK" : "GET STARTED"}</div>
        <h1>{isLogin ? t(language, "signIn") : "Create your account"}</h1>
        <p>
          {isLogin
            ? "Track your deliveries and manage every order from one place."
            : "Start shipping parcels quickly with SendIT."}
        </p>

        {!isLogin && (
          <Field
            label="FULL NAME"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <Field
          label="EMAIL"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Field
          label="PASSWORD"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <div className="error">{error}</div>}

        <button className="btn full" disabled={loading}>
          {loading
            ? "PLEASE WAIT..."
            : isLogin
              ? t(language, "signIn")
              : "CREATE YOUR ACCOUNT"}
        </button>

        <div className="auth-footer">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link to={isLogin ? "/register" : "/login"}>
            {isLogin ? "Create one" : "Sign In"}
          </Link>
        </div>
      </form>
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
