import ImgPerfil from "../ImgPerfil";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function StudentCard({ student, onSelect }) {
  const navigate = useNavigate();

  // Al hacer clic se dispara la función opcional y se redirige al informe del alumno
  const handleClick = () => {
    onSelect?.();
    navigate(`/integration/${student.id_nino}`);
  };

  return (
    <div
      onClick={onSelect}
      className="bg-green-50 border-4 rounded-xl cursor-pointer transition-all flex items-center justify-center w-52 h-64 hover:border-amber-200"
    >
      <div className="flex flex-col items-center space-y-2 gap-3">
        <ImgPerfil
          src={student.imagen_url}
          alt={`Avatar de ${student.nombre}`}
          size="lg"
        />
        <Button
          color="azul"
          onClick={handleClick}
          className="px-4 py-2 min-w-[160px] text-sm truncate"
          title={student.nombre}
        >
          {student.nombre}
        </Button>
      </div>
    </div>
  );
}
