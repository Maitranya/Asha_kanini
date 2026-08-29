// Minimal migration runner — runs every .sql file in /migrations in order.
// For a project this size, a full migration framework (knex, prisma migrate,
// node-pg-migrate) is overkill; this keeps things dependency-light.
// Swap in one of those tools later if the schema grows.

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === "false" ? false : { rejectUnauthorized: false },
});

async function run() {
  const dir = path.join(__dirname, "..", "migrations");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();

  for (const file of files) {
    console.log(`Running migration: ${file}`);
    const sql = fs.readFileSync(path.join(dir, file), "utf8");
    await pool.query(sql);
  }

  console.log("Migrations complete.");
  await pool.end();
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
