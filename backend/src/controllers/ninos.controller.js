import { createNino, listNinosByUsuario } from "../models/nino.model.js";
import bcrypt from "bcryptjs";
import db from "../config/db.js";

// Añade un nuevo alumno a la base de datos con datos recogidos del formulario y una contraseña por defecto
export const addNino = async (req, res) => {
  const {
    nombre,
    fecha_nacimiento,
    genero,
    edad,
    padre,
    madre,
    telefono,
    email_tutores,
    avatar_url,
  } = req.body;

  try {
    const hash = await bcrypt.hash("123456", 10); // usamos esta contraseña temporal por defecto
    const imagenFinal = avatar_url || "/avatars/user_default.jpg"; // imagen por defecto si no se elige ninguna

    // Creamos el nuevo alumno con todos los datos
    const nino = await createNino({
      nombre,
      fecha_nacimiento,
      genero,
      edad,
      padre,
      madre,
      telefono,
      email_tutores,
      imagen_url: imagenFinal,
      password: hash,
      id_usuario: req.userId,
    });

    res.status(201).json(nino);
  } catch (err) {
    res.status(500).json({ error: "Error al crear niño" });
  }
};

// Devuelve todos los alumnos registrados por el psicólogo que está logueado
export const getNinos = async (req, res) => {
  try {
    const lista = await listNinosByUsuario(req.userId);
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: "Error al listar niños" });
  }
};

// Devuelve los datos básicos de un alumno específico según su ID
export const getNinoById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT id_nino, nombre, imagen_url FROM ninos WHERE id_nino = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
