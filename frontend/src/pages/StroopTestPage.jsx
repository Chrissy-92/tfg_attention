import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";
import api from "../services/api.js";

const DURACION_ESTIMULO = 4000;

export default function StroopTestPage() {
  const { id_nino } = useParams();
  const navigate = useNavigate();

  const [empezado, setEmpezado] = useState(false);
  const [estimulo, setEstimulo] = useState(null);
  const [indice, setIndice] = useState(0);
  const [estimulos, setEstimulos] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const [respuestas, setRespuestas] = useState([]);

  const idEvaluacionRef = useRef(null);
  const tiempoInicio = useRef(null);
  const timeoutRef = useRef(null);
  const bloqueado = useRef(false);

  const avanzar = () => {
    console.log(
      "➡️ avanzar(): indice =",
      indice,
      "estimulos.length =",
      estimulos.length
    );

    if (indice >= estimulos.length) {
      console.log("🛑 Finaliza: índice supera o iguala a la longitud");
      setFinalizado(true);
      return;
    }

    bloqueado.current = false;
    const actual = estimulos[indice];
    const [palabra, color] = actual.estimulo.split("_");
    setEstimulo({ ...actual, palabra, color });
    console.log("📣 Estímulo mostrado:", { palabra, color, indice });
    tiempoInicio.current = Date.now();

    timeoutRef.current = setTimeout(() => {
      console.log("⌛ Tiempo agotado, registrando como omitido");
      guardarRespuesta(false);
    }, DURACION_ESTIMULO);
  };

  const guardarRespuesta = async (respuestaCorrecta) => {
    if (bloqueado.current || !estimulo) return;
    bloqueado.current = true;

    clearTimeout(timeoutRef.current);
    const reaccion = Date.now() - tiempoInicio.current;

    const palabraIgualColor =
      estimulo.palabra.toLowerCase() === estimulo.color.toLowerCase();

    const nuevaRespuesta = {
      orden_estimulo: estimulo.orden_estimulo,
      estimulo: estimulo.estimulo,
      tiempo_reaccion: reaccion,
      respuesta: palabraIgualColor,
      correcto: palabraIgualColor,
      errores: palabraIgualColor ? 0 : 1,
      omitido: !respuestaCorrecta,
    };

    try {
      await api.post("/detalles", {
        id_evaluacion: idEvaluacionRef.current,
        ...nuevaRespuesta,
      });
    } catch (error) {
      console.error("❌ Error al guardar detalle:", error);
    }

    setIndice((prev) => prev + 1);
    setRespuestas((prev) => [...prev, nuevaRespuesta]);
  };

  // 🔁 Avanza automáticamente al cambiar el índice
  useEffect(() => {
    if (!empezado || finalizado) return;
    avanzar();
  }, [indice]);

  // ✅ Lanza avanzar una vez cuando los estímulos estén cargados y empezado sea true
  useEffect(() => {
    if (empezado && estimulos.length > 0) {
      avanzar();
    }
  }, [empezado, estimulos]);

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
              onClick={async () => {
                try {
                  const { data } = await api.post("/pruebas/Stroop/run", {
                    id_nino: Number(id_nino),
                  });
                  idEvaluacionRef.current = data.id_evaluacion;
                  console.log("🆔 ID evaluación creada:", data.id_evaluacion);

                  const respuesta = await api.get(
                    `/detalles/${idEvaluacionRef.current}`
                  );
                  console.log(
                    "🧪 respuesta cruda de GET detalles:",
                    respuesta.data
                  );
                  setEstimulos(respuesta.data);
                  setEmpezado(true);
                  setIndice(0);
                } catch (err) {
                  console.error("❌ Error al iniciar evaluación Stroop:", err);
                  alert("No se pudo iniciar la prueba Stroop.");
                }
              }}
              className="px-6 py-3 text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition"
            >
              Iniciar prueba Stroop
            </button>
          ) : finalizado ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Prueba completada</h2>
            </div>
          ) : estimulo ? (
            <div>
              <p className="text-lg mb-2">
                Estímulo {indice + 1} de {estimulos.length}
              </p>
              <h1
                className="text-6xl font-bold mt-10 mb-6"
                style={{ color: estimulo.color }}
              >
                {estimulo.palabra}
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
              <p className="text-sm italic mt-2">
                Pulsa la barra espaciadora si el color y el nombre coinciden
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">Cargando estímulo...</p>
          )}
        </div>
      </BottomContainer>
    </div>
  );
}
