import { NextRequest, NextResponse } from 'next/server';
import { createFoodFromNutrition } from '@services/foods';

export async function POST(req: NextRequest) {
  try {
    const { nutritionData, userID } = await req.json();
    
    if (!nutritionData) {
      return NextResponse.json(
        { error: 'nutritionData is required' },
        { status: 400 }
      );
    }
    
    if (!userID) {
      return NextResponse.json(
        { error: 'userID is required' },
        { status: 400 }
      );
    }
    
    const result = await createFoodFromNutrition(nutritionData, userID);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating food from nutrition:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create food entry';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
