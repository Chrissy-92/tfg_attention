import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario, loginPsychologist } from "../services/api.js";
import PopupModal from "../components/PopupModal.jsx";
import ImgPerfil from "../components/ImgPerfil.jsx";
import CardWhite from "../components/CardWhite.jsx";
import Button from "../components/Button.jsx";

export default function RegisterPsychologistPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    imagen: null,
  });
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { nombre, email, password } = form;
      const response = await registrarUsuario({ nombre, email, password });
      setModal({ tipo: "exito", mensaje: "Registro exitoso" });

      setTimeout(() => {
        setModal(null);
        loginPsychologist({ email, password });
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      const mensajeBackend = error.response?.data?.error?.includes("registrado")
        ? "Error de registro: Usuario ya registrado"
        : "Error en el registro";

      setModal({ tipo: "error", mensaje: mensajeBackend });
      setTimeout(() => setModal(null), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <CardWhite>
        <div className="flex flex-col items-center space-y-4">
          <ImgPerfil src="/user_default.jpg" alt="Preview" />
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
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
                className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 cursor-pointer file:cursor-pointer"
              />
            </div>
            <Button type="submit" color="verde">
              Registrarse
            </Button>
          </form>
        </div>
      </CardWhite>

      {modal && (
        <PopupModal
          tipo={modal.tipo}
          mensaje={modal.mensaje}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
