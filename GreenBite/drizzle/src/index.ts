import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/schema.ts";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export async function getAllUsers() {
  return await db.select().from(schema.users);
}

export async function createUser(data: { name: string }) {
  // map `name` to the schema field `username`
  return await db.insert(schema.users).values({ username: data.name });
}
