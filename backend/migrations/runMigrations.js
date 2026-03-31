import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  try {
    console.log("🚀 Starting database migrations...");

    // Read the init.sql file
    const sqlFile = path.join(__dirname, "../init.sql");
    const sql = fs.readFileSync(sqlFile, "utf-8");

    // Execute the SQL
    await pool.query(sql);
    console.log("✅ Database tables created successfully!");

    // Close the connection
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
