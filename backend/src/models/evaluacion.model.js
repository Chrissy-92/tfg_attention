import pool from "../config/db.js";

// Crea una evaluación nueva para un niño, con puntaje inicial en 0 y sin observaciones
export async function createEvaluacion({ id_nino, tipo_prueba }) {
  const { rows } = await pool.query(
    `INSERT INTO resultados_evaluaciones 
     (id_nino, tipo_prueba, puntaje, observaciones)
     VALUES 
     ($1, $2, 0, '')
     RETURNING id_evaluacion`,
    [id_nino, tipo_prueba]
  );

  return rows[0]; // Devuelve el id generado para la evaluación
}
