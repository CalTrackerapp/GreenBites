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
        totalSodium: 0,
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

export async function updateUser(username: string, data: Partial<UserData>) {
  const updateData: any = {};
  
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.height !== undefined) updateData.height = data.height;
  if (data.weight !== undefined) updateData.weight = data.weight;
  if (data.calGoal !== undefined) updateData.calGoal = data.calGoal;
  
  // Recalculate BMI if height or weight changed
  if (data.height !== undefined && data.weight !== undefined) {
    updateData.bmi = calculateBMI(data.weight, data.height);
  } else if (data.height !== undefined || data.weight !== undefined) {
    // Get current user to calculate BMI with existing values
    const currentUser = await getUser(username);
    if (currentUser) {
      const height = data.height !== undefined ? data.height : currentUser.height;
      const weight = data.weight !== undefined ? data.weight : currentUser.weight;
      if (height && weight) {
        updateData.bmi = calculateBMI(weight as number, height as number);
      }
    }
  }
  
  const result = await db.update(schema.users)
    .set(updateData)
    .where(eq(schema.users.username, username))
    .returning();
  
  return result[0];
}