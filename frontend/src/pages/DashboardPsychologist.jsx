import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import Header from "../components/Header";
import BottomContainer from "../components/BottomContainer";
import StudentCard from "../components/Psychologist/StudentCard";
import Button from "../components/Button";

export default function DashboardPsychologist() {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Al montar el componente, cargamos la lista de estudiantes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/ninos");
        setStudents(res.data);
      } catch (err) {
        // En caso de error, dejamos la lista vacía
        setStudents([]);
      }
    };
    fetchStudents();
  }, []);

  // Alterna la selección del alumno
  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <>
      <Header
        title="EduMind Kids"
        buttonLabel="Añadir Estudiante"
        onButtonClick={() => navigate("/students-new")}
      />

      <BottomContainer className="bg-violet-200">
        <div className="bg-neutral-50 bg-opacity-50 m-5 mt-1 w-[calc(100%-250px)] h-[calc(100%-200px)] overflow-auto rounded-xl p-4 border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-10 pl-20 justify-center">
            {students.map((student) => (
              <StudentCard
                key={student.id_nino}
                student={student}
                isSelected={selectedId === student.id_nino}
                onSelect={() => handleSelect(student.id_nino)}
              />
            ))}
          </div>
        </div>
      </BottomContainer>

      {/* Botón para cerrar sesión */}
      <div className="fixed bottom-4 right-11">
        <Button
          color="rojo"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Cerrar Sesión
        </Button>
      </div>
    </>
  );
}
