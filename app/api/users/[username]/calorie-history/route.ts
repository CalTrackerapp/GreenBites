import { NextRequest, NextResponse } from 'next/server';
import { calculateTodayTotals } from '@services/foodLog';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const body = await req.json();
    const { date } = body;

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const totals = await calculateTodayTotals(username, date);
    
    return NextResponse.json({
      date,
      ...totals,
    });
  } catch (error) {
    console.error('Error calculating calorie history:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to calculate calorie history';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

