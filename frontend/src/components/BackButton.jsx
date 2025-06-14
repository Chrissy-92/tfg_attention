import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Botón reutilizable para volver atrás o ir a una ruta concreta
export default function BackButton({ to, className = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to); // Ir a una ruta específica si se indica
    } else {
      navigate(-1); // Si no, simplemente retrocede en el historial
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-3 text-white text-base bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2 ${className}`}
    >
      <FontAwesomeIcon icon={faCircleArrowLeft} />
      Volver Atrás
    </button>
  );
}
