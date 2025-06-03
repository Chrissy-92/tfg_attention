import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  saveResultado,
  fetchResultados,
} from "../controllers/resultados.controller.js";

const router = Router();

router.use(authenticate);

// Guardar (o actualizar) el resultado agregado
router.post("/", saveResultado);

// Listar todos los resultados de un niño
router.get("/:id_nino", fetchResultados);

export default router;
