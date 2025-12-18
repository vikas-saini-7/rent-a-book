const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
require("dotenv/config");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase
});

// Handle pool errors
pool.on("error", (err) => {
  console.error("❌ Unexpected database pool error:", err.message);
});

// Test database connection on startup
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");
    client.release();
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error("   Message:", err.message);

    if (err.code === "ENOTFOUND") {
      console.error("   Fix: Check your DATABASE_URL hostname in .env file");
    } else if (err.message.includes("Tenant or user not found")) {
      console.error(
        "   Fix: Use session mode connection string with ?pgbouncer=true"
      );
    } else if (err.code === "ECONNREFUSED") {
      console.error(
        "   Fix: Database server is not running or port is incorrect"
      );
    } else if (err.message.includes("password authentication failed")) {
      console.error("   Fix: Check your database username and password");
    }

    console.error("\n⚠️  Server will start but database operations will fail");
  }
};

testConnection();

const db = drizzle(pool);

module.exports = { db, pool };
