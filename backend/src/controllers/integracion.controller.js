import {
  createIntegration,
  getIntegrationByNino,
} from "../models/integracion.model.js";

// Guarda un informe general de resultados para un niño concreto
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
    res
      .status(500)
      .json({ error: "Error al guardar integración de resultados" });
  }
}

// Devuelve el informe guardado de un niño, si existe
export async function fetchIntegration(req, res) {
  const { id_nino } = req.params;

  try {
    const integracion = await getIntegrationByNino(id_nino);

    if (!integracion) {
      return res.status(404).json({ error: "No hay informe para ese niño" });
    }

    res.json(integracion);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener integración de resultados" });
  }
}
