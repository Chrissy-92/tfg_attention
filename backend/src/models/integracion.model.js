import pool from "../config/db.js";

// Inserta o actualiza un informe de integración de resultados para un niño
export async function createIntegration({
  id_nino,
  resumen,
  percentil_global,
}) {
  const q = `
    INSERT INTO integracion_resultados (id_nino, resumen, percentil_global)
    VALUES ($1, $2, $3)
    ON CONFLICT (id_nino) DO UPDATE
      SET resumen         = EXCLUDED.resumen,
          percentil_global = EXCLUDED.percentil_global
    RETURNING *;
  `;
  const { rows } = await pool.query(q, [id_nino, resumen, percentil_global]);
  return rows[0];
}

// Recupera el informe de integración de un niño
export async function getIntegrationByNino(id_nino) {
  const { rows } = await pool.query(
    `SELECT id_integracion, id_nino, resumen, percentil_global
     FROM integracion_resultados
     WHERE id_nino = $1;`,
    [id_nino]
  );
  return rows[0];
}
