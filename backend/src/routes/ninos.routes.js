import { Router } from "express";
import {
  addNino,
  getNinos,
  getNinoById,
} from "../controllers/ninos.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate); // todas las rutas requieren JWT

router.post("/", addNino);
router.get("/", getNinos);
router.get("/:id", getNinoById);

export default router;
