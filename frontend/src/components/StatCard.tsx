type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

function StatCard({
  title,
  value,
  icon,
  buttonText,
  onButtonClick,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <p className="stat-title">{title}</p>

      <h2 className="stat-value">{value}</h2>
      {buttonText && (
  <button
    className="stat-card-button"
    onClick={onButtonClick}
  >
    {buttonText}
  </button>
)}
    </div>
  );
}

export default StatCard;