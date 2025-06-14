import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { getPruebas, runPrueba } from "../controllers/pruebas.controller.js";

const router = Router();

// Todas las rutas de pruebas requieren autenticación
router.use(authenticate);

// Devuelve la lista de tipos de prueba disponibles
router.get("/", getPruebas);

// Inicia una evaluación del tipo indicado y devuelve su id junto con los estímulos (si aplica)
router.post("/:testType/run", runPrueba);

export default router;
