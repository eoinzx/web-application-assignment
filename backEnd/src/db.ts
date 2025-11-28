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
      username TEXT NOT NULL UNIQUE,
      phone TEXT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      job_id TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      titl TEXT NOT NULL,
      desc TEXT NOT NULL,
      salary TEXT NULL
    )
  `);
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS timetables (
      id TEXT PRIMARY KEY,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      starting TEXT NOT NULL,
      ending TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS boats (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      captainName TEXT NOT NULL,
      company TEXT NOT NULL,
      arrival TEXT NOT NULL,
      departure TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS containers (
      id TEXT PRIMARY KEY,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      value TEXT NOT NULL,
      droppedOff TEXT NOT NULL,
      leaving TEXT NOT NULL,
      shippedIn_id TEXT NOT NULL,
      shippedOut_id TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS userTimetables (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      timetable_id TEXT NOT NULL
    )
  `);
  return db;
}
