import { NextRequest, NextResponse } from 'next/server';
import { getAllFoodLogs, createFoodLogEntry } from '@services/foodLog';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const foodLogs = await getAllFoodLogs(username);
  return NextResponse.json(foodLogs);
}



export async function POST(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const body = await req.json();

    const foodLogData = {
      name: body.name,
      date: body.date,
      servingSize: body.servingSize,
      calories: body.calories,
      proteinInGrams: body.proteinInGrams,
      carbsInGrams: body.carbsInGrams,
      fatInGrams: body.fatInGrams,
      sodiumInMg: body.sodiumInMg,
      CO2Expense: body.CO2Expense,
    };

    // Call your service with (userID, data)
    const newFoodLog = await createFoodLogEntry(username, foodLogData);

    return NextResponse.json(newFoodLog);
  } catch (error) {
    console.error("Error creating food log:", error);
    return NextResponse.json(
      { error: "Failed to create food log entry" },
      { status: 500 }
    );
  }
}

