import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../lib/supabaseServer';

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('foods').select('*').limit(5);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
