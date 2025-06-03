// src/components/LoginPsicologo.jsx
import { useState } from "react";
import api, { setAuthToken } from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import userDefault from "/user_default.jpg";

export default function LoginPsicologo() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      setAuthToken(token);
      login({ token, user });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Error en login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <img
          src={userDefault}
          alt="avatar psicólogo"
          className="mx-auto mb-4 w-32 h-32 rounded-xl object-cover"
        />
        <h2 className="text-xl font-semibold text-center mb-4">
          Login Psicólogo
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
