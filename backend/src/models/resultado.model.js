import pool from "../config/db.js";

// Actualiza el resultado general de una evaluación concreta: puntaje y observaciones
export async function updateResultado({
  id_evaluacion,
  id_nino,
  puntaje,
  observaciones,
}) {
  const { rows } = await pool.query(
    `UPDATE resultados_evaluaciones
     SET puntaje = $3,
         observaciones = $4
     WHERE id_evaluacion = $1
       AND id_nino = $2
     RETURNING id_evaluacion, id_nino, tipo_prueba, fecha, puntaje, observaciones;`,
    [id_evaluacion, id_nino, puntaje, observaciones]
  );

  return rows[0]; // Devuelve la fila actualizada
}

// Devuelve todos los resultados de evaluación registrados para un niño
export async function getResultadosByNino(id_nino) {
  const { rows } = await pool.query(
    `SELECT id_evaluacion, tipo_prueba, fecha, puntaje, observaciones
     FROM resultados_evaluaciones
     WHERE id_nino = $1
     ORDER BY fecha;`,
    [id_nino]
  );

  return rows;
}
