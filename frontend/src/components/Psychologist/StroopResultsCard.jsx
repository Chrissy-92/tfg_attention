import StroopDoughnutChart from "./StroopDougnutChart.jsx";

export default function StroopResultsCard({ respuestasStroop }) {
  if (!respuestasStroop || respuestasStroop.length === 0) return null;

  // Clasificación de respuestas
  const total = respuestasStroop.length;
  const correctas = respuestasStroop.filter((r) => r.correcto).length;
  const incorrectas = respuestasStroop.filter(
    (r) => !r.correcto && !r.fallo_neutro && !r.omitido
  ).length;
  const incorrectasNeutras = respuestasStroop.filter(
    (r) => r.fallo_neutro
  ).length;
  const omitidas = respuestasStroop.filter((r) => r.omitido).length;

  const pct = (n) => ((n / total) * 100).toFixed(1) + "%";

  // Lógica que genera el resumen y recomendación según el patrón de respuestas
  function evaluarStroop() {
    if (incorrectas === 0 && omitidas === 5) {
      return {
        mensaje:
          "El alumno ha completado la tarea sin errores, demostrando un control atencional y ejecutivo excelente.",
        sugerencia:
          "Mantener desafíos con distractores y reducir gradualmente el tiempo de respuesta para potenciar la flexibilidad cognitiva.",
      };
    }

    if (incorrectas <= 3 && omitidas >= 4) {
      return {
        mensaje:
          "Rendimiento sobresaliente: predomina la precisión y la inhibición adecuada ante estímulos irrelevantes.",
        sugerencia:
          "Introducir retos cognitivos más complejos (juegos de memoria, secuencias musicales) para seguir fortaleciendo la autorregulación.",
      };
    }

    if (incorrectas >= 5) {
      return {
        mensaje:
          "Alta tasa de errores: posible impulsividad o dificultades de control inhibitorio ante estímulos incongruentes.",
        sugerencia:
          "Reforzar el autocontrol con juegos que exijan pausas deliberadas y feedback inmediato, premiando la constancia.",
      };
    }

    if (correctas + omitidas === incorrectas) {
      return {
        mensaje:
          "Existe un equilibrio entre aciertos y fallos, indicando variabilidad atencional que conviene monitorizar.",
        sugerencia:
          "Ejercitar automatismos cognitivos mediante actividades repetitivas y dinámicas que reduzcan la impulsividad.",
      };
    }

    return {
      mensaje:
        "El desempeño presenta un patrón mixto que requiere seguimiento adicional para determinar áreas de mejora concretas.",
      sugerencia:
        "Combinar ejercicios lúdicos de atención y control inhibitorio con registros de progreso para ajustar la intervención.",
    };
  }

  const { mensaje, sugerencia } = evaluarStroop();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto">
      {/* Layout dividido: gráfico izquierda, texto derecha */}
      <div className="flex flex-row gap-8">
        {/* Gráfico circular */}
        <div className="w-1/2 flex justify-center items-center">
          <StroopDoughnutChart respuestasStroop={respuestasStroop} />
        </div>

        {/* Bloque de resumen y métricas */}
        <div className="w-1/2 flex flex-col justify-start space-y-6">
          <h2 className="text-xl font-bold text-gray-800">
            Resultados Prueba Stroop
          </h2>

          {/* Métricas porcentuales */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 text-center">
            <p>
              <span className="font-semibold text-green-600">Correctas:</span>{" "}
              {pct(correctas)}
            </p>
            <p>
              <span className="font-semibold text-red-500">Incorrectas:</span>{" "}
              {pct(incorrectas)}
            </p>
            <p>
              <span className="font-semibold text-yellow-500">
                Incorrectas neutras:
              </span>{" "}
              {pct(incorrectasNeutras)}
            </p>
            <p>
              <span className="font-semibold text-blue-500">Omisiones:</span>{" "}
              {pct(omitidas)}
            </p>
          </div>

          {/* Evaluación escrita */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Resumen:</h3>
            <p className="text-gray-700">{mensaje}</p>
            <h4 className="font-semibold text-gray-800 mt-3 mb-1">
              Próximos pasos:
            </h4>
            <p className="text-gray-700">{sugerencia}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
