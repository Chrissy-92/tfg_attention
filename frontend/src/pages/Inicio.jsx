import { useNavigate } from "react-router-dom";
import CardWhite from "../components/CardWhite";
import Button from "../components/Button";

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-violet-300/50 flex items-center justify-center px-4">
      <CardWhite>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Selecciona tu perfil
        </h2>

        <div className="space-y-4">
          <Button color="verde" onClick={() => navigate("/login-alumno")}>
            Alumno
          </Button>
          <Button color="verde" onClick={() => navigate("/login-psicologo")}>
            Psicólogo
          </Button>
          <Button color="azul" onClick={() => navigate("/registro")}>
            Registrarse
          </Button>
        </div>
      </CardWhite>
    </div>
  );
}
