import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [ninos, setNinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/ninos")
      .then((res) => setNinos(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Error al cargar los niños")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      {/* Botón Añadir Niño arriba */}
      <Header
        title="Dashboard"
        buttonLabel="Añadir Niño"
        onButtonClick={() => navigate("/ninos/nuevo")}
      />

      <BottomContainer>
        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center place-items-center">
            {ninos.map((nino) => (
              <div
                key={nino.id_nino}
                className="w-36 h-40 flex flex-col items-center cursor-pointer border p-3 rounded-lg bg-white"
                onClick={() => navigate(`/ninos/${nino.id_nino}`)}
              >
                <img
                  src={
                    nino.avatar_url
                      ? nino.avatar_url
                      : nino.genero === "femenino"
                      ? "/avatar_femenino01.png"
                      : "/avatar_masculino01.png"
                  }
                  alt={nino.nombre}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      nino.genero === "femenino"
                        ? "/avatar_femenino01.png"
                        : "/avatar_masculino01.png";
                  }}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <span className="bg-blue-600 text-white text-sm px-4 py-1 rounded truncate w-full text-center">
                  {nino.nombre}
                </span>
              </div>
            ))}
          </div>
        )}
      </BottomContainer>

      {/* Botón Cerrar Sesión abajo */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
          className=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
