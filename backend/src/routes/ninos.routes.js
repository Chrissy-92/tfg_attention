import { Router } from "express";
import {
  addNino,
  getNinos,
  getNinoById,
} from "../controllers/ninos.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

// Todas las rutas de esta sección requieren estar autenticado
router.use(authenticate);

// Crea un nuevo alumno vinculado al usuario autenticado
router.post("/", addNino);

// Devuelve la lista de alumnos del usuario autenticado
router.get("/", getNinos);

// Devuelve los datos básicos de un alumno según su ID
router.get("/:id", getNinoById);

export default router;
