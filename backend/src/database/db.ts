import path from "node:path";

import Database from "better-sqlite3";

let db: Database.Database | null = null;

export function getDb() {
  if (db) return db;

  const dbPath =
    process.env.SQLITE_PATH ??
    path.join(process.cwd(), "data", "expenses.sqlite3");

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}

export function initDb() {
  const database = getDb();

  database.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      currency VARCHAR(3) NOT NULL DEFAULT 'INR',
      category VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      merchant VARCHAR(100),
      original_input TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

