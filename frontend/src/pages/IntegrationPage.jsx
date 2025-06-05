// src/pages/IntegracionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";

export default function IntegracionPage() {
  const { id_nino } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
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
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-bold">Informe de Integración</h1>
        <button
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
        {loading && <p>Cargando informe...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {data && (
          <div className="space-y-4">
            <p>
              <span className="font-semibold">ID Integración:</span>{" "}
              {data.id_integracion}
            </p>
            <p>
              <span className="font-semibold">ID Niño:</span> {data.id_nino}
            </p>
            <p>
              <span className="font-semibold">Resumen:</span> {data.resumen}
            </p>
            <p>
              <span className="font-semibold">Percentil Global:</span>{" "}
              {data.percentil_global}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
