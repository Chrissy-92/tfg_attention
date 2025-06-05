import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWhite from "../CardWhite.jsx";
import ImgPerfil from "../ImgPerfil.jsx";
import Button from "../Button.jsx";
import Header from "../Header.jsx";

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
    avatar_url: "/avatars/user_default.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        title="Añadir nuevo estudiante"
        buttonLabel="Home"
        onButtonClick={() => navigate("/dashboard")}
      />

      <div className="flex items-center justify-center">
        <CardWhite>
          <form onSubmit={handleSubmit} className="space-y-4">
            <ImgPerfil src={form.avatar_url} alt="Avatar niño" />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="genero"
              placeholder="Género"
              value={form.genero}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={form.edad}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="padre"
              placeholder="Nombre del padre"
              value={form.padre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="madre"
              placeholder="Nombre de la madre"
              value={form.madre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="email_tutores"
              placeholder="Email de contacto"
              value={form.email_tutores}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <Button color="azul" type="submit">
              Guardar estudiante
            </Button>
          </form>
        </CardWhite>
      </div>
    </div>
  );
}
