import jwt from "jsonwebtoken";

// Middleware que comprueba si el usuario está autenticado antes de permitir el acceso
function authenticate(req, res, next) {
  const auth = req.headers.authorization;

  // Si no hay token o no empieza por 'Bearer', bloqueamos el acceso
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = auth.split(" ")[1];

  try {
    // Verificamos el token con la clave secreta
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos el ID del usuario autenticado para usarlo en los controladores
    req.userId = payload.sub;

    next(); // dejamos continuar a la siguiente función
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

export default authenticate;
