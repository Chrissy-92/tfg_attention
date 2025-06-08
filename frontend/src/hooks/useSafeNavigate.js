import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

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

    const isValid = validPaths.some(
      (path) => to === path || to.startsWith(path + "/")
    );

    if (!isValid) {
      console.warn("Ruta inválida detectada:", to);
      console.log("🔎 Usuario actual:", user);
      console.log("🏁 Redirigiendo al dashboard correspondiente...");

      if (user?.id_nino) {
        navigate("/student-dashboard");
      } else if (user?.id_usuario) {
        navigate("/psychologist-dashboard");
      } else {
        navigate("/"); // Lleva a la página de inicio si no hay usuario logueado
      }
    } else {
      navigate(to);
    }
  };
}
