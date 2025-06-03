import React from "react";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-200">
      <div className="bg-gray-800 p-10 rounded-xl shadow-md text-center w-full max-w-md">
        <h1 className="text-yellow-300 text-2xl font-semibold mb-6">
          Selecciona tu perfil
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login-alumno")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Alumno
          </button>
          <button
            onClick={() => navigate("/login-psicologo")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Psicólogo
          </button>
          <button
            onClick={() => navigate("/registro")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}
