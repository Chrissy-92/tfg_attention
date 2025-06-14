import { useState } from "react";

// Lista de avatares disponibles
const avatarList = [
  "alumnoAvatar_h01.png",
  "alumnoAvatar_h02.png",
  "alumnoAvatar_h03.png",
  "alumnoAvatar_h04.png",
  "alumnoAvatar_h05.png",
  "alumnoAvatar_h06.png",
  "alumnaAvatar_f01.png",
  "alumnaAvatar_f02.png",
  "alumnaAvatar_f03.png",
  "alumnaAvatar_f04.png",
];

export default function ImgSelector({ value, onSelect }) {
  const [selected, setSelected] = useState(value || "");

  // Al seleccionar una imagen, se actualiza el estado local y se informa al componente padre
  const handleSelect = (filename) => {
    const url = `/${filename}`;
    setSelected(url);
    onSelect(url);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Selecciona tu avatar</h3>
        {selected && (
          <img
            src={selected}
            alt="Avatar seleccionado"
            className="mx-auto w-28 h-28 rounded-full shadow-md border border-gray-300 object-cover"
          />
        )}
      </div>

      <div className="grid grid-cols-5 gap-3">
        {avatarList.map((filename) => {
          const url = `/${filename}`;
          const isSelected = selected === url;
          return (
            <img
              key={filename}
              src={url}
              alt={filename}
              className={`cursor-pointer w-16 h-16 rounded-lg object-cover border-2 ${
                isSelected ? "border-amber-300" : "border-transparent"
              } hover:scale-105 transition`}
              onClick={() => handleSelect(filename)}
            />
          );
        })}
      </div>
    </div>
  );
}
