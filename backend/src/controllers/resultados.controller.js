import {
  updateResultado,
  getResultadosByNino,
} from "../models/resultado.model.js";

export async function saveResultado(req, res) {
  const { id_evaluacion, id_nino, puntaje, observaciones } = req.body;
  try {
    const resultado = await updateResultado({
      id_evaluacion,
      id_nino,
      puntaje,
      observaciones,
    });
    res.status(201).json(resultado);
  } catch (err) {
    console.error("Error en POST /resultados:", err);
    res.status(500).json({ error: "Error al guardar resultado" });
  }
}

export async function fetchResultados(req, res) {
  const { id_nino } = req.params;
  try {
    const resultados = await getResultadosByNino(id_nino);
    res.json(resultados);
  } catch (err) {
    console.error("Error en GET /resultados/:id_nino:", err);
    res.status(500).json({ error: "Error al obtener resultados" });
  }
}
