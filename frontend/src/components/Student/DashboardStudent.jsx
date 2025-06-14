import { useNavigate } from "react-router-dom";
import useSafeNavigate from "../../hooks/useSafeNavigate";
import { useAuth } from "../../hooks/useAuth";
import Header from "../Header";
import Aside from "../Aside";
import BottomContainer from "../BottomContainer";
import Button from "../Button";

export default function DashboardStudent() {
  const navigate = useNavigate();
  const safeNavigate = useSafeNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-violet-100">
      <Header title="EduMind Kids" />
      <main className="flex justify-center items-center gap-48 mx-5 h-[calc(100vh-80px)]">
        {/* Información lateral del alumno */}
        <div className="w-80">
          <Aside
            student={user}
            modo="student-dashboard"
            buttonLabel="Editar Perfil"
            buttonColor="azul"
            onButtonClick={() =>
              safeNavigate(`/activate-profile/${user.id_nino}`)
            }
          />
        </div>

        {/* Área de pruebas disponibles */}
        <div className="flex-1 max-w-3xl flex flex-col">
          <BottomContainer className="w-[900px] max-h-[600px] overflow-auto items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Prueba Stroop */}
              <section className="bg-purple-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Tarea Stroop</h2>
                <p>
                  Pulsa la barra espaciadora cuando el nombre del color y el
                  color de las letras sean el mismo.
                </p>
                <p>No hagas nada si no coinciden.</p>
                <p className="mt-2">Pulsa en EMPEZAR cuando estés listo.</p>
                <Button
                  onClick={() => safeNavigate(`/stroop-test/${user.id_nino}`)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  EMPEZAR
                </Button>
              </section>

              {/* Prueba de Cancelación de letras */}
              <section className="bg-orange-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Test de Cancelación</h2>
                <p>Busca y pulsa la letra objetivo tan rápido como puedas.</p>
                <p className="mt-2">Pulsa en EMPEZAR cuando estés listo.</p>
                <Button
                  onClick={() => safeNavigate("/cancellation")}
                  className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  EMPEZAR
                </Button>
              </section>

              {/* Prueba de Reacción Rápida */}
              <section className="bg-green-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Reacción Rápida</h2>
                <p>
                  Al inicio, pulsa la figura más grande ignorando los números.
                </p>
                <p>
                  Después, pulsa la que tenga el número mayor ignorando el
                  tamaño.
                </p>
                <Button
                  onClick={() => safeNavigate("/quick-reaction")}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  EMPEZAR
                </Button>
              </section>

              {/* Prueba Memoria de Trabajo */}
              <section className="bg-pink-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Memoria de Trabajo</h2>
                <p>Memoriza la posición de cada dibujo en la cuadrícula.</p>
                <p>Después pulsa el lugar donde crees que estaba.</p>
                <Button
                  onClick={() => safeNavigate("/working-memory")}
                  className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  EMPEZAR
                </Button>
              </section>
            </div>
          </BottomContainer>
        </div>
      </main>

      {/* Botón de cierre de sesión */}
      <div className="fixed bottom-6 right-11">
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
    </div>
  );
}
