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

  const avataresDisponibles = [
    "/alumnoAvatar_h01.png",
    "/alumnoAvatar_h02.png",
    "/alumnoAvatar_h03.png",
    "/alumnoAvatar_h04.png",
    "/alumnoAvatar_h05.png",
    "/alumnoAvatar_h06.png",
    "/alumnaAvatar_f01.png",
    "/alumnaAvatar_f02.png",
    "/alumnaAvatar_f03.png",
    "/alumnaAvatar_f04.png",
  ];

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

        <div>
          <label className="block mb-2 font-medium">Elige tu avatar:</label>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {avataresDisponibles.map((src) => (
              <img
                key={src}
                src={src}
                alt="avatar"
                className={`cursor-pointer rounded-xl border-4 ${
                  form.imagen_url === src
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setForm((prev) => ({ ...prev, imagen_url: src }))
                }
              />
            ))}
          </div>

          {form.imagen_url && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Avatar seleccionado:</p>
              <img
                src={form.imagen_url}
                alt="seleccionado"
                className="w-24 h-24 mx-auto rounded-full border-4 border-blue-600"
              />
            </div>
          )}
        </div>

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
