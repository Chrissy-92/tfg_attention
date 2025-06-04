import express from "express";
import {
  loginAlumno,
  activarAlumno,
} from "../controllers/alumnos.controller.js";

const router = express.Router();

router.post("/login", loginAlumno);
router.post("/activar", activarAlumno);

export default router;
