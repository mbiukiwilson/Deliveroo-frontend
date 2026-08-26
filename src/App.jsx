import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/authSlice";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";
import TrackOrder from "./pages/TrackOrder";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">▣</span>
        <span>Send<span>IT</span></span>
      </Link>

      <nav>
        {!user ? (
          <>
            <Link to="/login">SIGN IN</Link>
            <Link className="btn btn-small" to="/register">GET STARTED</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">MY ORDERS</Link>
            <Link to="/orders/new">NEW ORDER</Link>
            <Link to="/orders/track">TRACK ORDER</Link>
            <button
              className="nav-button"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              SIGN OUT
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
        <Route path="/orders/track" element={<Protected><TrackOrder /></Protected>} />
      </Routes>
    </>
  );
}