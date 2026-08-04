type TransactionSummaryProps = {
  selectedMonth: string;
  transactionCount: number;
  totalSpent: number;
};

function TransactionSummary({
  selectedMonth,
  transactionCount,
  totalSpent,
}: TransactionSummaryProps) {
  const formattedMonth = selectedMonth
    ? new Date(`${selectedMonth}-01`).toLocaleDateString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "All Transactions";

  return (
    <div className="transaction-summary">

      <h2>{formattedMonth}</h2>

      <p>
        <strong>{transactionCount}</strong> Transactions
      </p>

      <p>
        <strong>₹{totalSpent}</strong> Spent
      </p>

    </div>
  );
}

export default TransactionSummary;