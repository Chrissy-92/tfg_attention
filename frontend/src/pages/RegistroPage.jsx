import { useState } from "react";
import { registrarUsuario } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import Modal from "../components/PopupModal.jsx";
import { useAuth } from "../hooks/useAuth";

export default function RegistroPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    imagen: null,
  });

  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { nombre, email, password } = formData;
      const response = await registrarUsuario({ nombre, email, password });
      console.log("✅ Registro exitoso:", response);
      setModal({ tipo: "exito", mensaje: "Registro exitoso" });
      setTimeout(() => {
        setModal(null);
        login({ token: response.token, user: response.user });
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      const mensajeBackend = error.response?.data?.error?.includes("registrado")
        ? "Error de registro: Usuario ya registrado"
        : "Error en el registro";

      console.error("❌ Error en el registro:", mensajeBackend);
      setModal({ tipo: "error", mensaje: mensajeBackend });
      setTimeout(() => setModal(null), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Registro de Psicólogo
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen de perfil
            </label>
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            Registrarse
          </button>
        </form>
      </div>

      {modal && (
        <Modal
          tipo={modal.tipo}
          mensaje={modal.mensaje}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
