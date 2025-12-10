import { db } from "../index.ts"; 
import * as schema from "../db/schema.ts";
import { eq } from 'drizzle-orm';
import axios from 'axios'; 

type FoodData = {

    foodID: string;
    name: string;
    calories: number;
    fatInGrams: number;
    proteinInGrams: number;
    carbsInGrams: number;
    sodiumInMg: number;
    CO2Expense: number;
};


export async function getAllFoods() {
  return await db.select().from(schema.foods);
}

export async function getFood(id: string) {
  const result = await db.select().from(schema.foods).where(eq(schema.foods.foodID, id)).limit(1);
  return result[0]; // Return the single food object or undefined
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
        sodiumInMg: data.sodiumInMg,
        CO2Expense: data.CO2Expense,
    }).returning();

    return result[0];
}

export async function deleteFood(foodID: string) {
  return await db.delete(schema.foods).where(eq(schema.foods.foodID, foodID));
}

// Nutrition API integration
const NUTRITION_API_KEY = '3E9YfbcWaIFwspwgXs5oVg==vyJeVpWtQfKfjOkZ';
const NUTRITION_API_URL = 'https://api.calorieninjas.com/v1/nutrition';

export type NutritionAPIResponse = {
  items: Array<{
    name: string;
    calories: number;
    serving_size_g: number;
    fat_total_g: number;
    fat_saturated_g: number;
    protein_g: number;
    sodium_mg: number;
    potassium_mg: number;
    cholesterol_mg: number;
    carbohydrates_total_g: number;
    fiber_g: number;
    sugar_g: number;
  }>;
};

export async function searchNutrition(query: string): Promise<NutritionAPIResponse> {
  try {
    const response = await axios.get(NUTRITION_API_URL, {
      params: { query },
      headers: {
        'X-Api-Key': NUTRITION_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Nutrition API error:', error);
    throw new Error('Failed to fetch nutrition data');
  }
}

// Helper function to safely convert to integer, defaulting to 0 if invalid
function safeRound(value: number | undefined | null): number {
  if (value === undefined || value === null || isNaN(value)) {
    return 0;
  }
  return Math.round(value);
}

export async function createFoodFromNutrition(nutritionData: NutritionAPIResponse['items'][0], userID: string): Promise<any> {
  // Generate a unique foodID
  const foodID = `${nutritionData.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
  
  // Calculate CO2Expense (placeholder - you'll need to implement carbon footprint calculation)
  const CO2Expense = safeRound(nutritionData.calories * 0.1); // Placeholder calculation
  
  const foodData: FoodData = {
    foodID,
    name: nutritionData.name,
    calories: safeRound(nutritionData.calories),
    fatInGrams: safeRound(nutritionData.fat_total_g),
    proteinInGrams: safeRound(nutritionData.protein_g),
    carbsInGrams: safeRound(nutritionData.carbohydrates_total_g),
    sodiumInMg: safeRound(nutritionData.sodium_mg),
    CO2Expense
  };
  
  return await createFood(foodData);
}