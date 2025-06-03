import pool from "../config/db.js";

// Inserta un nuevo detalle de estímulo
export async function createDetalle({
  id_evaluacion,
  orden_estimulo,
  estimulo,
  tiempo_reaccion,
  respuesta,
  correcto,
  errores,
}) {
  const { rows } = await pool.query(
    `INSERT INTO detalles_prueba
      (id_evaluacion, orden_estimulo, estimulo, tiempo_reaccion, respuesta, correcto, errores)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *;`,
    [
      id_evaluacion,
      orden_estimulo,
      estimulo,
      tiempo_reaccion,
      respuesta,
      correcto,
      errores,
    ]
  );
  return rows[0];
}

// Recupera todos los detalles para una evaluación dada
export async function getDetallesByEvaluacion(id_evaluacion) {
  const { rows } = await pool.query(
    `SELECT id_detalle, orden_estimulo, estimulo, tiempo_reaccion, respuesta, correcto, errores
       FROM detalles_prueba
      WHERE id_evaluacion = $1
      ORDER BY orden_estimulo;`,
    [id_evaluacion]
  );
  return rows;
}
