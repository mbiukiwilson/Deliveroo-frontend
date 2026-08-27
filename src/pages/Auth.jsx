import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import api from "../api";

export default function Auth({ mode }) {
  const isLogin = mode === "login";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "/auth/login"
        : "/auth/register";

      const response = await api.post(endpoint, form);

      const { user, access_token } = response.data;

      // =====================================
      // SAVE JWT FOR ALL FUTURE API REQUESTS
      // =====================================
      if (!access_token) {
        throw new Error("No access token returned by server.");
      }

      localStorage.setItem("sendit_token", access_token);

      // Save authentication state in Redux
      dispatch(
        setCredentials({
          user,
          access_token,
        })
      );

      // Go to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error("Authentication error:", err);

      setError(
        err.response?.data?.error ||
        err.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="eyebrow">
          {isLogin ? "WELCOME BACK" : "GET STARTED"}
        </div>

        <h1>
          {isLogin ? "Sign in" : "Create your account"}
        </h1>

        <p>
          {isLogin
            ? "Track your deliveries and manage orders."
            : "Start shipping in under a minute."}
        </p>

        {!isLogin && (
          <Field
            label="FULL NAME"
            placeholder="Wilson Mbiuki"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        )}

        <Field
          label="EMAIL"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <Field
          label="PASSWORD"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn full"
          disabled={loading}
        >
          {loading
            ? "PLEASE WAIT..."
            : isLogin
              ? "SIGN IN"
              : "CREATE YOUR ACCOUNT"}
        </button>

        <div className="auth-footer">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}

          <Link to={isLogin ? "/register" : "/login"}>
            {isLogin ? "Create one" : "Sign In"}
          </Link>
        </div>
      </form>
    </main>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
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