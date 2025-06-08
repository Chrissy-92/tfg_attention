import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";

const palabras = ["Rojo", "Verde", "Azul", "Amarillo"];
const colores = ["red", "green", "blue", "yellow"];
const DURACION_ESTIMULO = 4000;
const TOTAL_ESTIMULOS = 10;

function generarEstimulo() {
  const word = palabras[Math.floor(Math.random() * palabras.length)];
  const color = colores[Math.floor(Math.random() * colores.length)];
  return { word, color };
}

export default function StroopTestPage() {
  const { id_nino } = useParams();
  const navigate = useNavigate();

  const [empezado, setEmpezado] = useState(false);
  const [estimulo, setEstimulo] = useState(null);
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  const tiempoInicio = useRef(null);
  const timeoutRef = useRef(null);
  const bloqueado = useRef(false);

  const avanzar = () => {
    if (indice >= TOTAL_ESTIMULOS) {
      setFinalizado(true);
      return;
    }

    bloqueado.current = false;
    const nuevo = generarEstimulo();
    setEstimulo(nuevo);
    tiempoInicio.current = Date.now();

    timeoutRef.current = setTimeout(() => {
      guardarRespuesta(false);
    }, DURACION_ESTIMULO);
  };

  const guardarRespuesta = (pulsoBarra) => {
    if (bloqueado.current || !estimulo) return;
    bloqueado.current = true;

    clearTimeout(timeoutRef.current);

    const reaccion = Date.now() - tiempoInicio.current;

    const colorMap = {
      rojo: "red",
      verde: "green",
      azul: "blue",
      amarillo: "yellow",
    };

    const palabra = estimulo.word.toLowerCase();
    const colorEsperado = colorMap[palabra];
    const esCongruente = colorEsperado === estimulo.color;

    const nuevaRespuesta = {
      orden_estimulo: indice + 1,
      estimulo: `${estimulo.word}_${estimulo.color}`,
      tiempo_reaccion: pulsoBarra ? reaccion : null,
      pulso: pulsoBarra,
      correcto: pulsoBarra && esCongruente,
      errores: pulsoBarra && !esCongruente ? 1 : 0,
      omitido: !pulsoBarra,
    };

    console.log(
      "🔎 Comparando:",
      palabra,
      "→",
      colorEsperado,
      "vs",
      estimulo.color
    );
    console.log("🟢 Respuesta registrada:", nuevaRespuesta);

    setRespuestas((prev) => [...prev, nuevaRespuesta]);
    setIndice((prev) => prev + 1);
  };

  useEffect(() => {
    if (empezado && !finalizado) {
      avanzar();
    }
  }, [indice, empezado, finalizado]);

  useEffect(() => {
    if (!empezado || finalizado) return;

    const manejarKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        guardarRespuesta(true);
      }
    };

    window.addEventListener("keydown", manejarKey);
    return () => window.removeEventListener("keydown", manejarKey);
  }, [empezado, finalizado, estimulo]);

  return (
    <div className="min-h-screen bg-violet-300/50">
      <Header
        title="Tarea Stroop"
        buttonLabel="Home"
        onButtonClick={() => navigate("/student-dashboard")}
      />
      <BottomContainer>
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow text-center">
          {!empezado ? (
            <button
              onClick={() => {
                setEmpezado(true);
                setIndice(0);
                avanzar();
              }}
              className="px-6 py-3 text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition"
            >
              Iniciar prueba Stroop
            </button>
          ) : finalizado ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Prueba completada</h2>
            </div>
          ) : (
            estimulo && (
              <div>
                <p className="text-lg mb-2">
                  Estímulo {indice + 1} de {TOTAL_ESTIMULOS}
                </p>
                <h1
                  className="text-6xl font-bold mt-10 mb-6"
                  style={{ color: estimulo.color }}
                >
                  {estimulo.word}
                </h1>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4">
                  <div
                    key={indice}
                    className="h-full bg-green-500"
                    style={{
                      width: "100%",
                      animation: "progreso 4s linear forwards",
                    }}
                  ></div>
                </div>
                <p className="text-sm italic">
                  Pulsa la barra espaciadora si el color y el nombre coinciden
                </p>
              </div>
            )
          )}
        </div>
      </BottomContainer>
    </div>
  );
}
