import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#2d3748",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Expense Tracker</h2>

      <hr />

      <p>
        <Link
          to="/dashboard"
          style={{ color: "white" }}
        >
          Dashboard
        </Link>
      </p>

      <p>
        <Link
          to="/transactions"
          style={{ color: "white" }}
        >
          Transactions
        </Link>
      </p>

      <p>
        <Link
          to="/settings"
          style={{ color: "white" }}
        >
          Settings
        </Link>
      </p>

    </div>
  );
}

export default Sidebar;