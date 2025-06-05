import { useEffect, useState } from "react";

export default function Mensaje({
  mensaje,
  tipo = "info", // "exito", "error", "info"
  onClose,
  posicion = "bottom-right", // "center", "bottom-right"
}) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 3000;

    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onClose(), 500); // permite animación fade
    }, duration);

    return () => clearTimeout(fadeTimeout);
  }, [onClose]);

  const posicionClass =
    posicion === "center"
      ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      : "bottom-5 right-5";

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
      <div className={textoColor}>{mensaje}</div>
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
