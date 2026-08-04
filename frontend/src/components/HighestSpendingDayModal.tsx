type Expense = {
  id: number;
  category: string;
  description: string;
  amount: number;
  expense_date: string;
};

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

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Highest Spending Day</h2>

        <hr />

        {expenses.map((expense) => (

          <div key={expense.id}>

            <h4>{expense.category}</h4>

            <p>{expense.description}</p>

            <strong>₹{expense.amount}</strong>

            <hr />

          </div>

        ))}

        <h3>Total : ₹{total}</h3>

        <button onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  );
}

export default HighestSpendingDayModal;