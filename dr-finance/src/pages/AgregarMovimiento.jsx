// src/pages/AgregarMovimiento.jsx
import React from "react";
import { Link } from "react-router-dom";

function AgregarMovimiento() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        Agregar Movimiento
      </h1>
      <p className="text-gray-600">Aquí irán los campos del formulario...</p>

      <Link to="/" className="text-blue-500 hover:underline mt-4 block">
        ← Volver al inicio
      </Link>
    </div>
  );
}

export default AgregarMovimiento;
