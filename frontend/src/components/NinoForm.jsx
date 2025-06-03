import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function NinoForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    fecha_nacimiento: "",
    edad: "",
    genero: "",
    padre: "",
    madre: "",
    telefono: "",
    email_tutores: "",
    avatar_url: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    // Si cambia fecha_nacimiento, calculamos edad:
    if (name === "fecha_nacimiento") {
      const birth = new Date(value);
      const today = new Date();
      let years = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        years--;
      }
      updated.edad = years >= 0 ? years : "";
    }

    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/ninos", form);
      const newId = res.data.id_nino;
      navigate(`/integracion/${newId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear niño");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Volver
        </button>
        <h2 className="text-xl font-semibold">Perfil del Niño</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Avatar URL</label>
          <input
            name="avatar_url"
            value={form.avatar_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border px-2 py-1"
          />
        </div>

        <div>
          <label className="block">Nombre Completo</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Fecha de Nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block">Edad</label>
            <input
              type="number"
              name="edad"
              value={form.edad}
              onChange={handleChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block">Género</label>
          <select
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          >
            <option value="">Selecciona</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block">Nombre del Padre</label>
          <input
            name="padre"
            value={form.padre}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />
        </div>

        <div>
          <label className="block">Nombre de la Madre</label>
          <input
            name="madre"
            value={form.madre}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />
        </div>

        <div>
          <label className="block">Teléfono de Contacto</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />
        </div>

        <div>
          <label className="block">Email de Tutor(es)</label>
          <input
            name="email_tutores"
            type="email"
            value={form.email_tutores}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Guardar Niño
          </button>
          <button
            type="button"
            onClick={() => navigate(`/integracion/${form.id_nino || ""}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Consultar Informe
          </button>
        </div>
      </form>
    </div>
  );
}
