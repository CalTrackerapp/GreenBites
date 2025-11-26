import { createClient } from '@supabase/supabase-js';
import { getAuth } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';

export function createSupabaseServerClient() {
  const { getToken } = getAuth(cookies());
  const jwt = getToken();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : undefined,
        },
      },
    }
  );
}
