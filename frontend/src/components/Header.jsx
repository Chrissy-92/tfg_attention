// src/components/Header.jsx
import React from "react";

export default function Header({ title, buttonLabel, onButtonClick }) {
  return (
    <header className="flex items-center justify-between py-4 mb-6 border-b border-gray-300">
      <h1 className="text-3xl font-bold">{title}</h1>
      <button
        onClick={onButtonClick}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {buttonLabel}
      </button>
    </header>
  );
}
