import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";

// Página base para la prueba de cancelación de letras
export default function CancellationPage() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);

  // Inicia la prueba
  const handleStart = () => {
    setStarted(true);
    // Aquí se implementará la lógica real de la prueba
    setTimeout(() => {
      setResult({
        aciertos: 15,
        errores: 3,
        tiempo: "45s",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-orange-200">
      <Header
        title=" Prueba de Cancelación de Letras"
        buttonLabel="Home"
        onButtonClick={() => navigate("/student-dashboard")}
      />
      <BottomContainer>
        <div className="bg-white p-6 rounded-2xl shadow w-full max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-4">
            Prueba de Cancelación de Letras (en construcción)
          </h2>
          <p className="text-gray-600">
            Espacio reservado para el desarrollo futuro.
          </p>
        </div>
      </BottomContainer>
    </div>
  );
}
