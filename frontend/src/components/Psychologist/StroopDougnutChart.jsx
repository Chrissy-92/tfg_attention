// src/components/Psychologist/StroopDoughnutChart.jsx
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StroopDoughnutChart({ puntaje }) {
  const restante = 100 - puntaje;

  const data = {
    labels: ["Correct", "Incorrect/Omitted"],
    datasets: [
      {
        data: [puntaje, restante],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#4b5563",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-sm mx-auto text-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Stroop Test Result
      </h3>
      <Doughnut data={data} options={options} />
      <p className="mt-4 text-sm text-gray-600">
        Accuracy:{" "}
        <span className="font-medium text-emerald-600">
          {puntaje.toFixed(2)}%
        </span>
      </p>
    </div>
  );
}
