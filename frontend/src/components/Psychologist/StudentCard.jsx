import ImgPerfil from "../ImgPerfil";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function StudentCard({ student, isSelected, onSelect }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/integracion/${student.id_nino}`);

  return (
    <div
      onClick={onSelect}
      className={`border-4 rounded-xl p-4 text-center cursor-pointer transition-all ${
        isSelected ? "border-amber-200" : "border-transparent"
      }`}
    >
      <ImgPerfil
        src={student.imagen_url}
        alt={`Avatar de ${student.nombre}`}
        size="md"
      />
      <Button color="azul" onClick={handleClick} className="mt-2">
        {student.nombre}
      </Button>
    </div>
  );
}
