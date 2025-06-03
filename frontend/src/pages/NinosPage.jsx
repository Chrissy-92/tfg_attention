import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function NinosPage() {
  const navigate = useNavigate();
  const [ninos, setNinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/ninos")
      .then((res) => setNinos(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Error cargando niños")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Niños</h1>
        <button
          onClick={() => navigate("/ninos/nuevo")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Añadir Niño
        </button>
      </header>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-2">
          {ninos.length === 0 ? (
            <li>No hay niños registrados.</li>
          ) : (
            ninos.map((nino) => (
              <li
                key={nino.id_nino}
                onClick={() => navigate(`/ninos/${nino.id_nino}`)}
                className="cursor-pointer p-4 border rounded hover:bg-gray-50"
              >
                <p className="font-medium">{nino.nombre}</p>
                <p className="text-sm text-gray-600">
                  Nacimiento: {nino.fecha_nacimiento}
                </p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
