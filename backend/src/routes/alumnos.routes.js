import express from "express";
import {
  loginAlumno,
  activarAlumno,
} from "../controllers/alumnos.controller.js";

const router = express.Router();

// Ruta para que el alumno inicie sesión
router.post("/login", loginAlumno);

// Ruta para activar el perfil del alumno (cambiar contraseña y avatar)
router.post("/activar", activarAlumno);

export default router;
