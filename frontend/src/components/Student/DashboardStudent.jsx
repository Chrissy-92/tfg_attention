import { useNavigate } from "react-router-dom";

export default function DashboardAlumno({ idNino }) {
  const navigate = useNavigate();

  const irAPrueba = (ruta) => {
    navigate(ruta, { state: { id_nino: idNino } });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Columna izquierda con avatar */}
      <aside className="w-1/4 bg-white shadow-lg flex flex-col items-center p-6">
        <img
          src="/avatar_default.png"
          alt="Avatar Alumno"
          className="w-32 h-32 rounded-full border-4 border-violet-300"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Alumno</h2>
        <p className="text-sm text-gray-500">ID: {idNino}</p>
      </aside>

      {/* Contenido principal */}
      <main className="w-3/4 p-8 grid grid-cols-2 gap-6">
        {/* Tarea Stroop */}
        <section className="bg-purple-200 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-2">Aplicar Tarea Stroop</h2>
          <h4 className="font-semibold mb-1">Instrucciones:</h4>
          <p className="text-sm mb-4">
            Pulsa la barra espaciadora cuando el nombre del color y el color de
            las letras sean el mismo. Si no coinciden, no hagas nada.
          </p>
          <p className="text-sm mb-4">Pulsa en "EMPEZAR" cuando estés listo.</p>
          <button
            onClick={() => irAPrueba("/stroop-test")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            EMPEZAR
          </button>
        </section>

        {/* Cancelación de Letras */}
        <section className="bg-orange-200 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-2">
            Aplicar Test de Cancelación de Letras
          </h2>
          <h4 className="font-semibold mb-1">Instrucciones:</h4>
          <p className="text-sm mb-4">
            Presta atención a la letra objetivo. Encuéntrala en el conjunto y
            haz clic en ella lo más rápido posible.
          </p>
          <p className="text-sm mb-4">Pulsa en "EMPEZAR" cuando estés listo.</p>
          <button
            onClick={() => irAPrueba("/cancelacion")}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            EMPEZAR
          </button>
        </section>

        {/* Reacción Rápida */}
        <section className="bg-green-200 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-2">
            Aplicar Test de Reacción Rápida
          </h2>
          <h4 className="font-semibold mb-1">Instrucciones:</h4>
          <p className="text-sm mb-4">
            Al principio pulsa sobre la figura de mayor tamaño. Luego
            cambiaremos y deberás pulsar la que tenga el número más alto.
          </p>
          <p className="text-sm mb-4">Pulsa en "EMPEZAR" cuando estés listo.</p>
          <button
            onClick={() => irAPrueba("/reaccion")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            EMPEZAR
          </button>
        </section>

        {/* Memoria de Trabajo */}
        <section className="bg-pink-200 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-2">
            Aplicar Test de Memoria de Trabajo
          </h2>
          <h4 className="font-semibold mb-1">Instrucciones:</h4>
          <p className="text-sm mb-4">
            Memoriza la posición de los dibujos en la cuadrícula. Luego haz clic
            donde creas que estaba.
          </p>
          <p className="text-sm mb-4">Pulsa en "EMPEZAR" cuando estés listo.</p>
          <button
            onClick={() => irAPrueba("/memoria")}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
          >
            EMPEZAR
          </button>
        </section>
      </main>
    </div>
  );
}
