export default function BottomContainer({ children }) {
  return (
    <div className="flex-1 p-6 bg-violet-300/50 rounded-2xl overflow-auto flex justify-center items-center">
      {children}
    </div>
  );
}
