import {
  createDetalle,
  getDetallesByEvaluacion,
} from "../models/detalle.model.js";

export async function saveDetalle(req, res) {
  const {
    id_evaluacion,
    orden_estimulo,
    estimulo,
    tiempo_reaccion,
    respuesta,
    correcto,
    errores,
  } = req.body;

  try {
    const detalle = await createDetalle({
      id_evaluacion,
      orden_estimulo,
      estimulo,
      tiempo_reaccion,
      respuesta,
      correcto,
      errores,
    });

    res.status(201).json(detalle);
  } catch (err) {
    console.error("Error en POST /detalles:", err);
    res.status(500).json({ error: "Error al guardar detalle de prueba" });
  }
}

export async function fetchDetalles(req, res) {
  const { id_evaluacion } = req.params;

  try {
    const detalles = await getDetallesByEvaluacion(id_evaluacion);
    res.json(detalles);
  } catch (err) {
    console.error("Error en GET /detalles/:id_evaluacion:", err);
    res.status(500).json({ error: "Error al obtener detalles de prueba" });
  }
}
