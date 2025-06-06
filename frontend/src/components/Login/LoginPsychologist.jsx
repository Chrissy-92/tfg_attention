import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPsychologist } from "../../services/api";
import PopupModal from "../PopupModal";
import ImgPerfil from "../ImgPerfil";
import CardWhite from "../CardWhite";
import Button from "../Button";

export default function LoginPsychologist() {
  const navigate = useNavigate();
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
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
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
      <CardWhite>
        <div className="flex flex-col items-center space-y-4">
          <ImgPerfil src="/logo.png" alt="Logo" className="w-24 h-24" />
          <h2 className="text-xl font-semibold">Login Psicólogo</h2>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
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
        </div>
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
