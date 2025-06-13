import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton({ to, className = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
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
