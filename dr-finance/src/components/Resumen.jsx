function Resumen() {
  const saldo = 350.0; // esto luego será dinámico

  return (
    <section className="p-4 text-center">
      <h2 className="text-lg mb-2">Saldo actual:</h2>
      <p
        className={`text-3xl font-bold ${
          saldo >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        € {saldo.toFixed(2)}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Adicionar ingreso
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Adicionar gasto
        </button>
      </div>
    </section>
  );
}

export default Resumen;
