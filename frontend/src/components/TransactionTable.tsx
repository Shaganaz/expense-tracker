import type { Expense } from "../types/transactions";
type TransactionTableProps = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
};
function TransactionTable({
  expenses,
  onEdit,
  onDelete,
}: TransactionTableProps) {
    return (
  <table className="transaction-table">

    <thead>
      <tr>
        <th>Date</th>
        <th>Category</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
    {expenses.map((expense) => (
  <tr key={expense.id}>

    <td>
  {new Date(`${expense.expense_date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  )}
</td>

    <td>
  <span className="category-pill">
    {expense.category}
  </span>
</td>

    <td>{expense.description}</td>

    <td className="amount-cell">
  ₹{Number(expense.amount).toLocaleString("en-IN")}
</td>

    <td>
    <span
        className="edit-link"
        onClick={() => onEdit(expense)}
    >
        Edit
    </span>

    {" | "}

    <span
        className="delete-link"
        onClick={() => onDelete(expense.id)}
    >
        Delete
    </span>
</td>

  </tr>
))}

    </tbody>

  </table>
);
}
export default TransactionTable;