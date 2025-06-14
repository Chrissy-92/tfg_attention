import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

// Cabecera principal que muestra el título y opcionalmente un botón lateral
export default function Header({ title, buttonLabel, onButtonClick }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (onButtonClick) return onButtonClick();
  };

  return (
    <header className="w-full bg-indigo-400 text-white border-b border-indigo-500 px-8">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo y título */}
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src="/EduMind-kids-logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        </div>

        {/* Botón opcional a la derecha */}
        {buttonLabel ? (
          <Button color="azul" onClick={handleClick}>
            {buttonLabel}
          </Button>
        ) : (
          <div className="w-24" />
        )}
      </div>
    </header>
  );
}
