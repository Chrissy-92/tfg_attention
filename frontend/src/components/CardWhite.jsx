export default function CardWhite({ children, className = "" }) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-lg w-full max-w-md ${className}`}
    >
      {children}
    </div>
  );
}
