import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import BottomContainer from "../components/BottomContainer.jsx";
import ImgPerfil from "../components/ImgPerfil.jsx";
import Header from "../components/Header.jsx";
import CardWhite from "../components/CardWhite.jsx";

export default function StudentsPage() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/ninos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => {
        console.error(err);
        setError("Error al cargar los estudiantes");
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-violet-300">
      <Header title="Mis Estudiantes" />
      <BottomContainer>
        <div className="w-full max-w-3xl">
          <CardWhite>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            {students.length === 0 ? (
              <p className="text-center">No hay estudiantes registrados.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {students.map((student) => (
                  <li key={student.id_nino} className="text-center">
                    <ImgPerfil src={student.imagen_url} />
                    <p className="mt-2 font-semibold">{student.nombre}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardWhite>
        </div>
      </BottomContainer>
    </div>
  );
}
