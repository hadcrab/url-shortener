import Database from "better-sqlite3";

const db = new Database("./data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    target_url TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
