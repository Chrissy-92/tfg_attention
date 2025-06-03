import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub; // lo usaremos en los controladores
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

export default authenticate;
