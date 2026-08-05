import { Link, useLocation } from "react-router-dom";
import { FaHome, FaWallet, FaCog } from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-logo">
          Expense Tracker
        </h2>

        <p className="sidebar-subtitle">
          Track • Save • Grow
        </p>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/transactions"
            className={
              location.pathname === "/transactions"
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaWallet />
            Transactions
          </Link>

          <Link
            to="/settings"
            className={
              location.pathname === "/settings"
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaCog />
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;