export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  color = "azul",
  disabled = false,
  full = false,
}) {
  const baseStyle =
    "px-4 py-2 rounded-md font-semibold transition-colors duration-200";

  const colorStyles = {
    azul: "bg-blue-600 hover:bg-blue-700 text-white",
    verde: "bg-green-600 hover:bg-green-700 text-white",
    rojo: "bg-red-600 hover:bg-red-700 text-white",
  };

  const disabledStyle = "bg-gray-300 text-gray-600 cursor-not-allowed";

  const finalStyle = disabled
    ? disabledStyle
    : colorStyles[color] || colorStyles.azul;

  const widthStyle = full ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${finalStyle} ${widthStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
