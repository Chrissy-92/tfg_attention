import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWhite from "../CardWhite.jsx";
import ImgPerfil from "../ImgPerfil.jsx";
import Button from "../Button.jsx";
import Header from "../Header.jsx";
import BottomContainer from "../BottomContainer.jsx";
import PopUpModal from "../PopupModal.jsx";

export default function StudentFormAdd({ onSubmit }) {
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
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
            className="space-y-4 flex flex-col items-center"
          >
            <ImgPerfil src={form.avatar_url} alt="Avatar niño" />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            />
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            />
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            >
              <option value="">Selecciona género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={form.edad}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="padre"
              placeholder="Nombre del padre"
              value={form.padre}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="madre"
              placeholder="Nombre de la madre"
              value={form.madre}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="email_tutores"
              placeholder="Email de contacto"
              value={form.email_tutores}
              onChange={handleChange}
              className="w-80 max-w-full px-4 py-2 border rounded-md"
            />
            <div className="flex gap-4 justify-center mt-7">
              <Button color="azul" type="submit">
                Guardar estudiante
              </Button>
              <Button
                color="violeta"
                type="button"
                onClick={() => navigate("/integration")}
              >
                Consultar Informe
              </Button>
            </div>
          </form>
        </CardWhite>
      </BottomContainer>
    </>
  );
}
