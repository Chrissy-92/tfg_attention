import { listTiposPrueba } from "../models/prueba.model.js";
import { createEvaluacion } from "../models/evaluacion.model.js";
import { stroopStimuli } from "../data/stroopData.js";

// Devuelve el listado de tipos de prueba disponibles (por ahora solo Stroop)
export async function getPruebas(req, res) {
  try {
    const pruebas = await listTiposPrueba();
    res.json(pruebas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tipos de prueba" });
  }
}

// Inicia una evaluación del tipo solicitado. Por ahora, solo soporta la prueba Stroop
export async function runPrueba(req, res) {
  const { testType } = req.params;
  const { id_nino } = req.body;

  try {
    // Se crea un nuevo registro en la tabla de evaluaciones
    const { id_evaluacion } = await createEvaluacion({
      id_nino,
      tipo_prueba: testType,
    });

    // Solo funciona para la prueba Stroop por ahora
    if (testType === "Stroop") {
      // Se eligen 15 estímulos aleatorios del conjunto disponible
      const seleccionados = stroopStimuli
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

      // Devolvemos los estímulos al frontend, no se guardan aún en la base de datos
      return res.status(201).json({
        id_evaluacion,
        estimulos: seleccionados.map((e, index) => ({
          orden_estimulo: index + 1,
          estimulo: `${e.palabra}_${e.color}`,
        })),
      });
    }

    // Si se solicita un tipo de prueba no reconocido
    res.status(400).json({ error: "Tipo de prueba no soportado." });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar prueba" });
  }
}
