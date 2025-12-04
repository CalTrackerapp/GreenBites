import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../drizzle/src/db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Please add it to your .env.local file."
  );
}

// Detect if this is a Supabase connection
const isSupabase = process.env.DATABASE_URL.includes("supabase.co");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requires SSL connections
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
});

export const db = drizzle(pool, { schema });
