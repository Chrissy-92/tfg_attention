import { useState, useEffect } from "react";

const palabras = ["Rojo", "Verde", "Azul", "Amarillo"];
const colores = ["red", "green", "blue", "yellow"];

function generarEstimulo() {
  const word = palabras[Math.floor(Math.random() * palabras.length)];
  const color = colores[Math.floor(Math.random() * colores.length)];
  return { word, color };
}

export default function StroopTestPage() {
  const [started, setStarted] = useState(false);
  const [estimulos, setEstimulos] = useState([]);
  const [indice, setIndice] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (started) {
      const nuevos = Array.from({ length: 5 }, () => generarEstimulo());
      setEstimulos(nuevos);
      setStartTime(Date.now());
    }
  }, [started]);

  const manejarRespuesta = (colorSeleccionado) => {
    const tiempo = Date.now() - startTime;
    const actual = estimulos[indice];
    const correcto = colorSeleccionado === actual.color;

    setRespuestas((prev) => [
      ...prev,
      {
        orden_estimulo: indice + 1,
        estimulo: `${actual.word}_${actual.color}`,
        tiempo_reaccion: tiempo,
        respuesta: colorSeleccionado,
        correcto,
        errores: correcto ? 0 : 1,
      },
    ]);

    if (indice + 1 < estimulos.length) {
      setIndice(indice + 1);
      setStartTime(Date.now());
    } else {
      setFinalizado(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition"
        >
          Iniciar prueba Stroop
        </button>
      ) : finalizado ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Prueba completada</h2>
          <pre className="text-left text-sm bg-white p-4 rounded-xl shadow">
            {JSON.stringify(respuestas, null, 2)}
          </pre>
        </div>
      ) : (
        <>
          <p className="text-lg mb-2">
            Estimulo {indice + 1} de {estimulos.length}
          </p>
          <h1
            className="text-5xl font-bold mb-6"
            style={{ color: estimulos[indice].color }}
          >
            {estimulos[indice].word}
          </h1>
          <div className="flex gap-4 justify-center">
            {colores.map((c) => (
              <button
                key={c}
                onClick={() => manejarRespuesta(c)}
                className="px-5 py-2 rounded-xl text-white text-lg"
                style={{ backgroundColor: c }}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
