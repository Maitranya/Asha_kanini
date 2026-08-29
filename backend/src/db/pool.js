const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Most managed Postgres providers (Render, Railway, Supabase) require SSL
  // in production but not in local dev.
  ssl: process.env.PGSSL === "false" ? false : { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle Postgres client", err);
});

module.exports = pool;