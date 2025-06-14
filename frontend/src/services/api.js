import axios from "axios";

// Instancia de axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
});

// Establece o elimina el token de autenticación
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// Registra a un nuevo psicólogo
export async function registrarUsuario({
  nombre,
  email,
  password,
  avatar_url,
}) {
  const response = await api.post("/auth/register", {
    nombre,
    email,
    password,
    avatar_url: "/uploads/user_default.jpg", // valor fijo por ahora
  });

  return response.data;
}

// Inicia sesión como psicólogo
export async function loginPsychologist({ email, password }) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
}

// Inicia sesión como alumno
export async function loginAlumno({ nombre, password }) {
  const response = await api.post("/alumnos/login", {
    nombre,
    password,
  });
  return response.data; // devuelve { id_nino, nombre, imagen_url, ... }
}

// Activa el perfil de un alumno
export async function activarAlumno({
  id_nino,
  nombre,
  nuevaPassword,
  imagen_url,
}) {
  const response = await api.post("/alumnos/activar", {
    id_nino,
    nombre,
    nuevaPassword,
    imagen_url,
  });
  return response.data;
}

// Envía los detalles de las pruebas al backend
export async function enviarDetalles(detalles, id_evaluacion) {
  for (const detalle of detalles) {
    await api.post("/detalles", {
      id_evaluacion,
      orden_estimulo: detalle.orden_estimulo,
      estimulo: detalle.estimulo,
      tiempo_reaccion: detalle.tiempo_reaccion,
      respuesta: true,
      correcto: detalle.correcto,
      errores: detalle.errores,
    });
  }
}

export default api;
