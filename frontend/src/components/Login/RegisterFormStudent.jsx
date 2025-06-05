import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import CardWhite from "../CardWhite";
import ImgPerfil from "../ImgPerfil";
import ImgSelector from "../Student/ImgSelector";
import PopupModal from "../PopupModal";
import Button from "../Button";

export default function RegisterFormStudent({ idStudent }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    password: "",
    avatar_url: "/user_default.jpg",
  });

  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (url) => {
    setForm((prev) => ({ ...prev, avatar_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/alumnos/activar", {
        id_nino: idStudent,
        ...form,
      });

      setModal({ tipo: "exito", mensaje: "Cuenta activada correctamente" });
      setTimeout(() => {
        setModal(null);
        navigate("/student-dashboard");
      }, 2500);
    } catch (err) {
      console.error(err);
      setModal({
        tipo: "error",
        mensaje:
          err.response?.data?.error || "Error al activar cuenta del alumno",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <CardWhite>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <h2 className="text-xl font-semibold text-center mb-4">
            Activar perfil del alumno
          </h2>

          <div className="flex justify-center">
            <ImgPerfil src={form.avatar_url} size="large" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <ImgSelector value={form.avatar_url} onSelect={handleAvatarSelect} />

          <Button type="submit" color="verde" full>
            Guardar
          </Button>
        </form>
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
