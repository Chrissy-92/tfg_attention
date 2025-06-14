import Button from "../Button";

// Componente reutilizable que muestra una sección con título, texto, botón y contenido opcional en el lateral
export default function Section({
  title,
  paragraphs = [],
  onStart,
  buttonColor = "azul",
  buttonText = "EMPEZAR",
  asideContent = null,
}) {
  return (
    <section className="flex flex-col md:flex-row items-start bg-white rounded-2xl shadow p-6 gap-6">
      {/* Columna principal: título, párrafos y botón */}
      <div className="flex-1 space-y-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        {paragraphs.map((text, idx) => (
          <p key={idx} className="text-sm text-gray-700">
            {text}
          </p>
        ))}
        <Button onClick={onStart} color={buttonColor}>
          {buttonText}
        </Button>
      </div>

      {/* Columna lateral opcional (por ejemplo, una imagen o gráfico) */}
      {asideContent && (
        <aside className="w-full md:w-48 flex justify-center items-center">
          {asideContent}
        </aside>
      )}
    </section>
  );
}
