import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StroopDoughnutChart({ respuestasStroop }) {
  if (!respuestasStroop || respuestasStroop.length === 0) return null;

  let correctas = 0;
  let incorrectas = 0;
  let incorrectasNeutras = 0;
  let omitidas = 0;

  respuestasStroop.forEach((resp) => {
    const [palabra, color] = resp.estimulo.toLowerCase().split("_");
    const esNeutral =
      palabra !== "rojo" &&
      palabra !== "azul" &&
      palabra !== "amarillo" &&
      palabra !== "verde" &&
      palabra !== "morado" &&
      palabra !== "rosa" &&
      palabra !== "naranja" &&
      palabra !== "café";

    if (esNeutral) {
      if (resp.respuesta === true) incorrectasNeutras++;
      else correctas++;
    } else {
      if (resp.correcto === true) correctas++;
      else if (resp.fallo_neutro === true) incorrectasNeutras++;
      else if (resp.omitido === true) omitidas++;
      else incorrectas++;
    }
  });

  const total = correctas + incorrectas + incorrectasNeutras + omitidas;

  const data = {
    labels: [
      `Correctas (${correctas})`,
      `Incorrectas (${incorrectas})`,
      `Incorrectas neutras (${incorrectasNeutras})`,
      `Omisiones (${omitidas})`,
    ],
    datasets: [
      {
        data: [correctas, incorrectas, incorrectasNeutras, omitidas],
        backgroundColor: ["#4ade80", "#f87171", "#facc15", "#60a5fa"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} respuestas (${percentage}%)`;
          },
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Resultados Prueba Stroop
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}
