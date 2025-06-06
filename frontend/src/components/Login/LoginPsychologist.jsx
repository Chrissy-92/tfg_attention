import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPsychologist } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import PopupModal from "../PopupModal";
import ImgPerfil from "../ImgPerfil";
import CardWhite from "../CardWhite";
import Button from "../Button";
import Header from "../Header";
import BottomContainer from "../BottomContainer";

export default function LoginPsychologist() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginPsychologist(form);
      console.log("✅ Login correcto:", result);
      login({ token: result.token, user: result.user });
      navigate("/psychologist-dashboard");
    } catch (err) {
      console.error("❌ Error en login:", err);
      setModal({
        tipo: "error",
        mensaje: "Credenciales inválidas. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <>
      <Header title="TFG_Attention" />
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
            className="w-full space-y-4 flex flex-col items-center"
          >
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
            <Button type="submit" color="verde">
              Entrar
            </Button>
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
