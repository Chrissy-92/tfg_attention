import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPsychologist } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import PopupModal from "../PopupModal";
import Input from "../Input";
import ImgPerfil from "../ImgPerfil";
import CardWhite from "../CardWhite";
import Button from "../Button";
import Header from "../Header";
import BottomContainer from "../BottomContainer";
import BackButton from "../BackButton";

export default function LoginPsychologist() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [modal, setModal] = useState(null);

  // Actualiza los datos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Intenta hacer login con los datos introducidos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginPsychologist(form);
      login({ token: result.token, user: result.user });
      navigate("/psychologist-dashboard");
    } catch (err) {
      setModal({
        tipo: "error",
        mensaje: "Credenciales inválidas. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <>
      <Header title="EduMind Kids" />
      <BottomContainer className="bg-gradient-to-br from-emerald-300 via-violet-300 to-pink-300">
        <CardWhite>
          <ImgPerfil
            src={user?.avatar_url || "/user_default.jpg"}
            alt="Avatar"
            className="w-24 h-24"
          />
          <h2 className="text-xl font-semibold">Login Psicólogo</h2>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mb-5 mt-8"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
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
        </CardWhite>
      </BottomContainer>

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
