import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

export default function Header({ title, buttonLabel = "Home", customAction }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (customAction) return customAction();
    if (!user) return navigate("/");
    if (user.rol === "alumno") return navigate("/dashboard-alumno");
    return navigate("/");
  };

  return (
    <header className="w-full bg-indigo-400 text-white border-b border-indigo-500">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        </div>

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
