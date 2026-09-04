import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/authSlice";
import { setLanguage, setCurrency } from "./features/preferencesSlice";
import { languages, currencies, t } from "./i18n";
import AdminDashboard from "./pages/AdminDashboard";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, currency } = useSelector((state) => state.preferences);

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">▣</span>
        <span>Send<span>IT</span></span>
      </Link>

      <nav>
        <select className="preference-select" value={language} onChange={(e) => dispatch(setLanguage(e.target.value))} aria-label="Language">
          {languages.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.label}</option>)}
        </select>
        <select className="preference-select" value={currency} onChange={(e) => dispatch(setCurrency(e.target.value))} aria-label="Currency">
          {currencies.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.code}</option>)}
        </select>
        {!user ? (
          <>
            <Link to="/login">{t(language, "signIn")}</Link>
            <Link className="btn btn-small" to="/register">{t(language, "getStarted")}</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">{t(language, "myOrders")}</Link>
            <Link to="/orders/new">{t(language, "newOrder")}</Link>
            {user.role === "admin" && <Link to="/admin">{t(language, "admin")}</Link>}
            <button
              className="nav-button"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              {t(language, "signOut")}
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

function Protected({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/orders/new" element={<Protected><CreateOrder /></Protected>} />
        <Route path="/orders/:id" element={<Protected><OrderDetail /></Protected>} />
        <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
      </Routes>
    </>
  );
}
