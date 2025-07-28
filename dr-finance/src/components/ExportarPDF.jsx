import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportarPDF({ movimientos, mes, anio }) {
  const generarPDF = () => {
    const doc = new jsPDF();

    doc.text(`Reporte de Movimientos - ${mes}/${anio}`, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [
        ["Fecha", "Descripción", "Tipo", "Valor (€)", "Categoría", "Persona"],
      ],
      body: movimientos.map((mov) => [
        mov.fecha,
        mov.descripcion,
        mov.tipo,
        mov.valor.toFixed(2),
        mov.categoria,
        mov.persona,
      ]),
    });

    doc.save(`DR_Finance_${anio}_${mes}.pdf`);
  };

  return (
    <button
      onClick={generarPDF}
      className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
    >
      Exportar a PDF
    </button>
  );
}
