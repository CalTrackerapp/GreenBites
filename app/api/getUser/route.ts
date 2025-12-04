import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../src/server/db";
import * as schema from "../../../drizzle/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username } = body;

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Query user from database
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username))
      .limit(1);

    // Check if user exists
    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result[0];

    // Query all food logs for this user
    const foodLogs = await db
      .select()
      .from(schema.foodLog)
      .where(eq(schema.foodLog.userID, username));

    // Group food logs by date and calculate totals for each date
    const calorieHistoryMap = new Map<
      string,
      {
        caloriesToday: number;
        proteinToday: number;
        carbsToday: number;
        fatsToday: number;
        sodiumToday: number;
        carbonFootPrintToday: number;
      }
    >();

    // Process each food log entry
    for (const log of foodLogs) {
      // Extract date from loggedAt (stored as varchar in yyyy-mm-dd format)
      if (!log.loggedAt) {
        continue;
      }

      // loggedAt is a string in yyyy-mm-dd format, but handle timestamp format if present
      const date = log.loggedAt.split("T")[0]; // Extract date part (handles both "2025-02-10" and "2025-02-10T00:00:00Z")

      // Initialize date entry if it doesn't exist
      if (!calorieHistoryMap.has(date)) {
        calorieHistoryMap.set(date, {
          caloriesToday: 0,
          proteinToday: 0,
          carbsToday: 0,
          fatsToday: 0,
          sodiumToday: 0,
          carbonFootPrintToday: 0,
        });
      }

      // Add values to the date entry
      const dayTotals = calorieHistoryMap.get(date)!;
      dayTotals.caloriesToday += log.calories || 0;
      dayTotals.proteinToday += log.protein || 0;
      dayTotals.carbsToday += log.carbs || 0;
      dayTotals.fatsToday += log.fats || 0;
      dayTotals.sodiumToday += log.sodium || 0;
      dayTotals.carbonFootPrintToday += log.carbonFootPrintValue || 0;
    }

    // Convert map to array and sort by date (newest first)
    const calorieHistory = Array.from(calorieHistoryMap.entries())
      .map(([date, totals]) => ({
        date,
        caloriesToday: totals.caloriesToday,
        proteinToday: totals.proteinToday,
        carbsToday: totals.carbsToday,
        fatsToday: totals.fatsToday,
        sodiumToday: totals.sodiumToday,
        carbonFootPrintToday: totals.carbonFootPrintToday,
      }))
      .sort((a, b) => b.date.localeCompare(a.date)); // Sort descending (newest first)

    // Return user data with all aggregated totals and calorie history
    return NextResponse.json({
      username: user.username,
      gender: user.gender || null,
      height: user.height || null,
      weight: user.weight || null,
      bmi: user.bmi || 0,
      calorieGoal: user.calorieGoal || 2500,
      totalCalories: user.totalCalories || 0,
      totalProtein: user.totalProtein || 0,
      totalCarbs: user.totalCarbs || 0,
      totalFats: user.totalFats || 0,
      totalSodium: user.totalSodium || 0,
      totalCarbonFootPrint: user.totalCarbonFootPrint || 0,
      calorieHistory: calorieHistory,
    });
  } catch (error: unknown) {
    console.error("Error getting user:", error);
    const err = error as { code?: string; message?: string };

    return NextResponse.json(
      { error: err.message || "Failed to get user" },
      { status: 500 }
    );
  }
}
