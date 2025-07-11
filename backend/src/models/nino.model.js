import pool from "../config/db.js";

// Crea un nuevo registro de alumno con los datos proporcionados
export async function createNino({
  nombre,
  fecha_nacimiento,
  genero,
  edad,
  padre,
  madre,
  telefono,
  email_tutores,
  imagen_url,
  password,
  id_usuario,
}) {
  const { rows } = await pool.query(
    `INSERT INTO ninos 
     (nombre, fecha_nacimiento, genero, edad, padre, madre, telefono, email_tutores, imagen_url, password, id_usuario)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING id_nino, nombre, edad, imagen_url`,
    [
      nombre,
      fecha_nacimiento,
      genero,
      edad,
      padre,
      madre,
      telefono,
      email_tutores,
      imagen_url,
      password,
      id_usuario,
    ]
  );

  // Solo devolvemos los campos básicos para confirmar el alta
  return rows[0];
}

// Devuelve la lista de alumnos registrados por un psicólogo concreto
export async function listNinosByUsuario(id_usuario) {
  const { rows } = await pool.query(
    `SELECT id_nino, nombre, edad, genero, imagen_url, 
            padre, madre, telefono, email_tutores
     FROM ninos
     WHERE id_usuario = $1
     ORDER BY nombre`,
    [id_usuario]
  );

  return rows;
}
