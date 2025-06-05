import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import ImgPerfil from "../ImgPerfil";
import PopupModal from "../PopupModal";
import CardWhite from "../CardWhite";
import Button from "../Button";

export default function LoginStudent() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/alumnos/login", { nombre, password });
      login({ token: res.data.token, user: res.data.user });
      if (res.data.user.needsActivation) {
        navigate(`/activar-perfil/${res.data.user.id_nino}`);
      } else {
        navigate("/dashboard-student");
      }
    } catch (err) {
      setModal({
        tipo: "error",
        mensaje: err.response?.data?.error || "Error al iniciar sesión",
      });
      setTimeout(() => setModal(null), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <CardWhite>
        <ImgPerfil url="/avatars/user_default.jpg" />
        <h2 className="text-xl font-semibold text-center mb-4">Login Alumno</h2>
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
          <Button type="submit" color="verde" full>
            Entrar
          </Button>
        </form>
        {modal && (
          <PopupModal
            tipo={modal.tipo}
            mensaje={modal.mensaje}
            onClose={() => setModal(null)}
          />
        )}
      </CardWhite>
    </div>
  );
}
