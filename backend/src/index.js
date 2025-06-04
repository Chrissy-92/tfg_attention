import dotenv from "dotenv";
dotenv.config();
console.log("Cargando .env desde:", process.cwd());
console.log("DB_HOST es:", process.env.DB_HOST);

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import ninosRoutes from "./routes/ninos.routes.js";
import pruebasRoutes from "./routes/pruebas.routes.js";
import resultadosRoutes from "./routes/resultados.routes.js";
import detallesRoutes from "./routes/detalles.routes.js";
import integracionRoutes from "./routes/integracion.routes.js";
import alumnosRoutes from "./routes/alumnos.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Verificación de variables de entorno críticas
if (!process.env.JWT_SECRET || !process.env.DB_HOST || !process.env.DB_NAME) {
  console.warn("⚠️  Alguna variable de entorno crítica no está definida.");
}

// Rutas
app.use("/auth", authRoutes);
app.use("/ninos", ninosRoutes);
app.use("/pruebas", pruebasRoutes);
app.use("/resultados", resultadosRoutes);
app.use("/detalles", detallesRoutes);
app.use("/integracion", integracionRoutes);
app.use("/alumnos", alumnosRoutes);

// Manejo de errores globales
process.on("uncaughtException", (err) => {
  console.error("💥 Excepción no capturada:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("💥 Promesa no manejada:", err);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listo en http://localhost:${PORT}`);
});
