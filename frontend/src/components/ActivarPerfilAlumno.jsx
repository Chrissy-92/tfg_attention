import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activarAlumno } from "../services/api";

export default function ActivarPerfilAlumno() {
  const { id_nino } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    nuevaPassword: "",
    imagen_url: "",
  });
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await activarAlumno({ id_nino, ...form });
      setExito(true);
      setTimeout(() => {
        navigate("/login-alumno");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al activar perfil");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Activar Perfil</h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {exito && (
          <p className="text-green-600 text-center text-sm">
            Perfil activado. Redirigiendo...
          </p>
        )}

        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre (verificación)"
          className="w-full px-4 py-2 border rounded-md"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="nuevaPassword"
          placeholder="Nueva contraseña"
          className="w-full px-4 py-2 border rounded-md"
          value={form.nuevaPassword}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imagen_url"
          placeholder="URL del nuevo avatar"
          className="w-full px-4 py-2 border rounded-md"
          value={form.imagen_url}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        >
          Activar Perfil
        </button>
      </form>
    </div>
  );
}
