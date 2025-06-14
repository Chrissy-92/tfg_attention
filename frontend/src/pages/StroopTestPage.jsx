import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";
import api from "../services/api.js";

const DURACION_ESTIMULO = 3000;

export default function StroopTestPage() {
  const { id_nino } = useParams();
  const navigate = useNavigate();
  const guardarRespuestaRef = useRef();

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

  // Muestra el estímulo actual y lanza el temporizador
  const avanzar = () => {
    if (indice >= estimulos.length) {
      setFinalizado(true);
      return;
    }

    bloqueado.current = false;
    const actual = estimulos[indice];
    const [palabra, color] = actual.estimulo.split("_");
    setEstimulo({ ...actual, palabra, color });
    tiempoInicio.current = Date.now();

    timeoutRef.current = setTimeout(() => {
      if (guardarRespuestaRef.current) {
        guardarRespuestaRef.current(false);
      }
    }, DURACION_ESTIMULO);
  };

  // Lógica para guardar cada respuesta con sus condiciones
  const guardarRespuesta = (() => {
    let procesando = false;

    return async (respuestaCorrecta) => {
      if (procesando || !estimulo) return;
      procesando = true;
      bloqueado.current = true;

      clearTimeout(timeoutRef.current);
      const reaccion = Date.now() - tiempoInicio.current;

      const congruentes = [
        "Rojo_red",
        "Verde_green",
        "Azul_blue",
        "Amarillo_yellow",
        "Morado_purple",
        "Rosa_pink",
        "Naranja_orange",
        "Café_brown",
      ];

      const respondio = respuestaCorrecta;
      const esNeutro = estimulo.estimulo.toLowerCase().includes("neutro");
      const palabraIgualColor = congruentes.includes(estimulo.estimulo);

      const omitido = !respondio;
      const falloNeutro = respondio && esNeutro;

      let correcto = false;
      if (esNeutro) {
        correcto = !respondio;
      } else if (palabraIgualColor) {
        correcto = respondio;
      }

      const nuevaRespuesta = {
        orden_estimulo: estimulo.orden_estimulo,
        estimulo: estimulo.estimulo,
        tiempo_reaccion: respondio ? reaccion : null,
        respuesta: respondio,
        correcto,
        errores: correcto ? 0 : 1,
        omitido,
        fallo_neutro: falloNeutro,
      };

      try {
        await api.post("/detalles", {
          id_evaluacion: idEvaluacionRef.current,
          ...nuevaRespuesta,
        });
      } catch (error) {}

      const respuestasFinales = [...respuestas, nuevaRespuesta];
      setRespuestas(respuestasFinales);

      if (respuestasFinales.length === estimulos.length) {
        const aciertos = respuestasFinales.filter((r) => r.correcto).length;
        const total = respuestasFinales.length;
        const puntaje = (aciertos / total) * 100;

        try {
          await api.post("/resultados", {
            id_nino: Number(id_nino),
            id_evaluacion: idEvaluacionRef.current,
            puntaje: puntaje.toFixed(2),
            observaciones: "Resultado automático de Stroop test",
          });
        } catch (err) {}

        setFinalizado(true);
      } else {
        setIndice((prev) => prev + 1);
      }

      procesando = false;
    };
  })();

  useEffect(() => {
    if (!empezado || finalizado) return;
    avanzar();
  }, [indice]);

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

  guardarRespuestaRef.current = guardarRespuesta;

  return (
    <div className="min-h-screen bg-violet-300/50">
      <Header
        title="Prueba Test Stroop"
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
                  setEstimulos(data.estimulos);
                  setEmpezado(true);
                  setIndice(0);
                } catch (err) {
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
