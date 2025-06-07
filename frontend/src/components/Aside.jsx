import Button from "./Button";
import ImgPerfil from "./ImgPerfil";

export default function Aside({
  student,
  modo, // "integration" o "student-dashboard"
  onButtonClick,
  buttonLabel,
  buttonColor = "rojo",
}) {
  if (!student) return null;

  const descripcion =
    modo === "integration"
      ? [
          `Este informe resume el desempeño ${
            student.genero === "femenino"
              ? "de la estudiante"
              : "del estudiante"
          }.`,
          "Puedes revisar el percentil global obtenido.",
        ]
      : [
          `¡Bienvenid${
            student.genero === "femenino" ? "a" : "o"
          } a tu espacio personal!`,
          "Selecciona una prueba para comenzar.",
        ];

  return (
    <aside className="w-full md:max-w-xs rounded-2xl border border-slate-400 p-6 flex flex-col items-center gap-4">
      <ImgPerfil
        src={student.avatar_url || student.imagen_url || "/user_default.jpg"}
        alt={`Avatar de ${student.nombre}`}
        size="md"
      />

      <div className="w-full text-left space-y-2">
        <p className="text-xl font-semibold">{student.nombre}</p>

        {modo === "integration" && (
          <>
            <p className="text-sm text-gray-700">Edad: {student.edad}</p>
            <p className="text-sm text-gray-700">Padre: {student.padre}</p>
            <p className="text-sm text-gray-700">Madre: {student.madre}</p>
            <p className="text-sm text-gray-700">
              Email tutores: {student.email_tutores}
            </p>
            <p className="text-sm text-gray-700">
              Teléfono: {student.telefono}
            </p>
          </>
        )}

        {descripcion.map((texto, idx) => (
          <p key={idx} className="text-sm text-gray-700">
            {texto}
          </p>
        ))}
      </div>

      {buttonLabel && onButtonClick && (
        <Button color={buttonColor} onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </aside>
  );
}
