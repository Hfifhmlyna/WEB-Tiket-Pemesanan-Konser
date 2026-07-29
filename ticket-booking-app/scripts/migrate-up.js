const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const DATABASE_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL || "";

if (!DATABASE_URL) {
  console.error("Missing POSTGRES_URL or DATABASE_URL environment variable.");
  process.exit(1);
}

const isLocalhostConnection = /localhost|127\.0\.0\.1/i.test(DATABASE_URL);

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: !isLocalhostConnection ? { rejectUnauthorized: false } : false
});

const MIGRATIONS_DIR = path.join(__dirname, "..", "migrations");

function getMigrationFiles() {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((name) => /^\d+.*\.sql$/i.test(name))
    .sort();
}

async function ensureMigrationTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getAppliedMigrations(client) {
  const result = await client.query("SELECT name FROM schema_migrations");
  return new Set(result.rows.map((row) => String(row.name)));
}

async function applyMigration(client, fileName) {
  const filePath = path.join(MIGRATIONS_DIR, fileName);
  const sql = fs.readFileSync(filePath, "utf8");

  await client.query("BEGIN");
  try {
    await client.query(sql);
    await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [fileName]);
    await client.query("COMMIT");
    console.log(`Applied migration: ${fileName}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}

async function run() {
  const client = await pool.connect();

  try {
    await ensureMigrationTable(client);

    const migrationFiles = getMigrationFiles();
    if (migrationFiles.length === 0) {
      console.log("No migration files found.");
      return;
    }

    const applied = await getAppliedMigrations(client);

    for (const fileName of migrationFiles) {
      if (applied.has(fileName)) {
        console.log(`Skipped migration (already applied): ${fileName}`);
        continue;
      }

      await applyMigration(client, fileName);
    }

    console.log("Migration completed.");
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
