import { NextRequest, NextResponse } from 'next/server';
import { searchNutrition } from '@services/foods';

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  const result = await searchNutrition(query);
  return NextResponse.json(result);
}
