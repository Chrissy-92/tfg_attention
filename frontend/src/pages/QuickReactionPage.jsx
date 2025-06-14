import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";
import { useNavigate } from "react-router-dom";

// Página base para la prueba de reacción rápida
export default function QuickReactionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-200">
      <Header
        title="Prueba de Reacción Rápida"
        buttonLabel="Home"
        onButtonClick={() => navigate("/student-dashboard")}
      />

      <BottomContainer>
        <div className="bg-white p-6 rounded-2xl shadow w-full max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-4">
            Aquí irá la lógica de la prueba
          </h2>
          <p className="text-gray-600">
            Espacio reservado para el desarrollo futuro.
          </p>
        </div>
      </BottomContainer>
    </div>
  );
}
