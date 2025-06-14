// Campo de entrada reutilizable con soporte para etiqueta, tipo, validación y estilos
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
}) {
  return (
    <div className="space-y-1 w-full max-w-md">
      {/* Etiqueta del campo si se proporciona */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Campo de entrada */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-ring-blue-500 rounded-md focus:outline-none focus:ring-2 ${className}`}
      />
    </div>
  );
}
