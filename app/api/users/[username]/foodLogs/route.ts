import { NextRequest, NextResponse } from 'next/server';
import { getAllFoodLogs, createFoodLogEntry } from '@services/foodLog';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const foodLogs = await getAllFoodLogs(params.username);
  return NextResponse.json(foodLogs);
}

export async function POST(req: NextRequest, { params }: { params: { username: string } }) {
  const body = await req.json();
  const newFoodLog = await createFoodLogEntry(body);
  return NextResponse.json(newFoodLog);
}