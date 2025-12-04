import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/schema.ts";
import dotenv from "dotenv";
import { eq } from 'drizzle-orm';

// Load environment variables (Next.js loads them automatically, but this helps for other contexts)
dotenv.config();

// Lazy initialization of database connection
let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;
let _connectionTested = false;

// Test database connection
async function testConnection() {
  if (!_pool || _connectionTested) return;
  
  try {
    const client = await _pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    client.release();
    
    console.log('✅ Database connection successful!');
    console.log('📅 Current database time:', result.rows[0].current_time);
    console.log('🐘 PostgreSQL version:', result.rows[0].pg_version.split(',')[0]);
    console.log('🔗 Connected to Supabase database');
    
    _connectionTested = true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL environment variable is not set. Please create a .env.local file with your database connection string.\n' +
      'Example: DATABASE_URL=postgresql://user:password@localhost:5432/dbname\n' +
      'See DATABASE_SETUP.md for detailed instructions.'
    );
  }

  if (!_pool) {
    const connectionString = process.env.DATABASE_URL;
    
    // Detect if this is a Supabase connection
    const isSupabase = connectionString?.includes('supabase.co');
    
    console.log('🔌 Initializing database connection...');
    console.log('📍 Connection string:', connectionString.replace(/:[^:@]+@/, ':****@')); // Hide password
    
    _pool = new Pool({
      connectionString: connectionString,
      // Supabase requires SSL connections
      ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
    });
    _db = drizzle(_pool, { schema });
    
    // Test connection asynchronously (don't block initialization)
    testConnection().catch(err => {
      console.error('⚠️ Connection test failed:', err);
    });
  }

  return _db!;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    return getDatabase()[prop as keyof ReturnType<typeof drizzle>];
  }
});


//functions to interact with the database
export async function getAllUsers() {
  return await db.select().from(schema.users);
}

export async function createUser(data: { name: string }) {
  // map `name` to the schema field `username`
  return await db.insert(schema.users).values({ username: data.name });
}

export async function deleteUser(username: string) {
  return await db.delete(schema.users).where(eq(schema.users.username, username));
}

export async function getUser(username: string) {
  return await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1);
}

export async function logFoodEntry(data: { userID: string; foodID: string; servingSize: number }) {
  return await db.insert(schema.foodLog).values({
    userID: data.userID,
    foodID: data.foodID,
    servingSize: data.servingSize,
    //loggedAt: new Date(), skipped, as the schema defaults it to now
  });
}