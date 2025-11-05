import { NextRequest, NextResponse } from 'next/server';
import { getFood, createFood } from '@services/foods';

export async function GET(req: NextRequest, { params }: { params: { foodID: string } }) {
  const food = await getFood(params.foodID);
  return NextResponse.json(food);
}


export async function POST(req: NextRequest) {
  const body = await req.json();
  const newFood = await createFood(body);
  return NextResponse.json(newFood);
}
