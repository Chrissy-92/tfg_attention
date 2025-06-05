import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import Header from "../components/Header";
import Aside from "../components/Aside";
import BottomContainer from "../components/BottomContainer";

export default function IntegrationPage() {
  const { id_nino } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/integracion/${id_nino}`)
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Error al cargar informe")
      )
      .finally(() => setLoading(false));
  }, [id_nino]);

  return (
    <div className="min-h-screen bg-violet-300/50">
      <Header
        title="Informe de Integración"
        buttonLabel="Home"
        onButtonClick={() => navigate("/dashboard")}
      />

      <div className="flex gap-4 px-4">
        <div className="w-72">
          <Aside
            nombre={user?.nombre}
            avatar_url={user?.imagen_url}
            descripcion={[
              "Este informe resume el desempeño del estudiante.",
              "Puedes revisar el percentil global obtenido.",
            ]}
            buttonLabel="Cerrar sesión"
            onButtonClick={() => {
              logout();
              navigate("/");
            }}
            buttonColor="rojo"
          />
        </div>

        <div className="flex-1 max-w-3xl">
          <BottomContainer>
            <section className="bg-white p-6 rounded-lg shadow w-full">
              {loading && <p>Cargando informe...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {data && (
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
      </div>
    </div>
  );
}
