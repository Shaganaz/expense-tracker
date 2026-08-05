type ExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;

  amount: string;
  setAmount: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  expenseDate: string;
  setExpenseDate: (value: string) => void;

  customCategory: string;
  setCustomCategory: (value: string) => void;

  editingExpenseId: number | null;
};

function ExpenseModal({
  isOpen,
  onClose,
  onSave,
  amount,
  setAmount,
  category,
  setCategory,
  description,
  setDescription,
  expenseDate,
  setExpenseDate,
  customCategory,
  setCustomCategory,
  editingExpenseId,
}: ExpenseModalProps) {

  if (!isOpen) {
    return null;
  }

  return (
  <div className="modal-overlay">

    <div className="expense-modal">

      <div className="expense-modal-header">

        <h2>
          {editingExpenseId === null
            ? "Add Expense"
            : "Edit Expense"}
        </h2>

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

      </div>

      <label>Amount</label>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Category</label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Fuel">Fuel</option>
        <option value="Bills">Bills</option>
        <option value="Health">Health</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      {category === "Other" && (

        <input
          type="text"
          placeholder="Custom Category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />

      )}

      <label>Description</label>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Date</label>

      <input
        type="date"
        value={expenseDate}
        onChange={(e) => setExpenseDate(e.target.value)}
      />

      <div className="expense-modal-buttons">

        <button
          className="save-btn"
          onClick={onSave}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
);
}

export default ExpenseModal;