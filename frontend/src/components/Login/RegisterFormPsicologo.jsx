import { useState } from "react";
import { registrarUsuario } from "../../services/api";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registrarUsuario(form);
      console.log("Usuario registrado:", result);
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        className="w-full px-4 py-2 border rounded-md"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 border rounded-md"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 border rounded-md"
        onChange={handleChange}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen de perfil
        </label>
        <input
          type="file"
          name="imagen"
          accept="image/*"
          className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
      >
        Registrarse
      </button>
    </form>
  );
}
