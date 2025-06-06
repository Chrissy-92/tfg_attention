import axios from "axios";

console.log("ENV →", import.meta.env);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// Función para registrar usuario
export async function registrarUsuario({ nombre, email, password }) {
  const response = await api.post("/auth/register", {
    nombre,
    email,
    password,
  });
  return response.data;
}

// Función para loguear psicólogo
export async function loginPsychologist({ email, password }) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
}

// Función para loguear niño
export async function loginAlumno({ nombre, password }) {
  const response = await api.post("/alumnos/login", {
    nombre,
    password,
  });
  return response.data; // { id_nino, nombre, imagen_url }
}

// Función para activar el perfil del alumno
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

// Función para enviar detalles
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
