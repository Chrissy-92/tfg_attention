import { useAuth } from "../hooks/useAuth";

export default function ImgPerfil({
  src,
  alt = "imagen de perfil",
  size = "md",
  seleccionado = false,
  onClick,
  className = "",
}) {
  const { user } = useAuth();

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const borderClass = seleccionado
    ? "border-4 border-blue-600"
    : "border border-gray-300";

  const imagenFinal = src || user?.imagen_url || "/user_default.jpg";

  return (
    <img
      src={imagenFinal}
      alt={alt}
      onClick={onClick}
      className={`rounded-full object-cover cursor-pointer ${sizeClasses[size]} ${borderClass} ${className}`}
    />
  );
}
