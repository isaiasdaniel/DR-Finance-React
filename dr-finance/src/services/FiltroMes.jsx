import React from "react";

export default function FiltroMes({ mes, setMes, anio, setAnio }) {
  const meses = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const anios = [2024, 2025];

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={mes}
        onChange={(e) => setMes(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        {meses.map((m) => (
          <option key={m} value={m}>
            Mes {m}
          </option>
        ))}
      </select>

      <select
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        {anios.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}
