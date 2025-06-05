export default function CardWhite({ children, className = "" }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-100">
      <div
        className={`bg-white p-6 rounded-xl shadow-lg w-full max-w-md ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
