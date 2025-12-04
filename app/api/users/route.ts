import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../src/server/db";
import * as schema from "../../../drizzle/src/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, gender, height, weight } = body;

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Convert height if it's in feet format (e.g., 5.8 = 5 feet 8 inches = 68 inches)
    // If height is already an integer, use it as-is
    let heightInches = height;
    if (typeof height === "number" && height < 10) {
      // Assume it's in feet.inches format (e.g., 5.8 = 5'8" = 68 inches)
      const feet = Math.floor(height);
      const inches = Math.round((height - feet) * 10);
      heightInches = feet * 12 + inches;
    }

    // Insert user into database
    await db.insert(schema.users).values({
      username,
      gender: gender?.toLowerCase() || null,
      height: Math.round(heightInches),
      weight: Math.round(weight) || null,
      bmi: 0,
      calorieGoal: 2500,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      totalSodium: 0,
      totalCarbonFootPrint: 0,
    });

    // Return success with no body (as per requirements)
    return new NextResponse(null, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    const err = error as { code?: string; message?: string };

    // Handle duplicate username error
    if (err.code === "23505") {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Failed to create user" },
      { status: 500 }
    );
  }
}
