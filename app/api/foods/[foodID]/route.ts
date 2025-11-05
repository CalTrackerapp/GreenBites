import { NextRequest, NextResponse } from 'next/server';
import { getFood, deleteFood } from '@services/foods';

export async function GET(req: NextRequest, { params }: { params: { foodID: string } }) {
  const food = await getFood(params.foodID);
  return NextResponse.json(food);
}

export async function DELETE(req: NextRequest, { params }: { params: { foodID: string } }) {
  const result = await deleteFood(params.foodID);
  return NextResponse.json(result);
}

