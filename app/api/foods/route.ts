import { NextRequest, NextResponse } from 'next/server';
import { getAllFoods, createFood } from '@services/foods';

export async function GET(req: NextRequest) {
  const foods = await getAllFoods();
  return NextResponse.json(foods);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newFood = await createFood(body);
  return NextResponse.json(newFood);
}
