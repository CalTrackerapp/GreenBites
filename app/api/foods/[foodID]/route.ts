import { NextRequest, NextResponse } from 'next/server';
import { getFood, deleteFood } from '@services/foods';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ foodID: string }> }
) {
  const { foodID } = await params;
  const food = await getFood(foodID);
  if (!food) {
    return NextResponse.json({ error: 'Food not found' }, { status: 404 });
  }
  return NextResponse.json(food);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ foodID: string }> }
) {
  const { foodID } = await params;
  const result = await deleteFood(foodID);
  return NextResponse.json(result);
}

