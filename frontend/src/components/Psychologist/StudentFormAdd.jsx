import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWhite from "../CardWhite.jsx";
import ImgPerfil from "../ImgPerfil.jsx";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import Header from "../Header.jsx";
import BottomContainer from "../BottomContainer.jsx";
import PopupModal from "../PopupModal.jsx";

export default function StudentFormAdd({ onSubmit }) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    fecha_nacimiento: "",
    genero: "",
    edad: "",
    padre: "",
    madre: "",
    telefono: "",
    email_tutores: "",
    avatar_url: "/user_default.jpg",
  });

  // Maneja los cambios del formulario, incluyendo el cálculo automático de edad
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "fecha_nacimiento") {
        const hoy = new Date();
        const nacimiento = new Date(value);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
          edad--;
        }
        updated.edad = edad;
      }

      return updated;
    });
  };

  // Envía los datos del alumno al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit?.(form);
      setModal({ tipo: "exito", mensaje: "Estudiante registrado con éxito" });
      setTimeout(() => {
        setModal(null);
        navigate("/psychologist-dashboard");
      }, 2500);
    } catch (err) {
      setModal({
        tipo: "error",
        mensaje: "Error al registrar el estudiante",
      });
      setTimeout(() => setModal(null), 3000);
    }
  };

  return (
    <>
      <Header
        title="Añadir nuevo estudiante"
        buttonLabel="Home"
        onButtonClick={() => navigate("/psychologist-dashboard")}
      />

      <BottomContainer className="bg-gradient-to-br from-emerald-300 via-violet-300 to-pink-300">
        <CardWhite>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4 flex flex-col items-center"
          >
            <ImgPerfil src={form.avatar_url} alt="Avatar niño" />

            <Input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
            />
            <Input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
            />
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="w-full max-w-full px-4 py-3 border rounded-md"
            >
              <option value="">Selecciona género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <Input
              type="number"
              name="edad"
              placeholder="Edad"
              value={form.edad}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="padre"
              placeholder="Nombre del padre"
              value={form.padre}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="madre"
              placeholder="Nombre de la madre"
              value={form.madre}
              onChange={handleChange}
            />
            <Input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email_tutores"
              placeholder="Email de contacto"
              value={form.email_tutores}
              onChange={handleChange}
            />

            <div className="flex gap-4 justify-center mt-7">
              <Button color="azul" type="submit">
                Guardar estudiante
              </Button>
            </div>
          </form>
        </CardWhite>

        {modal && (
          <PopupModal
            tipo={modal.tipo}
            mensaje={modal.mensaje}
            onClose={() => setModal(null)}
            posicionClass="bottom-4 right-4"
          />
        )}
      </BottomContainer>
    </>
  );
}
