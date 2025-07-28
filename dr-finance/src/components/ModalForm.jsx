import { useState } from "react";

export default function ModalForm({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    descripcion: "",
    valor: "",
    tipo: "ingreso",
    frecuencia: "mensual",
    fecha: "",
    persona: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      descripcion: "",
      valor: "",
      tipo: "ingreso",
      frecuencia: "mensual",
      fecha: "",
      persona: "",
      categoria: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Registrar movimiento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleChange}
            placeholder="Valor (€)"
            className="w-full border rounded p-2"
            required
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>

          <select
            name="frecuencia"
            value={form.frecuencia}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="mensual">Mensual</option>
            <option value="trimestral">Trimestral</option>
            <option value="anual">Anual</option>
            <option value="avulso">Avulso</option>
          </select>

          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

          <input
            type="text"
            name="persona"
            value={form.persona}
            onChange={handleChange}
            placeholder="Persona (Tatiana, Isaias, Isaac...)"
            className="w-full border rounded p-2"
          />

          <input
            type="text"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            placeholder="Categoría"
            className="w-full border rounded p-2"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
