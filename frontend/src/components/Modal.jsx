import { useEffect, useState } from "react";

export default function Modal({ mensaje, tipo, onClose }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 3000;

    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onClose(), 500); // permite animación fade
    }, duration);

    return () => clearTimeout(fadeTimeout);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-white border shadow-lg px-6 py-3 rounded-xl z-50
      w-full max-w-xs text-sm font-medium text-gray-800 text-center transition-opacity duration-500
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className={tipo === "exito" ? "text-green-600" : "text-red-600"}>
        {mensaje}
      </div>
      <div className="mt-2 h-1 w-full bg-gray-200 rounded overflow-hidden">
        <div
          className={`h-full ${
            tipo === "exito" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{
            width: "100%",
            animation: "progressBar 3s linear forwards",
          }}
        ></div>
      </div>

      {/* Animación declarada */}
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
