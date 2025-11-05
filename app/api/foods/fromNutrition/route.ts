import { NextRequest, NextResponse } from 'next/server';
import { createFoodFromNutrition } from '@services/foods';

export async function POST(req: NextRequest) {
  const { nutritionData, userID } = await req.json();
  const result = await createFoodFromNutrition(nutritionData, userID);
  return NextResponse.json(result);
}
