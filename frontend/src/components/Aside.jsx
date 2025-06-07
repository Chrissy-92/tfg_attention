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
    <aside className="w-full md:w-[340px] min-h-[620px] bg-white p-6 rounded-2xl border border-slate-300 flex flex-col items-center gap-4 text-[17px] shadow-lg justify-center">
      <ImgPerfil
        src={student.avatar_url || student.imagen_url || "/user_default.jpg"}
        alt={`Avatar de ${student.nombre}`}
        size="lg"
      />

      <div className=" leading-relaxed tracking-normal space-y-2 gap-24">
        <p className="text-2xl font-semibold">{student.nombre}</p>

        {modo === "integration" && (
          <>
            <p>
              <span className="font-semibold">Edad:</span> {student.edad}
            </p>
            <p>
              <span className="font-semibold">Padre:</span> {student.padre}
            </p>
            <p>
              <span className="font-semibold">Madre:</span> {student.madre}
            </p>
            <p>
              <span className="font-semibold">Email tutores: </span>
              {student.email_tutores}
            </p>
            <p>
              <span className="font-semibold">Teléfono: </span>
              {student.telefono}
            </p>
          </>
        )}

        <div className="mt-4 italic space-y-5">
          {descripcion.map((texto, idx) => (
            <p key={idx}>{texto}</p>
          ))}
        </div>
      </div>

      {buttonLabel && onButtonClick && (
        <Button color={buttonColor} onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </aside>
  );
}
