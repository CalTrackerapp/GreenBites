import { NextRequest, NextResponse } from 'next/server';
import { deleteFoodLogEntry } from '@/services/foodLog';

export async function DELETE(req: NextRequest, { params }: { params: { username: string, logID: string } }) {
  const result = await deleteFoodLogEntry(Number(params.logID), params.username);
  return NextResponse.json(result);
}
