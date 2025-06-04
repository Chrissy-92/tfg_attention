import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/usuario.model.js";

export async function register(req, res) {
  const { nombre, email, password, rol, avatar_url } = req.body;

  try {
    if (await findUserByEmail(email)) {
      return res.status(409).json({ error: "Email ya registrado" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({
      nombre,
      email,
      password: hash,
      rol,
      avatar_url,
    });

    const token = jwt.sign(
      {
        sub: user.id_usuario,
        nombre: user.nombre,
        rol: user.rol,
        avatar_url: user.avatar_url,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Error en /auth/register:", err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        sub: user.id_usuario,
        nombre: user.nombre,
        rol: user.rol,
        avatar_url: user.avatar_url,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Error en /auth/login:", err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
}
