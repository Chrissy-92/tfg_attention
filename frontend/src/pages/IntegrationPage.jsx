import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import Header from "../components/Header";
import Aside from "../components/Aside";
import BottomContainer from "../components/BottomContainer";
import Button from "../components/Button.jsx";
import StroopResultsCard from "../components/Psychologist/StroopResultsCard.jsx";

export default function IntegrationPage() {
  const { id_student } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);
  const [respuestasStroop, setRespuestasStroop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/ninos")
      .then((res) => {
        const match = res.data.find((n) => n.id_nino === Number(id_student));
        setStudent(match);
      })
      .catch((err) => console.error("Error al cargar estudiante:", err));
  }, [id_student]);

  // useEffect(() => {
  //   api
  //     .get(`/integracion/${id_student}`)
  //     .then((res) => setData(res.data))
  //     .catch((err) => {
  //       console.warn(
  //         "No hay informe de integración aún:",
  //         err.response?.data?.message
  //       );
  //       setData(null);
  //     })
  //     .finally(() => setLoading(false));
  // }, [id_student]);

  useEffect(() => {
    const cargarResultadosYDetalles = async () => {
      try {
        setLoading(true);
        const { data: resultados } = await api.get(`/resultados/${id_student}`);
        const evaluacionStroop = resultados
          .slice()
          .reverse()
          .find((r) => r.tipo_prueba === "Stroop");

        if (!evaluacionStroop) {
          console.warn("❌ No se encontró evaluación Stroop para este alumno.");
          setRespuestasStroop([]);
          setError("Este alumno aún no ha realizado la prueba Stroop.");
          return;
        }

        const idEvaluacion = evaluacionStroop.id_evaluacion;
        const { data: detalles } = await api.get(`/detalles/${idEvaluacion}`);
        setRespuestasStroop(detalles);
        console.log("Respuestas cargadas:", detalles);
        console.log("ID evaluación Stroop:", idEvaluacion);
        setError(null);
      } catch (err) {
        console.error("❌ Error al cargar detalles de Stroop:", err);
        setRespuestasStroop([]);
        setError("No se pudieron cargar los resultados del test Stroop.");
      } finally {
        setLoading(false);
      }
    };

    if (id_student) {
      cargarResultadosYDetalles();
    }
  }, [id_student]);

  return (
    <div className="min-h-screen bg-violet-300/50 flex flex-col">
      <Header
        title="Informe de Integración"
        buttonLabel="Home"
        onButtonClick={() => navigate("/psychologist-dashboard")}
      />

      <main className="flex justify-center items-center gap-48 mx-5 h-[calc(100vh-80px)]">
        <div className="w-80">
          <Aside student={student} modo="integration" />
        </div>
        <div className="flex-1 max-w-3xl flex flex-col">
          <BottomContainer className="w-[900px] min-h-[700px] overflow-auto items-start">
            <section className="bg-slate-200 p-6 rounded-lg shadow w-full min-h-[600px]">
              {loading && <p>Cargando informe...</p>}
              {!loading && error && <p className="text-red-500">{error}</p>}
              {!loading && !error && (
                <div className="space-y-6">
                  {data && (
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">ID Integración:</span>{" "}
                        {data.id_integracion}
                      </p>
                      <p>
                        <span className="font-semibold">ID Estudiante:</span>{" "}
                        {data.id_nino}
                      </p>
                    </div>
                  )}

                  <StroopResultsCard respuestasStroop={respuestasStroop} />

                  {respuestasStroop.length === 0 && !error && (
                    <p className="text-center text-gray-600">
                      No hay resultados Stroop disponibles.
                    </p>
                  )}

                  {data && (
                    <div>
                      <p>
                        <span className="font-semibold">Percentil Global:</span>{" "}
                        {data.percentil_global}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </BottomContainer>
        </div>
      </main>

      <div className="fixed px-3 bottom-7 right-6 z-50">
        <Button
          color="rojo"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
