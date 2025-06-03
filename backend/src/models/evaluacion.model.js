import pool from "../config/db.js";

// Crea un nuevo registro en resultados_evaluaciones y devuelve el id
export async function createEvaluacion({ id_nino, tipo_prueba }) {
  const { rows } = await pool.query(
    `INSERT INTO resultados_evaluaciones 
    (id_nino, tipo_prueba, puntaje, observaciones)
     VALUES 
     ($1, $2,  0, '')
     RETURNING id_evaluacion`,
    [id_nino, tipo_prueba]
  );
  return rows[0]; // { id_evaluacion: <n> }
}
