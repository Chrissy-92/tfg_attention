import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";
import { useNavigate } from "react-router-dom";

// Página base para la prueba de memoria de trabajo
export default function WorkingMemoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pink-200">
      <Header
        title="Prueba de Memoria de Trabajo"
        buttonLabel="Home"
        onButtonClick={() => navigate("/student-dashboard")}
      />

      <BottomContainer>
        <div className="bg-white p-6 rounded-2xl shadow w-full max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-4">
            Prueba de Memoria de Trabajo (en construcción)
          </h2>
          <p className="text-gray-600">
            Espacio reservado para el desarrollo futuro.
          </p>
        </div>
      </BottomContainer>
    </div>
  );
}
