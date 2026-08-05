import { useNavigate } from "react-router-dom";
import type { Expense } from "../types/transactions";

type RecentActivityProps = {
  activities: Expense[];
};

function RecentActivity({ activities }: RecentActivityProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="recent-header">
        <h3>📝 Recent Transactions</h3>

        <button onClick={() => navigate("/transactions")}>View All →</button>
      </div>

      {activities.map((expense) => (
        <div key={expense.id} className="recent-item">
          <span>
            {new Date(`${expense.expense_date}T00:00:00`).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
              },
            )}
          </span>

          <span>{expense.category}</span>

          <strong>₹{expense.amount}</strong>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;
