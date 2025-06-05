import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../Header";
import Aside from "../Aside";
import BottomContainer from "../BottomContainer";

export default function DashboardStudent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        title="Panel del Estudiante"
        buttonLabel="Home"
        onButtonClick={() => navigate("/student-dashboard")}
      />

      <div className="flex gap-4 px-4">
        <div className="w-72">
          <Aside
            nombre={user?.nombre}
            avatar_url={user?.imagen_url}
            descripcion={[
              "¡Bienvenido a tu espacio personal!",
              "Selecciona una prueba para comenzar.",
            ]}
            buttonLabel="Cerrar sesión"
            onButtonClick={handleLogout}
            buttonColor="rojo"
          />
        </div>

        <div className="flex-1 max-w-5xl">
          <BottomContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Stroop Test */}
              <section className="bg-purple-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Tarea Stroop</h2>
                <p>
                  Pulsa la barra espaciadora cuando el nombre del color y el
                  color de las letras sean el mismo.
                </p>
                <p>No hagas nada si no coinciden.</p>
                <p className="mt-2">Pulsa en EMPEZAR cuando estés listo.</p>
                <button
                  onClick={() => navigate("/stroop")}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  EMPEZAR
                </button>
              </section>

              {/* Cancellation Words */}
              <section className="bg-orange-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Test de Cancelación</h2>
                <p>Busca y pulsa la letra objetivo tan rápido como puedas.</p>
                <p className="mt-2">Pulsa en EMPEZAR cuando estés listo.</p>
                <button
                  onClick={() => navigate("/cancellation")}
                  className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  EMPEZAR
                </button>
              </section>

              {/* Quick Reaction */}
              <section className="bg-green-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Reacción Rápida</h2>
                <p>
                  Al inicio, pulsa la figura más grande ignorando los números.
                </p>
                <p>
                  Después, pulsa la que tenga el número mayor ignorando el
                  tamaño.
                </p>
                <button
                  onClick={() => navigate("/quick-reaction")}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  EMPEZAR
                </button>
              </section>

              {/* Working Memory */}
              <section className="bg-pink-200 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-2">Memoria de Trabajo</h2>
                <p>Memoriza la posición de cada dibujo en la cuadrícula.</p>
                <p>Después pulsa el lugar donde crees que estaba.</p>
                <button
                  onClick={() => navigate("/working-memory")}
                  className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  EMPEZAR
                </button>
              </section>
            </div>
          </BottomContainer>
        </div>
      </div>
    </div>
  );
}
