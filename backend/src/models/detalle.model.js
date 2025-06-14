import pool from "../config/db.js";

// Inserta un nuevo detalle (respuesta a un estímulo) en la base de datos
export async function createDetalle({
  id_evaluacion,
  orden_estimulo,
  estimulo,
  tiempo_reaccion,
  respuesta,
  correcto,
  errores,
  omitido,
  neutral,
}) {
  const { rows } = await pool.query(
    `INSERT INTO detalles_prueba 
    (id_evaluacion, orden_estimulo, estimulo, tiempo_reaccion, respuesta, correcto, errores, omitido, neutral)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;`,
    [
      id_evaluacion,
      orden_estimulo,
      estimulo,
      tiempo_reaccion,
      respuesta,
      correcto,
      errores,
      omitido,
      neutral,
    ]
  );
  return rows[0]; // devolvemos el detalle recién guardado
}

// Devuelve todos los detalles de una evaluación concreta, ordenados por el orden del estímulo
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
