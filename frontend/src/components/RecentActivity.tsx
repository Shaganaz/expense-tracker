type Activity = {
  date: string;
  total: number;
  transactionCount: number;
};

type RecentActivityProps = {
  activities: Activity[];
};

function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <div>

      <h3>Recent Activity</h3>

      {activities.map(activity => (

        <div
          key={activity.date}
        >

          <h4>{activity.date}</h4>

          <p>
            ₹{activity.total}
          </p>

          <small>
            {activity.transactionCount}
            {" "}
            Transactions
          </small>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default RecentActivity;