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
