import bcrypt from "bcryptjs";
import db from "../config/db.js";

export async function loginAlumno(req, res) {
  const { nombre, password } = req.body;

  try {
    const result = await db.query(
      "SELECT id_nino, nombre, password, imagen_url FROM ninos WHERE nombre = $1",
      [nombre]
    );

    const nino = result.rows[0];
    if (!nino) {
      return res.status(404).json({ error: "Niño no encontrado" });
    }

    const valid = await bcrypt.compare(password, nino.password);
    if (!valid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const esTemporal = await bcrypt.compare("123456", nino.password);

    res.json({
      id_nino: nino.id_nino,
      nombre: nino.nombre,
      avatar_url: nino.imagen_url,
      needsActivation: esTemporal,
    });
  } catch (err) {
    console.error("Error en loginAlumno:", err);
    res.status(500).json({ error: "Error en login" });
  }
}

export async function activarAlumno(req, res) {
  const { id_nino, nombre, nuevaPassword, imagen_url } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM ninos WHERE id_nino = $1 AND nombre = $2",
      [id_nino, nombre]
    );

    const nino = result.rows[0];
    if (!nino) {
      return res
        .status(404)
        .json({ error: "Alumno no encontrado o nombre incorrecto" });
    }

    const nuevoHash = await bcrypt.hash(nuevaPassword, 10);

    await db.query(
      "UPDATE ninos SET password = $1, imagen_url = $2 WHERE id_nino = $3",
      [nuevoHash, imagen_url, id_nino]
    );

    res.json({ message: "Perfil activado correctamente" });
  } catch (err) {
    console.error("Error en activarAlumno:", err);
    res.status(500).json({ error: "Error al activar perfil" });
  }
}
