export default function BottomContainer({ children }) {
  return (
    <div className="flex-1 min-h-[calc(100vh)] overflow-hidden p-6 bg-gradient-to-br from-cyan-200 via-violet-200 to-pink-300 flex justify-center items-center">
      {children}
    </div>
  );
}
