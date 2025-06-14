import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  saveResultado,
  fetchResultados,
} from "../controllers/resultados.controller.js";

const router = Router();

// Todas las rutas de resultados requieren autenticación
router.use(authenticate);

// Guarda o actualiza el resultado general de una evaluación
router.post("/", saveResultado);

// Devuelve todos los resultados de un niño concreto
router.get("/:id_nino", fetchResultados);

export default router;
