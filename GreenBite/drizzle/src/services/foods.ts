import { db } from "../index.ts"; 
import * as schema from "../db/schema.ts";
import { eq } from 'drizzle-orm'; 

type FoodData = {

    foodID: string;
    name: string;
    calories: number;
    fatInGrams: number;
    proteinInGrams: number;
    carbsInGrams: number;
    CO2Expense: number;
};


export async function getAllFoods() {
  return await db.select().from(schema.foods);
}

export async function createFood(data: FoodData) {

    // only insert if a food with the same foodID doesn't already exist
    const existing = await db.select().from(schema.foods).where(eq(schema.foods.foodID, data.foodID));
    if (existing.length > 0) {
      // return the existing row (or change to return null if you prefer)
      return existing[0];
    }

    const result = await db.insert(schema.foods).values({
        foodID: data.foodID,
        name: data.name,
        calories: data.calories,
        fatInGrams: data.fatInGrams,
        proteinInGrams: data.proteinInGrams,
        carbsInGrams: data.carbsInGrams,
        CO2Expense: data.CO2Expense,
    }).returning();

    return result[0];
}

export async function deleteFood(foodID: string) {
  return await db.delete(schema.foods).where(eq(schema.foods.foodID, foodID));
}