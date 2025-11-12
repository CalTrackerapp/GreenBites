import { NextRequest, NextResponse } from 'next/server';
import { deleteFoodLogEntry } from '@services/foodLog';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ username: string; logID: string }> }
) {
  const { username, logID } = await params;
  const result = await deleteFoodLogEntry(Number(logID), username);
  return NextResponse.json(result);
}
