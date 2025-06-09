import pool from "../config/db.js";

export async function createDetalle({
  id_evaluacion,
  orden_estimulo,
  estimulo,
  tiempo_reaccion,
  respuesta,
  correcto,
  errores,
  omitido,
}) {
  const { rows } = await pool.query(
    `INSERT INTO detalles_prueba
      (id_evaluacion, orden_estimulo, estimulo, tiempo_reaccion, respuesta, correcto, errores, omitido)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *;`,
    [
      id_evaluacion,
      orden_estimulo,
      estimulo,
      tiempo_reaccion,
      respuesta ?? false,
      correcto,
      errores,
      omitido ?? false,
    ]
  );
  return rows[0];
}

export async function getDetallesByEvaluacion(id_evaluacion) {
  const { rows } = await pool.query(
    `SELECT id_detalle, orden_estimulo, estimulo, tiempo_reaccion, respuesta, correcto, errores, omitido
       FROM detalles_prueba
      WHERE id_evaluacion = $1
      ORDER BY orden_estimulo;`,
    [id_evaluacion]
  );
  return rows;
}
