import { Pie } from "react-chartjs-2";

import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

type ExpensePieChartProps = {
  data: {
    label: string;
    value: number;
  }[];
};

function ExpensePieChart({ data }: ExpensePieChartProps) {
  const chartData = {
    labels: data.map((item) => item.label),

    datasets: [
      {
        data: data.map((item) => item.value),

        backgroundColor: [
          "#4F46E5",
          "#06B6D4",
          "#F59E0B",
          "#EF4444",
          "#10B981",
          "#8B5CF6",
          "#EC4899",
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
}

export default ExpensePieChart;
