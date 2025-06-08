import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import Header from "../components/Header";
import Aside from "../components/Aside";
import BottomContainer from "../components/BottomContainer";
import Button from "../components/Button.jsx";

export default function IntegrationPage() {
  const { id_student } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [data, setData] = useState(null); // datos de integración
  const [student, setStudent] = useState(null); // datos del alumno
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function generarResumen(respuestas) {
    const total = respuestas.length;
    const correctos = respuestas.filter((r) => r.correcto).length;
    const errores = respuestas.filter((r) => r.errores > 0).length;
    const omitidos = respuestas.filter((r) => r.omitido).length;

    if (omitidos >= total * 0.4) {
      return "Se observan numerosas omisiones, lo cual podría indicar dificultades en la atención sostenida.";
    } else if (errores >= total * 0.4) {
      return "El número de errores es elevado, lo que puede reflejar impulsividad o bajo control inhibitorio.";
    } else if (correctos >= total * 0.7) {
      return "El rendimiento general ha sido adecuado, con buena precisión en la tarea de interferencia cognitiva.";
    } else {
      return "El patrón de respuestas presenta variabilidad, lo que puede sugerir inestabilidad atencional.";
    }
  }

  // Obtener informe de integración
  useEffect(() => {
    api
      .get(`/integracion/${id_student}`)
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "No hay informe disponible.")
      )
      .finally(() => setLoading(false));
  }, [id_student]);

  // Obtener datos del estudiante
  useEffect(() => {
    api
      .get("/ninos")
      .then((res) => {
        const match = res.data.find((n) => n.id_nino === Number(id_student));
        setStudent(match);
      })
      .catch((err) => console.error("Error al cargar estudiante:", err));
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
          <BottomContainer className="w-[900px] max-h-[600px] overflow-auto items-start">
            <section className="bg-white p-6 rounded-lg shadow w-full">
              {loading && <p>Cargando informe...</p>}
              {!loading && error && <p className="text-red-500">{error}</p>}
              {!loading && data && (
                <div className="space-y-6">
                  {/* 1. Datos básicos */}
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

                  {/* 2. Gráfico de resultados */}
                  <div className="max-w-xs mx-auto">
                    <ResultsChart
                      respuestas={respuestasStroop}
                      titulo="Stroop Test Results"
                    />
                  </div>

                  {/* 3. Resumen automático */}
                  <div>
                    <p>
                      <span className="font-semibold">Resumen:</span>{" "}
                      {generarResumen(respuestasStroop)}
                    </p>
                  </div>

                  {/* 4. Percentil global para comparativas */}
                  <div>
                    <p>
                      <span className="font-semibold">Percentil Global:</span>{" "}
                      {data.percentil_global}
                    </p>
                  </div>
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
