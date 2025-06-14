import multer from "multer";
import path from "path";
import fs from "fs";

// Carpeta donde se van a guardar las imágenes subidas
const uploadDir = path.resolve("uploads");

// Si la carpeta no existe, la creamos
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de multer para definir cómo y dónde guardar las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Todas las imágenes se guardan en la carpeta definida arriba
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Se genera un nombre único para cada imagen subida
    const ext = path.extname(file.originalname);
    const uniqueName = `user_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// Exportamos el middleware ya configurado para poder usarlo en las rutas
export const upload = multer({ storage });
