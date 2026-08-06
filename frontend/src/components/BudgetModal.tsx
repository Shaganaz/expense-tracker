type BudgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;

  budget: string;
  setBudget: (value: string) => void;
};

function BudgetModal({
  isOpen,
  onClose,
  onSave,
  budget,
  setBudget,
}: BudgetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="expense-modal">

        <div className="expense-modal-header">
          <h2>Set Monthly Budget</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <label>Monthly Budget</label>

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter monthly budget"
        />

        <div className="expense-modal-buttons">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={onSave}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

export default BudgetModal;