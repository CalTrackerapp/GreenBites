// Import the database instance and schema from the main file
import { db } from "../index.ts"; 
import * as schema from "../db/schema.ts";
import { eq } from 'drizzle-orm'; 

function calculateBMI(weightInPounds: number, heightInInches: number): number {
  if (heightInInches === 0) throw new Error("Height cannot be zero.");
  return (weightInPounds * 703) / (heightInInches ** 2);
}


type UserData = {

    name: string;
    gender: string;
    height: number;
    weight: number;
    calGoal: number;
};


export async function getAllUsers() {
  return await db.select().from(schema.users);
}

export async function createUser(data: UserData) {

    const bmi = calculateBMI(data.weight, data.height);
    const result = await db.insert(schema.users).values({
        username: data.name,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        bmi,
        totalCalories: 0,
        totalProtein: 0,
        totalCarb: 0,
        totalFats: 0,
        totalCO2Expense: 0,
        calGoal: data.calGoal,
    } as any).returning();

    return result;
}

export async function deleteUser(username: string) {
  return await db.delete(schema.users).where(eq(schema.users.username, username));
}

export async function getUser(username: string) {
  // Use .limmit(1) and then grab the first element
  const result = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1);
  return result[0]; // Return the single user object or undefined
}