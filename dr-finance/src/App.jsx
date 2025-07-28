// src/App.jsx
import { useEffect, useState } from "react";
import ModalMovimiento from "./components/ModalMovimiento";
import {
  initDB,
  getMovimientos,
  deleteMovimiento,
} from "./services/sqliteService";
import GraficoCategorias from "./components/GraficoCategorias";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [movimientos, setMovimientos] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const cargarDatos = async () => {
    await initDB();
    const data = await getMovimientos();
    setMovimientos(data);

    // Calcular saldo (ingresos - gastos)
    const total = data.reduce((acc, mov) => {
      return mov.tipo === "ingreso"
        ? acc + parseFloat(mov.valor)
        : acc - parseFloat(mov.valor);
    }, 0);
    setSaldo(total);
  };

  useEffect(() => {
    cargarDatos();
  }, [isOpen]);

  const eliminarMovimiento = async (id) => {
    const confirm = window.confirm("¿Deseas eliminar este movimiento?");
    if (!confirm) return;

    await deleteMovimiento(id);
    const nuevos = movimientos.filter((m) => m.id !== id);
    setMovimientos(nuevos);

    const total = nuevos.reduce((acc, mov) => {
      return mov.tipo === "ingreso"
        ? acc + parseFloat(mov.valor)
        : acc - parseFloat(mov.valor);
    }, 0);
    setSaldo(total);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-950 text-white py-4 shadow-md">
        <div className="max-w-screen-md mx-auto px-4 flex items-center justify-between">
          <img src="/logo.png" alt="DR Finance" className="h-10" />
          <div>
            <h1 className="text-xl font-bold">DR Finance</h1>
            <p className="text-sm">¡Bienvenido a tu control financiero!</p>
          </div>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Saldo actual:</h2>
          <p
            className={`text-3xl font-bold mt-2 ${
              saldo < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            € {saldo.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-6">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded"
            onClick={() => setIsOpen(true)}
          >
            Adicionar ingreso
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded"
            onClick={() => setIsOpen(true)}
          >
            Adicionar gasto
          </button>
        </div>

        <div className="text-left">
          <h3 className="text-lg font-bold text-green-700 mb-2">Movimientos</h3>
          <div className="bg-white p-4 shadow rounded">
            {movimientos.length === 0 ? (
              <p className="text-gray-500">
                Aún no hay movimientos registrados.
              </p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {movimientos.map((mov) => (
                  <li
                    key={mov.id}
                    className="py-2 px-2 flex justify-between items-center hover:bg-gray-100 rounded"
                  >
                    <div>
                      <p className="font-medium">{mov.descripcion}</p>
                      <p className="text-sm text-gray-500">{mov.fecha}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-bold ${
                          mov.tipo === "ingreso"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {mov.tipo === "ingreso" ? "+" : "-"}€
                        {parseFloat(mov.valor).toFixed(2)}
                      </span>
                      <button
                        onClick={() => eliminarMovimiento(mov.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <ModalMovimiento isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <GraficoCategorias movimientos={movimientos} />
    </div>
  );
}

export default App;
