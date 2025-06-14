import { useAuth } from "../hooks/useAuth";

// Componente de imagen de perfil reutilizable con tamaño, borde y selección opcionales
export default function ImgPerfil({
  src,
  alt = "imagen de perfil",
  size = "md",
  seleccionado = false,
  onClick,
  className = "",
}) {
  const { user } = useAuth();

  // Tamaños disponibles
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  // Borde visual según si está seleccionado o no
  const borderClass = seleccionado
    ? "border-4 border-blue-600"
    : "border border-gray-300";

  // Imagen por defecto si no se proporciona
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
