import { listTiposPrueba } from "../models/prueba.model.js";
import { createEvaluacion } from "../models/evaluacion.model.js";

export async function getPruebas(req, res) {
  try {
    const tipos = listTiposPrueba();
    res.json(tipos);
  } catch (err) {
    console.error("Error en GET /pruebas:", err);
    res.status(500).json({ error: "Error al obtener tipos de prueba" });
  }
}

export async function runPrueba(req, res) {
  const { testType } = req.params;
  const { id_nino } = req.body;
  try {
    const { id_evaluacion } = await createEvaluacion({
      id_nino,
      tipo_prueba: testType,
    });
    res.status(201).json({ id_evaluacion });
  } catch (err) {
    console.error("Error en POST /pruebas/:testType/run:", err);
    res.status(500).json({ error: "Error al iniciar prueba" });
  }
}
