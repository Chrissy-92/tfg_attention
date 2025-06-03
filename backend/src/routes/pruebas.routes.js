import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { getPruebas, runPrueba } from "../controllers/pruebas.controller.js";

const router = Router();

// Autenticación global
router.use(authenticate);

// Listar tipos
router.get("/", getPruebas);

// Iniciar prueba y obtener id_evaluacion
router.post("/:testType/run", runPrueba);

export default router;
