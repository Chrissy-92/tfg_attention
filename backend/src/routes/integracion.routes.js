import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  saveIntegration,
  fetchIntegration,
} from "../controllers/integracion.controller.js";

const router = Router();

// Todas las rutas de integración requieren autenticación
router.use(authenticate);

// Guarda o actualiza el informe global de un niño
router.post("/", saveIntegration);

// Recupera el informe global de un niño concreto
router.get("/:id_nino", fetchIntegration);

export default router;
