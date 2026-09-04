import { Link, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setLanguage,
  setCurrency,
} from "./features/preferencesSlice";

import {
  languages,
  currencies,
  t,
} from "./i18n";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";
import AdminDashboard from "./pages/AdminDashboard";

function Navbar() {
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

  const user = useSelector(
    (state) => state.auth?.user
  );

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-brand">
        <span className="logo">S</span>
        SendIT
      </Link>

      <div className="navbar-links">

        <Link to="/">
          {t(language, "home") || "Home"}
        </Link>

        {user && (
          <Link to="/dashboard">
            {t(language, "dashboard") || "Dashboard"}
          </Link>
        )}

        {user && (
          <Link to="/create-order">
            {t(language, "sendParcel") || "Send Parcel"}
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin">
            {t(language, "admin") || "Admin"}
          </Link>
        )}

      </div>

      <div className="navbar-controls">

        <select
          className="navbar-select"
          value={language}
          onChange={(event) =>
            dispatch(setLanguage(event.target.value))
          }
          aria-label="Language"
        >
          {Object.entries(languages).map(
            ([code, name]) => (
              <option
                key={code}
                value={code}
              >
                {name}
              </option>
            )
          )}
        </select>

        <select
          className="navbar-select"
          value={currency}
          onChange={(event) =>
            dispatch(setCurrency(event.target.value))
          }
          aria-label="Currency"
        >
          {Object.entries(currencies).map(
            ([code, name]) => (
              <option
                key={code}
                value={code}
              >
                {code} — {name}
              </option>
            )
          )}
        </select>

      </div>

    </nav>
  );
}

export default function App() {
  return (
    <div className="app">

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Auth mode="login" />}
        />

        <Route
          path="/register"
          element={<Auth mode="register" />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-order"
          element={<CreateOrder />}
        />

        <Route
          path="/orders/:id"
          element={<OrderDetail />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </div>
  );
}