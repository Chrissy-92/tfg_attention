import pool from "../config/db.js";

// Crear un niño bajo un psicólogo
export async function createNino({
  nombre,
  fecha_nacimiento,
  genero,
  edad,
  id_usuario,
  padre,
  madre,
  telefono,
  email_tutores,
  avatar_url,
}) {
  const { rows } = await pool.query(
    `INSERT INTO ninos 
    (nombre, fecha_nacimiento, genero, edad, id_usuario, padre, madre, telefono, email_tutores, avatar_url)
     VALUES 
     ($1,$2,$3,$4,$5, $6, $7, $8, $9, $10)
     RETURNING 
     id_nino, 
     nombre, 
     fecha_nacimiento, 
     genero, 
     edad,
     padre,
     madre,
     telefono,
     email_tutores,
     avatar_url`,
    [
      nombre,
      fecha_nacimiento,
      genero,
      edad,
      id_usuario,
      padre,
      madre,
      telefono,
      email_tutores,
      avatar_url,
    ]
  );
  return rows[0];
}

// Listar todos los niños de un psicólogo
export async function listNinosByUsuario(id_usuario) {
  const { rows } = await pool.query(
    `SELECT 
      id_nino, 
      nombre, 
      fecha_nacimiento, 
      genero, 
      edad, 
      padre,
      madre,
      telefono,
      email_tutores,
      avatar_url
     FROM ninos
     WHERE id_usuario = $1`,
    [id_usuario]
  );
  return rows;
}
