import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function GraficoCategorias({ movimientos }) {
  const datos = {};

  movimientos.forEach((mov) => {
    const valor = parseFloat(mov.valor);
    if (!datos[mov.categoria]) {
      datos[mov.categoria] = 0;
    }
    datos[mov.categoria] += valor * (mov.tipo === "gasto" ? 1 : -1);
  });

  const data = Object.keys(datos).map((cat) => ({
    categoria: cat,
    valor: Math.abs(datos[cat]),
  }));

  return (
    <div className="mt-8 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Gastos por categoría</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
