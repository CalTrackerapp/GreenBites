import { NextRequest, NextResponse } from "next/server";
import { calculateCalorieHistory } from "@services/foodLog";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const history = await calculateCalorieHistory(params.username);
    return NextResponse.json({ calories: history });
  } catch (error) {
    console.error("Failed to calculate calorie history:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}