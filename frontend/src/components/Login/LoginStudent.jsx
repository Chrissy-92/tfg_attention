import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import ImgPerfil from "../ImgPerfil";
import PopupModal from "../PopupModal";
import Input from "../Input";
import CardWhite from "../CardWhite";
import Button from "../Button";
import Header from "../Header";
import BottomContainer from "../BottomContainer";
import BackButton from "../BackButton";

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
      const { token, ...user } = res.data;
      login({ token, user: { ...user, token } });
      if (res.data.needsActivation) {
        navigate(`/activate-profile/${res.data.id_nino}`);
      } else {
        navigate("/student-dashboard");
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
    <>
      <Header title="TFG_Attention" />
      <BottomContainer className="bg-gradient-to-br from-emerald-300 via-violet-300 to-pink-300">
        <CardWhite>
          <ImgPerfil />
          <h2 className="text-xl font-semibold text-center mb-4">
            Login Alumno
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <Input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-5 mt-5"
              required
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-5"
              required
            />
            <Button
              type="submit"
              color="verde"
              className="min-w-[180px] text-lg"
            >
              Entrar
            </Button>
            <BackButton className="mt-6" />
          </form>

          {modal && (
            <PopupModal
              tipo={modal.tipo}
              mensaje={modal.mensaje}
              onClose={() => setModal(null)}
            />
          )}
        </CardWhite>
      </BottomContainer>
    </>
  );
}
