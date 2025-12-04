import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../src/server/db";
import * as schema from "../../../drizzle/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      username,
      name,
      date,
      calories,
      proteinInGrams,
      carbsInGrams,
      fatInGrams,
      sodiumInMg,
      CO2Expense,
    } = body;

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Food name is required" },
        { status: 400 }
      );
    }

    // Insert food log entry
    await db.insert(schema.foodLog).values({
      userID: username,
      name: name,
      servingSize: 1, // Default to 1 serving if not provided
      loggedAt: date,
      calories: calories || null,
      protein: proteinInGrams || null,
      carbs: carbsInGrams || null,
      fats: fatInGrams || null,
      sodium: sodiumInMg || null,
      carbonFootPrintValue: CO2Expense || null,
    });

    // Get current user totals
    const userResult = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username))
      .limit(1);

    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult[0];

    // Update user totals by adding the new food log values
    await db
      .update(schema.users)
      .set({
        totalCalories: (user.totalCalories || 0) + (calories || 0),
        totalProtein: (user.totalProtein || 0) + (proteinInGrams || 0),
        totalCarbs: (user.totalCarbs || 0) + (carbsInGrams || 0),
        totalFats: (user.totalFats || 0) + (fatInGrams || 0),
        totalSodium: (user.totalSodium || 0) + (sodiumInMg || 0),
        totalCarbonFootPrint:
          (user.totalCarbonFootPrint || 0) + (CO2Expense || 0),
      })
      .where(eq(schema.users.username, username));

    // Return success with no body (as per requirements)
    return new NextResponse(null, { status: 200 });
  } catch (error: unknown) {
    console.error("Error adding food log:", error);
    const err = error as { code?: string; message?: string };

    // Handle foreign key constraint error (user doesn't exist)
    if (err.code === "23503") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: err.message || "Failed to add food log" },
      { status: 500 }
    );
  }
}
