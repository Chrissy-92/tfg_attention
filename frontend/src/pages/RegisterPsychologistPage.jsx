import { useState } from "react";
import { registrarUsuario } from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import PopupModal from "../PopupModal.jsx";
import CardWhite from "../CardWhite.jsx";
import Header from "../Header.jsx";
import ImgPerfil from "../ImgPerfil.jsx";

export default function RegisterPsychologistPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    imagen: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { nombre, email, password } = formData;
      const response = await registrarUsuario({ nombre, email, password });
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
      setModal({ tipo: "error", mensaje: mensajeBackend });
      setTimeout(() => setModal(null), 2500);
    }
  };

  return (
    <>
      <Header
        title="Registro Psicólogo"
        buttonLabel="Home"
        onButtonClick={() => navigate("/dashboard")}
      />

      <CardWhite>
        <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <ImgPerfil src={previewUrl} />
          </div>

          <div className="flex justify-center">
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Subir imagen
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

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

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            Registrarse
          </button>
        </form>
      </CardWhite>

      {modal && (
        <PopupModal
          tipo={modal.tipo}
          mensaje={modal.mensaje}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
