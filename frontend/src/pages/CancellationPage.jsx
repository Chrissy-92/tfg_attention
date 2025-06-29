import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";
import PopupModal from "../components/PopupModal.jsx";

const LETTERS = "ABCDEFGHIJKLMN\u00d1OPQRSTUVWXYZ".split("");
const GRID_SIZE = 60;
const DISPLAY_TIME = 20000;
const TOTAL_TRIALS = 5;

export default function CancellationPage() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [gridLetters, setGridLetters] = useState([]);
  const [trialIndex, setTrialIndex] = useState(0);
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [usedTargets, setUsedTargets] = useState([]);
  const [countdown, setCountdown] = useState(DISPLAY_TIME / 1000);
  const [finished, setFinished] = useState(false);

  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    let interval;
    if (started && !finished) {
      setCountdown(DISPLAY_TIME / 1000);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [trialIndex, started]);

  useEffect(() => {
    if (started && trialIndex < TOTAL_TRIALS) {
      startTrial();
    } else if (trialIndex === TOTAL_TRIALS) {
      setFinished(true);
    }
  }, [trialIndex, started]);

  const startTrial = () => {
    const remaining = LETTERS.filter((l) => !usedTargets.includes(l));
    const target = remaining[Math.floor(Math.random() * remaining.length)];
    const occurrences = Math.floor(Math.random() * 5) + 3;

    const letters = Array.from({ length: GRID_SIZE }, () => {
      return LETTERS[Math.floor(Math.random() * LETTERS.length)];
    });

    const indices = new Set();
    while (indices.size < occurrences) {
      indices.add(Math.floor(Math.random() * GRID_SIZE));
    }
    indices.forEach((idx) => {
      letters[idx] = target;
    });

    setCurrentTarget(target);
    setGridLetters(letters);
    setClickedIndexes([]);
    setUsedTargets((prev) => [...prev, target]);

    const nuevaRespuesta = {
      target,
      totalPresentados: occurrences,
      seleccionados: [],
    };

    setRespuestas((prev) => [...prev, nuevaRespuesta]);

    setTimeout(() => {
      setTrialIndex((prev) => prev + 1);
    }, DISPLAY_TIME);
  };

  const handleClick = (index) => {
    const letra = gridLetters[index];
    setClickedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    setRespuestas((prev) => {
      const copia = [...prev];
      const seleccionados = copia[trialIndex].seleccionados;
      if (seleccionados.includes(letra)) {
        copia[trialIndex].seleccionados = seleccionados.filter(
          (l, i) => i !== seleccionados.indexOf(letra)
        );
      } else {
        copia[trialIndex].seleccionados.push(letra);
      }
      return copia;
    });
  };

  const handleStart = () => {
    setStarted(true);
    setTrialIndex(0);
    setFinished(false);
    setUsedTargets([]);
    setClickedIndexes([]);
    setRespuestas([]);
  };

  let aciertos = 0;
  let errores = 0;
  let omisiones = 0;

  respuestas.forEach(({ target, totalPresentados, seleccionados }) => {
    const correctos = seleccionados.filter((l) => l === target).length;
    const incorrectos = seleccionados.length - correctos;
    const faltantes = totalPresentados - correctos;
    aciertos += correctos;
    errores += incorrectos;
    omisiones += faltantes;
  });

  const totalEstimulos = respuestas.reduce(
    (sum, r) => sum + r.totalPresentados,
    0
  );

  return (
    <div className="min-h-screen bg-orange-200 relative">
      <Header
        title="Prueba de Cancelación de Letras"
        buttonLabel="Inicio"
        onButtonClick={() => navigate("/student-dashboard")}
      />

      {started && !finished && (
        <div className="absolute top-44 left-1/2 transform -translate-x-1/2 z-50 w-[300px]">
          <PopupModal
            key={trialIndex}
            mensaje={`Tiempo restante: ${countdown}s`}
            tipo="exito"
            posicion="center"
            duracion={DISPLAY_TIME}
            modoCancelacion={true}
          />
        </div>
      )}

      <BottomContainer>
        {!started && (
          <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Instrucciones</h2>
            <p className="mb-6">
              Encuentra y haz clic sobre la letra objetivo tantas veces como
              aparezca en el recuadro de la derecha. ¡Cuidado!, el tiempo por
              letra es limitado.
            </p>
            <button
              className="px-6 py-3 text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition"
              onClick={handleStart}
            >
              Comenzar Prueba
            </button>
          </div>
        )}

        {started && !finished && (
          <div className="flex flex-col md:flex-row w-full gap-6 items-center justify-center px-96">
            <div className="flex-1 text-center">
              <div className="w-36 h-36 bg-white text-7xl rounded-full flex items-center justify-center shadow mx-auto">
                {currentTarget}
              </div>
              <h3 className="mt-4 text-lg">Encuentra esta letra</h3>
            </div>

            <div className="flex-1 grid grid-cols-6 gap-2 max-w-md">
              {gridLetters.map((letter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClick(idx)}
                  className={`text-lg font-bold rounded shadow p-2 hover:bg-yellow-100 ${
                    clickedIndexes.includes(idx) ? "bg-green-300" : "bg-white"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {finished && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">¡Prueba completada!</h2>
            <p className="mb-2">
              Total estímulos presentados: {totalEstimulos}
            </p>
            <p className="mb-2">
              Aciertos: {aciertos} | Errores: {errores}
            </p>
            <p className="mb-6">Omisiones: {omisiones < 0 ? 0 : omisiones}</p>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700"
              onClick={() => navigate("/student-dashboard")}
            >
              Volver al Dashboard
            </button>
          </div>
        )}
      </BottomContainer>
    </div>
  );
}
