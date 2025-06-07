import ImgPerfil from "../ImgPerfil";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function StudentCard({ student, isSelected, onSelect }) {
  const navigate = useNavigate();
  const handleClick = () => {
    onSelect?.();
    navigate(`/integration/${student.id_nino}`);
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-green-50 border-4 rounded-xl cursor-pointer transition-all flex items-center justify-center w-40 h-52 ${
        isSelected ? "border-amber-200" : "border-transparent"
      }`}
    >
      <div className="flex flex-col items-center space-y-2">
        <ImgPerfil
          src={student.imagen_url}
          alt={`Avatar de ${student.nombre}`}
          size="md"
        />
        <Button
          color="azul"
          onClick={handleClick}
          className="px-4 py-2 min-w-[120px] text-sm truncate"
          title={student.nombre}
        >
          {student.nombre}
        </Button>
      </div>
    </div>
  );
}
