import type { Expense } from "../types/transactions";
type HighestSpendingDayModalProps = {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
};

function HighestSpendingDayModal({
  isOpen,
  onClose,
  expenses,
}: HighestSpendingDayModalProps) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <div className="modal-header">

          <h2>📅 Highest Spending Day</h2>

          <button onClick={onClose}>✕</button>

        </div>
<div className="modal-table-header">
  <span>Date</span>

  <span>Category</span>

  <span>Description</span>

  <span>Amount</span>
</div>
        {expenses.map((expense) => (
  <div
    key={expense.id}
    className="modal-row"
  >
    <span className="modal-date">
      {new Date(`${expense.expense_date}T00:00:00`).toLocaleDateString(
        "en-GB",
      )}
    </span>

    <span className="modal-category">
      {expense.category}
    </span>

    <span className="modal-description">
      {expense.description}
    </span>

    <span className="modal-amount">
      ₹{expense.amount}
    </span>
  </div>
))}

      </div>

    </div>
  );
}

export default HighestSpendingDayModal;