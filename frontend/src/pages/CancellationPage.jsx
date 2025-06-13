import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import BottomContainer from "../components/BottomContainer.jsx";

export default function CancellationPage() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setStarted(true);
    // Aquí iría la lógica de la prueba
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
        title="Cancelación de Letras"
        buttonLabel="Home"
        onButtonClick={() => navigate("/student-dashboard")}
      />
      <BottomContainer>
        <div className="bg-white p-6 rounded-xl shadow max-w-xl w-full">
          {!started ? (
            <button
              onClick={handleStart}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition w-full"
            >
              Iniciar prueba
            </button>
          ) : result ? (
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-bold">Resultados</h2>
              <p>Aciertos: {result.aciertos}</p>
              <p>Errores: {result.errores}</p>
              <p>Tiempo total: {result.tiempo}</p>
            </div>
          ) : (
            <p className="text-center">Ejecutando prueba...</p>
          )}
        </div>
      </BottomContainer>
    </div>
  );
}
