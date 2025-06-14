import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BottomContainer from "../components/BottomContainer";
import Header from "../components/Header";

// Página de inicio donde se elige el tipo de usuario
export default function Inicio() {
  const navigate = useNavigate();

  return (
    <>
      <Header title="EduMind Kids" />
      <div className="min-h-screen">
        <BottomContainer className="bg-gradient-to-br from-emerald-300 via-violet-300 to-pink-300">
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center space-y-10 w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-gray-800">
              Selecciona tu perfil
            </h2>

            {/* Botones para acceder como alumno, psicólogo o registrarse */}
            <div className="flex flex-col gap-4 w-full text-lg">
              <Button
                color="verde"
                className="h-12"
                onClick={() => navigate("/login-student")}
              >
                Alumno
              </Button>
              <Button
                color="verde"
                className="h-12"
                onClick={() => navigate("/login-psychologist")}
              >
                Psicólogo
              </Button>
              <Button
                color="azul"
                className="h-12"
                onClick={() => navigate("/register")}
              >
                Registrarse como Psicólogo
              </Button>
            </div>
          </div>
        </BottomContainer>
      </div>
    </>
  );
}
