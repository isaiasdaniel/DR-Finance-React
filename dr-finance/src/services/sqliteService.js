import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

const sqlite = new SQLiteConnection(CapacitorSQLite);
let db;

export const initDB = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.warn("⚠️ SQLite só funciona em app nativo (Android/iOS).");
    return;
  }

  try {
    await sqlite.checkConnectionsConsistency();

    const isConn = (await sqlite.isConnection("dr_finance")).result;
    if (isConn) {
      db = await sqlite.retrieveConnection("dr_finance");
    } else {
      db = await sqlite.createConnection(
        "dr_finance",
        false,
        "no-encryption",
        1
      );
    }

    await db.open();

    // Criação da tabela com todos os campos
    await db.execute(`
      CREATE TABLE IF NOT EXISTS movimientos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        descripcion TEXT,
        valor REAL,
        categoria TEXT,
        frecuencia TEXT,
        persona TEXT,
        fecha TEXT
      );
    `);
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco:", error);
  }
};

export const addMovimiento = async (mov) => {
  try {
    const stmt = `
      INSERT INTO movimientos (tipo, descripcion, valor, categoria, frecuencia, persona, fecha)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [
      mov.tipo,
      mov.descripcion,
      mov.valor,
      mov.categoria,
      mov.frecuencia,
      mov.persona,
      mov.fecha,
    ];
    console.log(">>> Salvando movimento:", values);
    await db.run(stmt, values);
  } catch (error) {
    console.error("❌ Erro ao adicionar movimento:", error);
    throw error; // Para exibir no alert
  }
};

export const getMovimientos = async () => {
  try {
    const res = await db.query("SELECT * FROM movimientos ORDER BY fecha DESC");
    return res.values;
  } catch (error) {
    console.error("❌ Erro ao listar movimentos:", error);
    return [];
  }
};

export const deleteMovimiento = async (id) => {
  try {
    await db.run("DELETE FROM movimientos WHERE id = ?", [id]);
  } catch (error) {
    console.error("❌ Erro ao deletar movimento:", error);
  }
};
