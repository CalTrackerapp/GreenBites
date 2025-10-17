import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/schema.ts";
import dotenv from "dotenv";
import { eq } from 'drizzle-orm';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });


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