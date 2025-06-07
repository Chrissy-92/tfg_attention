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

      <main className="flex justify-center items-center gap-72 mx-5 h-[calc(100vh-80px)]">
        <div className="w-80">
          <Aside student={student} modo="integration" />
        </div>
        <div className="flex-1 max-w-3xl flex flex-col">
          <BottomContainer className="w-[900px] max-h-[600px] overflow-auto items-start">
            <section className="bg-white p-6 rounded-lg shadow w-full">
              {loading && <p>Cargando informe...</p>}
              {!loading && error && <p className="text-red-500">{error}</p>}
              {!loading && data && (
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">ID Integración:</span>{" "}
                    {data.id_integracion}
                  </p>
                  <p>
                    <span className="font-semibold">ID Estudiante:</span>{" "}
                    {data.id_nino}
                  </p>
                  <p>
                    <span className="font-semibold">Resumen:</span>{" "}
                    {data.resumen}
                  </p>
                  <p>
                    <span className="font-semibold">Percentil Global:</span>{" "}
                    {data.percentil_global}
                  </p>
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
