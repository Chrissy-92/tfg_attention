// src/components/LoginAlumno.jsx
import { useState } from "react";
import userDefault from "/user_default.jpg";

export default function LoginAlumno() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intento login alumno →", { nombre, password });
    // Aquí irá la lógica de autenticación cuando esté implementada
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <img
          src={userDefault}
          alt="avatar alumno"
          className="mx-auto mb-4 w-32 h-32 rounded-xl object-cover"
        />
        <h2 className="text-xl font-semibold text-center mb-4">Login Alumno</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
