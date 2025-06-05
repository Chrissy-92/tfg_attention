import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import BottomContainer from "../components/BottomContainer";
import StudentCard from "../components/Psychologist/DashboardPsychologist/StudentCard";

export default function DashboardPsychologist() {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-100">
      <Header
        title="Panel del Psicólogo"
        buttonLabel="Añadir Estudiante"
        onButtonClick={() => navigate("/students/new")}
      />

      <BottomContainer>
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
      </BottomContainer>
    </div>
  );
}
