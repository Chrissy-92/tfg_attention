import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import CardWhite from "../CardWhite.jsx";
import ImgPerfil from "../ImgPerfil.jsx";
import ImgSelector from "../Student/ImgSelector.jsx";
import PopupModal from "../PopupModal.jsx";

export default function ActivateStudentProfile() {
  const { id_student } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/user_default.jpg");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    // Opcional: se podrían precargar los datos del alumno aquí si se necesitan
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/alumnos/activar", {
        id_nino: id_student,
        nombre,
        password,
        avatar_url: avatarUrl,
      });

      setModal({ tipo: "exito", mensaje: "Cuenta activada con éxito" });
      setTimeout(() => {
        setModal(null);
        navigate("/student-dashboard");
      }, 2500);
    } catch (err) {
      console.error(err);
      setModal({
        tipo: "error",
        mensaje:
          err.response?.data?.error || "Error al activar el perfil del alumno",
      });
      setTimeout(() => setModal(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CardWhite>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <h2 className="text-xl font-semibold text-center mb-4">
            Activar perfil del alumno
          </h2>

          <div className="flex justify-center">
            <ImgPerfil src={avatarUrl} size="large" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <ImgSelector value={avatarUrl} onSelect={setAvatarUrl} />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            Activar perfil
          </button>
        </form>
      </CardWhite>

      {modal && (
        <PopupModal
          tipo={modal.tipo}
          mensaje={modal.mensaje}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
