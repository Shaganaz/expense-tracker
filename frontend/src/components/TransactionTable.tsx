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
  <table>

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

    <td>{expense.expense_date}</td>

    <td>{expense.category}</td>

    <td>{expense.description}</td>

    <td>₹{expense.amount}</td>

    <td>
      <button
  onClick={() => onEdit(expense)}
>
  ✏️
</button>

<button
  onClick={() => onDelete(expense.id)}
>
  🗑️
</button>
    </td>

  </tr>
))}

    </tbody>

  </table>
);
}
export default TransactionTable;