import { createNino, listNinosByUsuario } from "../models/nino.model.js";

export async function addNino(req, res) {
  const {
    nombre,
    fecha_nacimiento,
    genero,
    edad,
    padre,
    madre,
    telefono,
    email_tutores,
    avatar_url,
  } = req.body;

  try {
    const nino = await createNino({
      nombre,
      fecha_nacimiento,
      genero,
      edad,
      id_usuario: req.userId,
      padre,
      madre,
      telefono,
      email_tutores,
      avatar_url,
    });

    res.status(201).json(nino);
  } catch (err) {
    console.error("Error en POST /ninos:", err);
    res.status(500).json({ error: "Error al crear niño" });
  }
}

export async function getNinos(req, res) {
  try {
    const lista = await listNinosByUsuario(req.userId);
    res.json(lista);
  } catch (err) {
    console.error("Error en GET /ninos:", err);
    res.status(500).json({ error: "Error al listar niños" });
  }
}
