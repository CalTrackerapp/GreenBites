import { db } from "../index.ts"; 
import * as schema from "../db/schema.ts";
import { eq } from 'drizzle-orm'; 
//data retrieved from each method assumes that the foodID and userID provided exist in their respective tables from the API calls

type FoodLogData = { // data type for creating a food log entry
    logID: number;
    userID: string;
    foodID: string;
    servingSize: number;
};

async function calculateCalories(foodID: string, servingSize: number): Promise<number> { //returns total calories for the serving size
    const food = await db.select().from(schema.foods).where(eq(schema.foods.foodID, foodID)).limit(1);

    if (food.length === 0) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }

    const first = food[0];
    if (!first) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }

    if (first.calories == null) {
        throw new Error(`Calories value for food ID "${foodID}" is missing.`);
    }

    return first.calories * servingSize;
}

async function calculateProtein(foodID: string, servingSize: number): Promise<number> { // returns protein in grams
    const food = await db.select().from(schema.foods).where(eq(schema.foods.foodID, foodID)).limit(1);
    if (food.length === 0) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }   
    const first = food[0];
    if (!first) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }   
    if (first.proteinInGrams == null) {
        throw new Error(`Protein value for food ID "${foodID}" is missing.`);
    }   
    return first.proteinInGrams * servingSize;
}

async function calculateCarbs(foodID: string, servingSize: number): Promise<number> { // returns carbs in grams
    const food = await db.select().from(schema.foods).where(eq(schema.foods.foodID, foodID)).limit(1);
    if (food.length === 0) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }   
    const first = food[0];
    if (!first) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    } 
    if (first.carbsInGrams == null) {
        throw new Error(`Carbs value for food ID "${foodID}" is missing.`);
    }
    return first.carbsInGrams * servingSize;
}

async function calculateFats(foodID: string, servingSize: number): Promise<number> { // returns fats in grams
    const food = await db.select().from(schema.foods).where(eq(schema.foods.foodID, foodID)).limit(1);
    if (food.length === 0) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }
    const first = food[0];
    if (!first) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }
    if (first.fatInGrams == null) {
        throw new Error(`Fats value for food ID "${foodID}" is missing.`);
    }
    return first.fatInGrams * servingSize;
}

async function calculateCO2Expense(foodID: string, servingSize: number): Promise<number> { // returns CO2Expense
    const food = await db.select().from(schema.foods).where(eq(schema.foods.foodID, foodID)).limit(1);
    if (food.length === 0) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }
    const first = food[0];
    if (!first) {
        throw new Error(`Food with ID "${foodID}" not found.`);
    }
    if (first.CO2Expense == null) {
        throw new Error(`CO2Expense value for food ID "${foodID}" is missing.`);
    }
    return first.CO2Expense * servingSize;
}

export async function getAllFoodLogs() { // returns all food log entries
  return await db.select().from(schema.foodLog);
}

export async function createFoodLogEntry(data: FoodLogData) { // creates a new food log entry

    const result = await db.insert(schema.foodLog).values({
        logID: data.logID,
        userID: data.userID,
        foodID: data.foodID,
        servingSize: data.servingSize,
    }).returning(); 

    await alterUserTotals(
        data.userID,
        await calculateCalories(data.foodID, data.servingSize),
        await calculateProtein(data.foodID, data.servingSize),
        await calculateCarbs(data.foodID, data.servingSize),
        await calculateFats(data.foodID, data.servingSize),
        await calculateCO2Expense(data.foodID, data.servingSize)
    );

    return result;
}

export async function deleteFoodLogEntry(logID: number) { // deletes a food log entry by logID
  return await db.delete(schema.foodLog).where(eq(schema.foodLog.logID, logID));
}

export async function alterUserTotals(username: string, calories: number, protein: number, carbs: number, fats: number, totalCO2Expense: number) { // updates user's total nutritional values
    await db.update(schema.users)
    .set({
      totalCalories: calories,
      totalProtein: protein,
      totalCarb: carbs,
      totalFats: fats,
      totalCO2Expense: totalCO2Expense,
    })
    .where(eq(schema.users.username, username));

}