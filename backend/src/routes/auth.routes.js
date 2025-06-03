// src/routes/auth.routes.js
import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

// Ruta con subida de imagen
router.post("/register", upload.single("imagen"), register);
router.post("/login", login);

export default router;
