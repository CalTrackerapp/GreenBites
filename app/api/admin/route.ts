import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

// Example: Insert a privileged row (bypasses RLS)
export async function POST(request: Request) {
  const { data, error } = await supabaseAdmin
    .from('foods')
    .insert([{ name: 'Privileged Food', calories: 100 }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
