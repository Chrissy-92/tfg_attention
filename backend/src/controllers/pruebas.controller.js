import { listTiposPrueba } from "../models/prueba.model.js";
import { createEvaluacion } from "../models/evaluacion.model.js";
import { stroopStimuli } from "../data/stroopData.js";

// GET /pruebas
export async function getPruebas(req, res) {
  try {
    const pruebas = await listTiposPrueba();
    res.json(pruebas);
  } catch (err) {
    console.error("Error en GET /pruebas:", err);
    res.status(500).json({ error: "Error al obtener tipos de prueba" });
  }
}

// POST /pruebas/:testType/run
export async function runPrueba(req, res) {
  const { testType } = req.params;
  const { id_nino } = req.body;

  try {
    const { id_evaluacion } = await createEvaluacion({
      id_nino,
      tipo_prueba: testType,
    });

    if (testType === "Stroop") {
      const seleccionados = stroopStimuli
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

      // ⛔ Ya no se guardan filas en detalle aquí

      // ✅ Solo se devuelven los estímulos al frontend
      return res.status(201).json({
        id_evaluacion,
        estimulos: seleccionados.map((e, index) => ({
          orden_estimulo: index + 1,
          estimulo: `${e.palabra}_${e.color}`,
        })),
      });
    }

    // Por si el tipo de prueba no es Stroop
    res.status(400).json({ error: "Tipo de prueba no soportado." });
  } catch (err) {
    console.error("Error en POST /pruebas/:testType/run:", err);
    res.status(500).json({ error: "Error al iniciar prueba" });
  }
}
