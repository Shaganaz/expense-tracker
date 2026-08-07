import { Doughnut } from "react-chartjs-2";
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
          "#F48FB1",
          "#B39DDB",
          "#81C784",
          "#FFCC80",
          "#80DEEA",
          "#EF9A9A",
        ],

        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {
      legend: {
        position: "bottom" as const,

        labels: {
          usePointStyle: true,
          pointStyle: "circle" as const,
          padding: 20,
          font: {
            size: 13,
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-wrapper">
      <Doughnut
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default ExpensePieChart;