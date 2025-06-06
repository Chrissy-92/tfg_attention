export default function ImgPerfil({
  src,
  alt = "imagen de perfil",
  size = "md", // sm, md, lg
  seleccionado = false,
  onClick,
  className = "",
}) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const borderClass = seleccionado
    ? "border-4 border-blue-600"
    : "border border-gray-300";

  const imagenFinal = src?.trim() ? src : "/user_default.jpg";

  return (
    <img
      src={imagenFinal}
      alt={alt}
      onClick={onClick}
      className={`rounded-full object-cover cursor-pointer ${sizeClasses[size]} ${borderClass} ${className}`}
    />
  );
}
