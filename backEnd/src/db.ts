import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./users.db",
    driver: sqlite3.Database,
  });
}

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      phone TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      course TEXT NOT NULL
    )
  `);
  return db;
}
