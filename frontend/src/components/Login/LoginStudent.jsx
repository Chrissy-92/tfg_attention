import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAlumno } from "../services/api";
import userDefault from "/user_default.jpg";

export default function LoginAlumno() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const alumno = await loginAlumno({ nombre, password });

      localStorage.setItem("alumno", JSON.stringify(alumno));

      if (alumno.cambio_requerido) {
        navigate(`/activar-perfil/${alumno.id_nino}`);
      } else {
        navigate("/dashboard-alumno");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
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
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
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
