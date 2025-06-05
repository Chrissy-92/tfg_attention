import { useState } from "react";
import { registrarUsuario } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterFormNino() {
  const [form, setForm] = useState({
    nombre: "",
    password: "",
    imagen_url: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const datosRegistro = {
        ...form,
        rol: "alumno",
      };

      const { user, token } = await registrarUsuario(datosRegistro);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard-alumno");
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar alumno");
    }
  };

  return (
    <form
      className="space-y-4 max-w-md mx-auto p-6 bg-white shadow rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold text-center">
        Activar Perfil de Alumno
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo (como lo registró el psicólogo)"
        className="w-full px-4 py-2 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Elige una contraseña"
        className="w-full px-4 py-2 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="imagen_url"
        placeholder="URL del avatar"
        className="w-full px-4 py-2 border rounded"
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        Activar Perfil
      </button>
    </form>
  );
}
