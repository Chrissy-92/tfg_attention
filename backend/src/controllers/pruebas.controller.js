import { listTiposPrueba } from "../models/prueba.model.js";
import { createEvaluacion } from "../models/evaluacion.model.js";
import { createDetalle } from "../models/detalle.model.js";
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

      for (let i = 0; i < seleccionados.length; i++) {
        const estimulo = seleccionados[i];
        await createDetalle({
          id_evaluacion,
          orden_estimulo: i + 1,
          estimulo: `${estimulo.palabra}_${estimulo.color}`,
          tiempo_reaccion: null,
          respuesta: false,
          correcto: false,
          errores: 0,
          omitido: false,
          neutral: estimulo.neutral,
        });
      }
    }

    res.status(201).json({ id_evaluacion });
  } catch (err) {
    console.error("Error en POST /pruebas/:testType/run:", err);
    res.status(500).json({ error: "Error al iniciar prueba" });
  }
}
