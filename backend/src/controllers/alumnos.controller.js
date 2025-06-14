import bcrypt from "bcryptjs";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

// Función para iniciar sesión del alumno usando nombre y contraseña
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

    // Comprobamos que la contraseña introducida sea válida
    const valid = await bcrypt.compare(password, nino.password);
    if (!valid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Aquí vemos si todavía tiene la contraseña por defecto
    const esTemporal = await bcrypt.compare("123456", nino.password);

    // Generamos el token de acceso para el alumno
    const token = jwt.sign(
      { id_nino: nino.id_nino, nombre: nino.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Devolvemos los datos necesarios al frontend
    res.json({
      token,
      id_nino: nino.id_nino,
      nombre: nino.nombre,
      avatar_url: nino.imagen_url,
      needsActivation: esTemporal,
    });
  } catch (err) {
    res.status(500).json({ error: "Error en login" });
  }
}

// Función que permite activar el perfil del alumno cambiando su contraseña y avatar
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

    // Encriptamos la nueva contraseña antes de guardarla
    const nuevoHash = await bcrypt.hash(nuevaPassword, 10);

    // Actualizamos los datos del perfil en la base de datos
    await db.query(
      "UPDATE ninos SET password = $1, imagen_url = $2 WHERE id_nino = $3",
      [nuevoHash, imagen_url, id_nino]
    );

    res.json({ message: "Perfil activado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al activar perfil" });
  }
}
