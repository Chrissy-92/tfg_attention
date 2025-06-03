import { Router } from "express";
import { addNino, getNinos } from "../controllers/ninos.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate); // todas las rutas requieren JWT

router.post("/", addNino);
router.get("/", getNinos);

export default router;
