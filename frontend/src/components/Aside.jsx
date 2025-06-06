import Button from "./Button";

export default function Aside({
  avatar,
  titulo,
  parrafos = [],
  onButtonClick,
  buttonLabel,
}) {
  return (
    <aside className="w-full md:max-w-xs rounded-2xl border border-slate-400 p-6 flex flex-col items-center gap-4">
      {avatar}

      <div className="w-full text-left space-y-2">
        <p className="text-xl font-semibold">{titulo}</p>
        {parrafos.map((texto, idx) => (
          <p key={idx} className="text-sm text-gray-700">
            {texto}
          </p>
        ))}
      </div>

      {buttonLabel && onButtonClick && (
        <Button color="rojo" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </aside>
  );
}
