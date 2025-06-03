import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  saveIntegration,
  fetchIntegration,
} from "../controllers/integracion.controller.js";

const router = Router();

router.use(authenticate);

// Guardar o actualizar informe
router.post("/", saveIntegration);

// Recuperar informe de un niño
router.get("/:id_nino", fetchIntegration);

export default router;
