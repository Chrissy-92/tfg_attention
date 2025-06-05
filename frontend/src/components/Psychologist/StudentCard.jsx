import ImgPerfil from "../ImgPerfil";
import Button from "../Button";

export default function StudentCard({
  nombre,
  avatar_url,
  onClick,
  seleccionado = false,
}) {
  const borderClass = seleccionado
    ? "border-4 border-amber-200"
    : "border border-gray-200";

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow text-center ${borderClass}`}
    >
      <ImgPerfil src={avatar_url} alt={`Avatar de ${nombre}`} size="md" />
      <div className="mt-4">
        <Button onClick={onClick} className="w-full">
          {nombre}
        </Button>
      </div>
    </div>
  );
}
