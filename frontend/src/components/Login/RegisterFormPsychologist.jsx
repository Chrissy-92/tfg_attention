import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario, loginPsychologist } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import ImgPerfil from "../ImgPerfil";
import PopupModal from "../PopupModal";
import Button from "../Button";

export default function RegisterFormPsychologist() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    imagen: null,
  });
  const [preview, setPreview] = useState(null);
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.imagen) {
        formData.append("imagen", form.imagen);
      }

      const response = await registrarUsuario(formData);
      setModal({ tipo: "exito", mensaje: "Registro exitoso" });

      setTimeout(async () => {
        setModal(null);
        const loginRes = await loginPsychologist({
          email: form.email,
          password: form.password,
        });
        login({ token: loginRes.token, user: loginRes.user });
        navigate("/psychologist-dashboard");
      }, 2500);
    } catch (error) {
      const mensaje = error.response?.data?.error?.includes("registrado")
        ? "Error: Usuario ya registrado"
        : "Error en el registro";
      setModal({ tipo: "error", mensaje });
      setTimeout(() => setModal(null), 2500);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4 w-full">
        <ImgPerfil
          src={preview || "/user_default.jpg"}
          alt="Preview"
          className="w-24 h-24"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 flex flex-col items-center"
        >
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            className="cursor-pointer file:cursor-pointer"
          />
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
          <Button type="submit" color="verde" className="min-w-[160px]">
            Registrarse
          </Button>
        </form>
      </div>

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
