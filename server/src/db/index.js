const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
require("dotenv/config");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL not set");
}

// Log redacted URL
const redacted = connectionString.replace(/:([^:@]+)@/, ":***@");
console.log("🔗 Using connection string:", redacted);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // needed for Supabase on Node 22
});

pool.on("error", (err) => {
  console.error("❌ Unexpected database pool error:", err.message);
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");
    client.release();
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error("   Message:", err.message);
    console.error("\n⚠️  Server will start but database operations will fail");
  }
};

testConnection();

const db = drizzle(pool);
module.exports = { db, pool };
