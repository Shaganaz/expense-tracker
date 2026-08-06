type IncomeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;

  income: string;
  setIncome: (value: string) => void;
};

function IncomeModal({
  isOpen,
  onClose,
  onSave,
  income,
  setIncome,
}: IncomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="expense-modal">
        <div className="expense-modal-header">
          <h2>Set Monthly Income</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <label>Monthly Income</label>

        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Enter your monthly income"
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

export default IncomeModal;