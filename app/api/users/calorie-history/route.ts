import { NextRequest, NextResponse } from "next/server";
import { calculateCalorieHistoryByDate } from "@services/foodLog";

export async function POST(req: NextRequest) {
  try {
    const { username, date } = await req.json();

    if (!username || !date) {
      return NextResponse.json({ error: "Missing username or date" }, { status: 400 });
    }

    const result = await calculateCalorieHistoryByDate(username, date);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to calculate calorie history:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}