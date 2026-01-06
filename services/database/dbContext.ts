import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase;

export const initDb = async () => {
  await createDb();
};

export const createDb = async () => {
  db = await SQLite.openDatabaseAsync("sources.db");

  // create a table called "Sources"
  await db.runAsync(
    "CREATE TABLE IF NOT EXISTS Sources (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT)",
  );
};

export default db;
