type StatCardProps = {
  title: string;
  value: string | number;
};

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <p>{title}</p>

      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;