import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  saveDetalle,
  fetchDetalles,
} from "../controllers/detalles.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", saveDetalle);
router.get("/:id_evaluacion", fetchDetalles);

export default router;
