import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

// Ruta para registrar un nuevo psicólogo con imagen de perfil
router.post("/register", upload.single("imagen"), register);

// Ruta para iniciar sesión
router.post("/login", login);

export default router;
