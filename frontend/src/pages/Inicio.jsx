import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BottomContainer from "../components/BottomContainer";

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <BottomContainer>
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center space-y-6 w-full max-w-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Selecciona tu perfil
          </h2>
          <div className="flex flex-col gap-4 w-full">
            <Button color="verde" onClick={() => navigate("/login-student")}>
              Alumno
            </Button>
            <Button
              color="verde"
              onClick={() => navigate("/login-psychologist")}
            >
              Psicólogo
            </Button>
            <Button color="azul" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
          </div>
        </div>
      </BottomContainer>
    </div>
  );
}
