import React, { useState } from "react";
import { addMovimiento } from "../services/sqliteService";

export default function ModalMovimiento({ isOpen, closeModal, onSave }) {
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("Ingreso");
  const [categoria, setCategoria] = useState("Sueldo");
  const [frecuencia, setFrecuencia] = useState("Mensal");
  const [persona, setPersona] = useState("Isaías");
  const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10));

  if (!isOpen) return null;

  const handleGuardar = async () => {
    if (!descripcion || !valor || isNaN(valor)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const nuevoMovimiento = {
      descripcion,
      valor: parseFloat(valor),
      tipo,
      categoria,
      frecuencia,
      persona,
      fecha,
    };

    try {
      await addMovimiento(nuevoMovimiento);
      onSave(); // Atualiza a lista no componente pai
    } catch (err) {
      console.error("Erro ao salvar movimento:", err);
      alert("Erro ao salvar o movimento.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Adicionar Movimiento</h2>

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="number"
          placeholder="Valor (€)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded px-3 py-2"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded px-3 py-2"
        >
          <option value="Ingreso">Ingreso</option>
          <option value="Gasto">Gasto</option>
        </select>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded px-3 py-2"
        >
          <option>Sueldo</option>
          <option>Sueldo-Variavel</option>
          <option>Luz</option>
          <option>Alimentación</option>
          <option>Alquiler</option>
          <option>Coche</option>
          <option>Seguro-Coche</option>
          <option>Internet</option>
          <option>Transporte</option>
          <option>Otros</option>
        </select>

        <select
          value={frecuencia}
          onChange={(e) => setFrecuencia(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded px-3 py-2"
        >
          <option>Mensal</option>
          <option>Bimestral</option>
          <option>Trimestral</option>
          <option>Semestral</option>
          <option>Anual</option>
          <option>Avulso</option>
        </select>

        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded px-3 py-2"
        >
          <option>Isaías</option>
          <option>Tatiane</option>
          <option>Isaac</option>
        </select>

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
