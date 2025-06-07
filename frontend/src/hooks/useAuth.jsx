/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken } from "../services/api.js";

const AuthContext = createContext();

//AuthProvider: componente que envuelve la App y gestiona el estado de autenticación (token + usuario).
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { token, user } = JSON.parse(stored);
      setAuthToken(token);
      setUser(user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = ({ token, user }) => {
    setAuthToken(token);
    setUser(user);
    localStorage.setItem("auth", JSON.stringify({ token, user }));
  };

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

//useAuth: hook para acceder a AuthContext desde cualquier componente.
export function useAuth() {
  return useContext(AuthContext);
}
