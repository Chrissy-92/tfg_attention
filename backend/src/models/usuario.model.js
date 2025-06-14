import pool from "../config/db.js";

// Registra un nuevo usuario (psicólogo) en la base de datos
export async function createUser({
  nombre,
  email,
  hashedPassword,
  avatar_url,
}) {
  const { rows } = await pool.query(
    `INSERT INTO usuarios (nombre, email, password, avatar_url)
     VALUES ($1, $2, $3, $4)
     RETURNING id_usuario, nombre, email, avatar_url`,
    [nombre, email, hashedPassword, avatar_url]
  );

  return rows[0]; // Devolvemos los datos básicos del nuevo usuario
}

// Busca un usuario por su correo electrónico
export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id_usuario, nombre, email, password, avatar_url
     FROM usuarios
     WHERE email = $1`,
    [email]
  );

  return rows[0]; // Devuelve el usuario si existe, o undefined si no
}
