import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function ResultsChart({ respuestas, titulo }) {
  const totalCorrectos = respuestas.filter((r) => r.correcto).length;
  const totalErrores = respuestas.filter((r) => r.errores > 0).length;
  const totalOmitidos = respuestas.filter((r) => r.omitido).length;

  const data = {
    labels: ["Correct", "Errors", "Omissions"],
    datasets: [
      {
        label: "Total",
        data: [totalCorrectos, totalErrores, totalOmitidos],
        backgroundColor: ["#22c55e", "#ef4444", "#facc15"], // verde, rojo, amarillo
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: titulo,
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="max-w-sm mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
}
