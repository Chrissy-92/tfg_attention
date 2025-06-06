export default function CardWhite({ children }) {
  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-md">
      <div className="flex flex-col items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
}
