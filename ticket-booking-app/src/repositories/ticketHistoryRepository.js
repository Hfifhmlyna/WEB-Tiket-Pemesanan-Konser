const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const MAX_HISTORY_ITEMS = 1000;
const DEFAULT_DATA_DIR = path.join(__dirname, "..", "..", "data");
const SERVERLESS_TMP_DIR = path.join("/tmp", "ticket-booking-app-data");
const DATA_DIR = process.env.VERCEL ? SERVERLESS_TMP_DIR : DEFAULT_DATA_DIR;
const DATA_FILE_PATH = path.join(DATA_DIR, "ticket-history.json");

const DATABASE_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
const USE_POSTGRES = Boolean(DATABASE_URL);

let pool = null;
let schemaReadyPromise = null;
let inMemoryHistory = [];

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function getPool() {
  if (!pool) {
    const isLocalhostConnection = /localhost|127\.0\.0\.1/i.test(DATABASE_URL);
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: USE_POSTGRES && !isLocalhostConnection ? { rejectUnauthorized: false } : false
    });
  }

  return pool;
}

async function ensurePostgresSchema() {
  if (!USE_POSTGRES) {
    return false;
  }

  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      const client = await getPool().connect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS ticket_history (
            id BIGSERIAL PRIMARY KEY,
            order_id TEXT NOT NULL,
            owner_username TEXT NOT NULL,
            status TEXT NOT NULL,
            issued_at TIMESTAMPTZ NOT NULL,
            buyer JSONB NOT NULL DEFAULT '{}'::jsonb,
            items JSONB NOT NULL DEFAULT '[]'::jsonb,
            total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          )
        `);

        await client.query(`
          CREATE UNIQUE INDEX IF NOT EXISTS ticket_history_owner_order_idx
          ON ticket_history (owner_username, order_id)
        `);
      } finally {
        client.release();
      }
    })();
  }

  await schemaReadyPromise;
  return true;
}

function sortByIssuedAtDesc(history) {
  return [...history].sort((ticketA, ticketB) => {
    const timeA = new Date(ticketA.issuedAt || 0).getTime();
    const timeB = new Date(ticketB.issuedAt || 0).getTime();
    return timeB - timeA;
  });
}

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, "[]", "utf8");
    }

    return true;
  } catch (error) {
    return false;
  }
}

function readFileHistory() {
  const canUseFileStore = ensureStoreFile();
  if (!canUseFileStore) {
    return Array.isArray(inMemoryHistory) ? inMemoryHistory : [];
  }

  try {
    const raw = fs.readFileSync(DATA_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    const history = Array.isArray(parsed) ? parsed : [];
    inMemoryHistory = history;
    return history;
  } catch (error) {
    return Array.isArray(inMemoryHistory) ? inMemoryHistory : [];
  }
}

function writeFileHistory(history) {
  inMemoryHistory = Array.isArray(history) ? history : [];

  const canUseFileStore = ensureStoreFile();
  if (!canUseFileStore) {
    return;
  }

  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(inMemoryHistory, null, 2), "utf8");
  } catch (error) {
    // Fall back to in-memory store only.
  }
}

function buildTicketKey(ticket) {
  return `${normalizeUsername(ticket.ownerUsername)}|${ticket.orderId}`;
}

function upsertTicketInFileStore(ticket) {
  const history = readFileHistory();
  const key = buildTicketKey(ticket);
  const nextHistory = [ticket, ...history.filter((entry) => buildTicketKey(entry) !== key)].slice(
    0,
    MAX_HISTORY_ITEMS
  );

  writeFileHistory(nextHistory);
}

function listFileStoreByOwner(ownerUsername) {
  const normalizedOwner = normalizeUsername(ownerUsername);

  return sortByIssuedAtDesc(
    readFileHistory().filter(
      (ticket) => normalizeUsername(ticket.ownerUsername) === normalizedOwner
    )
  );
}

function mapDbRowToTicket(row) {
  return {
    orderId: String(row.order_id || ""),
    ownerUsername: normalizeUsername(row.owner_username || ""),
    status: String(row.status || "PAID"),
    issuedAt: row.issued_at ? new Date(row.issued_at).toISOString() : new Date().toISOString(),
    buyer: row.buyer && typeof row.buyer === "object" ? row.buyer : {},
    items: Array.isArray(row.items) ? row.items : [],
    totalAmount: Number(row.total_amount || 0)
  };
}

async function upsertTicketHistory(ticket) {
  if (!USE_POSTGRES) {
    upsertTicketInFileStore(ticket);
    return;
  }

  try {
    await ensurePostgresSchema();

    await getPool().query(
      `
        INSERT INTO ticket_history (
          order_id,
          owner_username,
          status,
          issued_at,
          buyer,
          items,
          total_amount
        )
        VALUES ($1, $2, $3, $4::timestamptz, $5::jsonb, $6::jsonb, $7)
        ON CONFLICT (owner_username, order_id)
        DO UPDATE SET
          status = EXCLUDED.status,
          issued_at = EXCLUDED.issued_at,
          buyer = EXCLUDED.buyer,
          items = EXCLUDED.items,
          total_amount = EXCLUDED.total_amount,
          updated_at = NOW()
      `,
      [
        ticket.orderId,
        normalizeUsername(ticket.ownerUsername),
        ticket.status,
        ticket.issuedAt,
        JSON.stringify(ticket.buyer || {}),
        JSON.stringify(ticket.items || []),
        Number(ticket.totalAmount || 0)
      ]
    );
  } catch (error) {
    upsertTicketInFileStore(ticket);
  }
}

async function listTicketHistoryByOwner(ownerUsername) {
  if (!USE_POSTGRES) {
    return listFileStoreByOwner(ownerUsername);
  }

  try {
    await ensurePostgresSchema();

    const result = await getPool().query(
      `
        SELECT
          order_id,
          owner_username,
          status,
          issued_at,
          buyer,
          items,
          total_amount
        FROM ticket_history
        WHERE owner_username = $1
        ORDER BY issued_at DESC
        LIMIT $2
      `,
      [normalizeUsername(ownerUsername), MAX_HISTORY_ITEMS]
    );

    return result.rows.map(mapDbRowToTicket);
  } catch (error) {
    return listFileStoreByOwner(ownerUsername);
  }
}

module.exports = {
  listTicketHistoryByOwner,
  upsertTicketHistory
};
