import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  saveDetalle,
  fetchDetalles,
} from "../controllers/detalles.controller.js";

const router = Router();

// Aplicamos autenticación a todas las rutas de esta sección
router.use(authenticate);

// Guarda un detalle de un estímulo en una evaluación
router.post("/", saveDetalle);

// Obtiene todos los detalles de una evaluación concreta
router.get("/:id_evaluacion", fetchDetalles);

export default router;
