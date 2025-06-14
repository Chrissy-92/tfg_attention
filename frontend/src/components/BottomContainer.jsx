// Contenedor inferior reutilizable que ocupa toda la altura restante de la pantalla
export default function BottomContainer({ children, className = "" }) {
  return (
    <div
      className={`w-full h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
