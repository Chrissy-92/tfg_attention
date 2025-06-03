import {
  createIntegration,
  getIntegrationByNino,
} from "../models/integracion.model.js";

export async function saveIntegration(req, res) {
  const { id_nino, resumen, percentil_global } = req.body;
  try {
    const integracion = await createIntegration({
      id_nino,
      resumen,
      percentil_global,
    });
    res.status(201).json(integracion);
  } catch (err) {
    console.error("Error en POST /integracion:", err);
    res
      .status(500)
      .json({ error: "Error al guardar integración de resultados" });
  }
}

export async function fetchIntegration(req, res) {
  const { id_nino } = req.params;
  try {
    const integracion = await getIntegrationByNino(id_nino);
    if (!integracion) {
      return res.status(404).json({ error: "No hay informe para ese niño" });
    }
    res.json(integracion);
  } catch (err) {
    console.error("Error en GET /integracion/:id_nino:", err);
    res
      .status(500)
      .json({ error: "Error al obtener integración de resultados" });
  }
}
