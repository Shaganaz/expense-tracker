type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
};

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <p className="stat-title">{title}</p>

      <h2 className="stat-value">{value}</h2>
    </div>
  );
}

export default StatCard;