import Database from "better-sqlite3";

const db = new Database("./data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_url TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    hits INTEGER DEFAULT 0
  );
`);

export default db;
