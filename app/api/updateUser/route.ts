import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../src/server/db";
import * as schema from "../../../drizzle/src/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, gender, height, weight, calorieGoal } = body;

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const userResult = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username))
      .limit(1);

    if (userResult.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Build update object with only provided fields
    const updateData: {
      gender?: string;
      height?: number;
      weight?: number;
      calorieGoal?: number;
    } = {};

    if (gender !== undefined) {
      updateData.gender = gender;
    }
    if (height !== undefined) {
      updateData.height = Math.round(height);
    }
    if (weight !== undefined) {
      updateData.weight = Math.round(weight);
    }
    if (calorieGoal !== undefined) {
      updateData.calorieGoal = calorieGoal;
    }

    // Update user in database
    await db
      .update(schema.users)
      .set(updateData)
      .where(eq(schema.users.username, username));

    // Return success with no body (as per requirements)
    return new NextResponse(null, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    const err = error as { code?: string; message?: string };

    return NextResponse.json(
      { error: err.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

