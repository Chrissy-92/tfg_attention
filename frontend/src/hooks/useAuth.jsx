import { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken } from "../services/api.js";

const AuthContext = createContext();

// Proveedor global que guarda el usuario logueado y su token
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, buscamos si hay una sesión guardada en localStorage
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { token, user } = JSON.parse(stored);
      setAuthToken(token);
      setUser({ ...user, token });
    }
    setLoading(false);
  }, []);

  // Inicia sesión guardando los datos en estado y localStorage
  const login = ({ token, user }) => {
    const userWithToken = { ...user, token };
    setAuthToken(token);
    setUser(userWithToken);
    localStorage.setItem(
      "auth",
      JSON.stringify({ token, user: userWithToken })
    );
  };

  // Cierra sesión y limpia todo
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acceder al contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}
