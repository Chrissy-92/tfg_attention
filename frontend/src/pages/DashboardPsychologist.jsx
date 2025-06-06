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

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/ninos");
        setStudents(res.data);
      } catch (err) {
        console.error("Error al cargar estudiantes:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <>
      <Header
        title="Panel del Psicólogo"
        buttonLabel="Añadir Estudiante"
        onButtonClick={() => navigate("/students/new")}
      />

      <BottomContainer className="bg-violet-200">
        <div className="bg-neutral-50 bg-opacity-50 m-5 w-[calc(100%-90px)] h-[calc(100%-160px)] overflow-auto rounded-xl p-4 border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
