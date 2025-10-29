import { Pool } from "pg";
import * as schema from "./db/schema.ts";
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
    $client: Pool;
};
export declare function getAllUsers(): Promise<{
    username: string;
    gender: string | null;
    height: number | null;
    weight: number | null;
    bmi: string | null;
    totalCalories: number | null;
    totalProtein: number | null;
    totalCarb: number | null;
    totalFats: number | null;
    totalCO2Expense: number | null;
    calGoal: number | null;
}[]>;
export declare function createUser(data: {
    name: string;
}): Promise<import("pg").QueryResult<never>>;
export declare function deleteUser(username: string): Promise<import("pg").QueryResult<never>>;
export declare function getUser(username: string): Promise<{
    username: string;
    gender: string | null;
    height: number | null;
    weight: number | null;
    bmi: string | null;
    totalCalories: number | null;
    totalProtein: number | null;
    totalCarb: number | null;
    totalFats: number | null;
    totalCO2Expense: number | null;
    calGoal: number | null;
}[]>;
export declare function logFoodEntry(data: {
    userID: string;
    foodID: string;
    servingSize: number;
}): Promise<import("pg").QueryResult<never>>;
