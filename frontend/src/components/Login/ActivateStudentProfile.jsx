import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import api from "../../services/api.js";
import CardWhite from "../CardWhite.jsx";
import ImgPerfil from "../ImgPerfil.jsx";
import ImgSelector from "../Student/ImgSelector.jsx";
import PopupModal from "../PopupModal.jsx";
import Input from "../Input.jsx";
import BottomContainer from "../BottomContainer.jsx";
import Header from "../Header.jsx";
import Button from "../Button.jsx";
import BackButton from "../BackButton.jsx";

export default function ActivateStudentProfile({ idStudent: idStudentProp }) {
  const params = useParams();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const id_student = idStudentProp || params.id_student;
  const modoEdicion = user && !user.needsActivation;
  const isExternalActivation = !user && idStudentProp;

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/user_default.jpg");
  const [modal, setModal] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/ninos/${id_student}`);
      setNombre(res.data.nombre);
      setAvatarUrl(res.data.imagen_url);
      setPassword(modoEdicion ? "******" : "123456");
    } catch (err) {
      // Error al cargar datos del alumno
    }
  };

  useEffect(() => {
    if (modoEdicion) {
      const stored = localStorage.getItem("auth");
      const { token } = JSON.parse(stored || "{}");
      if (!token) return;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchStudent();
    } else if (isExternalActivation) {
      fetchStudent();
    }
  }, [id_student, user, modoEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordToSend =
      password.trim() === "" || password === "******" ? null : password;

    try {
      await api.post("/alumnos/activar", {
        id_nino: id_student,
        nombre,
        ...(passwordToSend && { nuevaPassword: passwordToSend }),
        imagen_url: avatarUrl,
      });

      if (!isExternalActivation) {
        const stored = localStorage.getItem("auth");
        const { token } = JSON.parse(stored || "{}");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        login({
          token,
          user: {
            id_nino: id_student,
            nombre,
            avatar_url: avatarUrl,
          },
        });

        await fetchStudent();
      }

      setModal({
        tipo: "exito",
        mensaje: modoEdicion
          ? "Has modificado tu perfil"
          : "Cuenta activada con éxito",
        onClose: () => {
          setModal(null);
          navigate("/student-dashboard");
        },
      });

      setTimeout(() => {
        setModal(null);
        navigate("/student-dashboard");
      }, 2500);
    } catch (err) {
      setModal({
        tipo: "error",
        mensaje:
          err.response?.data?.error ||
          (modoEdicion
            ? "Error al modificar tu perfil"
            : "Error al activar tu perfil"),
      });
      setTimeout(() => setModal(null), 3000);
    }
  };

  return (
    <>
      <Header title={modoEdicion ? "Modifica tu perfil" : "Activa tu cuenta"} />
      <BottomContainer className="flex items-start justify-center pt-2 bg-gradient-to-br from-emerald-300 via-violet-300 to-pink-300">
        <CardWhite className="w-full max-w-md p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-1 w-full max-w-md p-6"
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              {modoEdicion ? "Modifica tu perfil" : "Activa tu perfil"}
            </h2>

            <div className="flex justify-center">
              <ImgPerfil src={avatarUrl} size="lg" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
                disabled={modoEdicion}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Nueva contraseña
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-600"
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>

            <ImgSelector value={avatarUrl} onSelect={setAvatarUrl} />

            <div className="flex flex-col items-center pt-6">
              <Button
                type="submit"
                color="verde"
                className="min-w-[240px] text-lg"
              >
                {modoEdicion ? "Guardar cambios" : "Activar perfil"}
              </Button>
              <BackButton
                className="mt-6"
                to={modoEdicion ? "/student-dashboard" : "/login-student"}
              />
            </div>
          </form>
        </CardWhite>

        {modal && (
          <PopupModal
            tipo={modal.tipo}
            mensaje={modal.mensaje}
            onClose={modal.onClose || (() => setModal(null))}
          />
        )}
      </BottomContainer>
    </>
  );
}
