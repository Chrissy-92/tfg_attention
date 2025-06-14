import {
  createDetalle,
  getDetallesByEvaluacion,
} from "../models/detalle.model.js";

// Guarda un detalle individual de la prueba (cada estímulo que aparece en pantalla)
export async function saveDetalle(req, res) {
  const {
    id_evaluacion,
    orden_estimulo,
    estimulo,
    tiempo_reaccion,
    respuesta,
    correcto,
    errores,
    omitido,
    fallo_neutro,
  } = req.body;

  try {
    // Creamos el detalle con los datos recibidos
    const detalle = await createDetalle({
      id_evaluacion,
      orden_estimulo,
      estimulo,
      tiempo_reaccion,
      respuesta: respuesta ?? false,
      correcto,
      errores,
      omitido: omitido ?? false,
      fallo_neutro: fallo_neutro ?? false,
      neutral: estimulo.toLowerCase().includes("neutro"),
    });

    res.status(201).json(detalle);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar detalle de prueba" });
  }
}

// Recupera todos los detalles registrados de una evaluación concreta
export async function fetchDetalles(req, res) {
  const { id_evaluacion } = req.params;

  try {
    const detalles = await getDetallesByEvaluacion(id_evaluacion);
    res.json(detalles);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener detalles de prueba" });
  }
}
