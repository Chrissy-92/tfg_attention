import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

// Hook personalizado que evita navegar a rutas inválidas o no registradas
export default function useSafeNavigate() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (to) => {
    const validPaths = [
      "/",
      "/login-psychologist",
      "/login-student",
      "/register",
      "/activate-profile",
      "/students",
      "/students-new",
      "/integration",
      "/psychologist-dashboard",
      "/student-dashboard",
      "/stroop-test",
      "/cancellation",
      "/quick-reaction",
      "/working-memory",
    ];

    // Verifica si la ruta solicitada es válida o empieza por una válida
    const isValid = validPaths.some(
      (path) => to === path || to.startsWith(path + "/")
    );

    if (!isValid) {
      // Si la ruta es inválida, redirige según el tipo de usuario
      if (user?.id_nino) {
        navigate("/student-dashboard");
      } else if (user?.id_usuario) {
        navigate("/psychologist-dashboard");
      } else {
        navigate("/");
      }
    } else {
      navigate(to);
    }
  };
}
