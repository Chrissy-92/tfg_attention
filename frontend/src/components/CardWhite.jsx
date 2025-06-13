export default function CardWhite({ children }) {
  return (
    <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
      <div className="flex flex-col items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
}
