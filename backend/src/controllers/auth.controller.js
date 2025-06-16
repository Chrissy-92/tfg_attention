import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/usuario.model.js";

// Esta función se encarga de registrar un nuevo psicólogo en la plataforma
export async function register(req, res) {
  const { nombre, email, password, avatar_url } = req.body;

  try {
    // Comprobamos si ya hay un usuario con ese correo
    if (await findUserByEmail(email)) {
      return res.status(409).json({ error: "Email ya registrado" });
    }

    // Encriptamos la contraseña antes de guardarla
    const hash = await bcrypt.hash(password, 10);

    // Creamos el usuario con los datos recibidos
    const user = await createUser({
      nombre,
      email,
      hashedPassword: hash,
      avatar_url: avatar_url || "/uploads/user_default.jpg",
    });

    // Generamos un token para que pueda iniciar sesión directamente tras registrarse
    const token = jwt.sign(
      {
        sub: user.id_usuario,
        nombre: user.nombre,
        avatar_url: user.avatar_url,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Devolvemos los datos del usuario y el token
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
}

// Esta función permite a un usuario iniciar sesión con su email y contraseña
export async function login(req, res) {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Buscamos al usuario por su correo
    const user = await findUserByEmail(email);
    console.log("Usuario encontrado:", user);
    console.log("Hash de la contraseña en BD:", user?.password);

    // Si no existe o la contraseña no coincide, mostramos error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generamos el token con los datos básicos del usuario
    const token = jwt.sign(
      {
        sub: user.id_usuario,
        nombre: user.nombre,
        avatar_url: user.avatar_url,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
}
