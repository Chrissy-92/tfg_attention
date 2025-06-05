import Button from "../Button";

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
      {/* Contenido izquierdo */}
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

      {/* Aside derecho opcional */}
      {asideContent && (
        <aside className="w-full md:w-48 flex justify-center items-center">
          {asideContent}
        </aside>
      )}
    </section>
  );
}
