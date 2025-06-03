import pool from "../config/db.js";

// Inserta un nuevo usuario y devuelve su id, nombre y email
export async function createUser({ nombre, email, password, imagen_url }) {
  const { rows } = await pool.query(
    `INSERT INTO usuarios (nombre, email, password, imagen_url)
     VALUES ($1, $2, $3, $4)
     RETURNING id_usuario, nombre, email, imagen_url`,
    [nombre, email, password, imagen_url]
  );
  return rows[0];
}

// Busca un usuario por email
export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id_usuario, nombre, email, password, imagen_url
     FROM usuarios
     WHERE email = $1`,
    [email]
  );
  return rows[0];
}
