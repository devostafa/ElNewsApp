import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const initDb = async () => {
  await createDb();
};

export const createDb = async () => {
  db = await SQLite.openDatabaseAsync("sources.db");

  // create a table called "Sources"
  await db.runAsync(
    "CREATE TABLE IF NOT EXISTS sources (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT)",
  );
};

export const fetchSources = async () => {
  const allSources = await db.getAllAsync("SELECT * FROM sources");

  return allSources;
};
