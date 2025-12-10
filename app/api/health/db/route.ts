import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'DATABASE_URL is not set',
        instructions: [
          'Create a .env.local file in the project root',
          'Add: DATABASE_URL=postgresql://user:password@host:5432/database',
          'Get a free database from: https://neon.tech or https://supabase.com',
          'See DATABASE_SETUP.md for detailed instructions',
        ],
      },
      { status: 503 }
    );
  }

  try {
    // Detect if this is a Supabase connection
    const isSupabase = DATABASE_URL.includes('supabase.co');
    
    const pool = new Pool({
      connectionString: DATABASE_URL,
      connectionTimeoutMillis: 10000,
      // Supabase requires SSL connections
      ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
    });

    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    await pool.end();

    return NextResponse.json({
      status: 'ok',
      message: 'Database connection successful',
    });
  } catch (error: unknown) {
    let errorMessage = 'Database connection failed';
    let instructions: string[] = [];
    
    const dbError = error as { code?: string; message?: string };

    if (dbError.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused - database server is not running or host/port is incorrect';
      instructions = [
        'Verify your DATABASE_URL is correct',
        'Make sure your database server is running',
        'Check that the host and port are correct',
      ];
    } else if (dbError.code === 'ENOTFOUND') {
      errorMessage = 'Host not found - check the hostname in DATABASE_URL';
      instructions = ['Verify the hostname in your DATABASE_URL is correct'];
    } else if (dbError.code === '28P01') {
      errorMessage = 'Authentication failed - check username and password';
      instructions = ['Verify the username and password in DATABASE_URL are correct'];
    } else if (dbError.code === '3D000') {
      errorMessage = 'Database does not exist';
      instructions = ['Create the database or check the database name in DATABASE_URL'];
    } else {
      errorMessage = dbError.message || 'Unknown database error';
      instructions = ['Check your DATABASE_URL and database server status'];
    }

    return NextResponse.json(
      {
        status: 'error',
        message: errorMessage,
        code: dbError.code,
        instructions,
        help: 'See DATABASE_SETUP.md for setup instructions',
      },
      { status: 503 }
    );
  }
}

