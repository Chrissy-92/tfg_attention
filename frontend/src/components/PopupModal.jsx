import { useEffect, useState } from "react";

// Modal emergente con animación de desaparición automática
export default function Mensaje({
  mensaje,
  tipo = "info", // "exito", "error" o "info"
  onClose,
  posicion = "bottom-right", // "center" o "bottom-right"
}) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 3000;

    // Dispara el cierre con un efecto de desvanecimiento
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onClose(), 500);
    }, duration);

    return () => clearTimeout(fadeTimeout);
  }, [onClose]);

  // Posición del modal en pantalla
  const posicionClass =
    posicion === "center"
      ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      : "bottom-5 right-5";

  // Colores según tipo de mensaje
  const colores = {
    exito: "text-green-600 bg-green-500",
    error: "text-red-600 bg-red-500",
    info: "text-blue-600 bg-blue-500",
  };

  const textoColor = colores[tipo]?.split(" ")[0];
  const barraColor = colores[tipo]?.split(" ")[1];

  return (
    <div
      className={`fixed ${posicionClass} bg-white border shadow-lg px-6 py-3 rounded-xl z-50
      w-full max-w-xs text-sm font-medium text-gray-800 text-center transition-opacity duration-500
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Mensaje principal */}
      <div className={textoColor}>{mensaje}</div>

      {/* Barra de progreso visual */}
      <div className="mt-2 h-1 w-full bg-gray-200 rounded overflow-hidden">
        <div
          className={`h-full ${barraColor}`}
          style={{
            width: "100%",
            animation: "progressBar 3s linear forwards",
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes progressBar {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        `}
      </style>
    </div>
  );
}
