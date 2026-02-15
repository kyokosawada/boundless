import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "bookings.db");
let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT UNIQUE NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INTEGER NOT NULL,
        serviceType TEXT NOT NULL,
        pickupDate TEXT NOT NULL,
        pickupTime TEXT NOT NULL,
        pickupType TEXT NOT NULL,
        pickupAddress TEXT NOT NULL,
        dropoffType TEXT NOT NULL,
        dropoffAddress TEXT NOT NULL,
        stops TEXT DEFAULT '[]',
        passengers INTEGER NOT NULL,
        distance TEXT,
        duration TEXT,
        createdAt TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (customerId) REFERENCES customers(id)
      );
    `);
  }
  return db;
}

export default getDb;
