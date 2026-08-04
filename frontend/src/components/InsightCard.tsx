type InsightCardProps = {
  title: string;
  main: string;
  sub: string;
  message?: string;
  onClick?: () => void;
};

function InsightCard({
  title,
  main,
  sub,
  message,
  onClick,
}: InsightCardProps) {
  return (
    <div
      className="insight-card"
      onClick={onClick}
    >
      <h4>{title}</h4>

<h3>{main}</h3>

<p>{sub}</p>

{message && (
  <small>{message}</small>
)}
    </div>
  );
}

export default InsightCard;