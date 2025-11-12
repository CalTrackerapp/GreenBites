#!/usr/bin/env tsx
/**
 * Database Connection Checker
 * Run this script to verify your database connection is configured correctly
 */

import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

console.log('🔍 Checking database configuration...\n');

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not set!\n');
  console.log('📝 To fix this:');
  console.log('   1. Create a .env.local file in the project root');
  console.log('   2. Add your DATABASE_URL:');
  console.log('      DATABASE_URL=postgresql://user:password@host:5432/database\n');
  console.log('💡 Quick setup options:');
  console.log('   - Neon (free): https://neon.tech');
  console.log('   - Supabase (free): https://supabase.com');
  console.log('   - See DATABASE_SETUP.md for detailed instructions\n');
  process.exit(1);
}

console.log('✅ DATABASE_URL is set');
console.log(`   Connection string: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}\n`);

console.log('🔌 Testing database connection...\n');

// Detect if this is a Supabase connection
const isSupabase = DATABASE_URL.includes('supabase.co');

const pool = new Pool({
  connectionString: DATABASE_URL,
  connectionTimeoutMillis: 10000,
  // Supabase requires SSL connections
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
});

try {
  const client = await pool.connect();
  const result = await client.query('SELECT NOW()');
  console.log('✅ Database connection successful!');
  console.log(`   Server time: ${result.rows[0].now}\n`);
  
  // Check if tables exist
  const tablesResult = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);
  
  if (tablesResult.rows.length === 0) {
    console.log('⚠️  WARNING: No tables found in database!');
    console.log('   Run: npm run db:push\n');
  } else {
    console.log('✅ Database tables found:');
    tablesResult.rows.forEach((row) => {
      console.log(`   - ${row.table_name}`);
    });
    console.log('');
  }
  
  client.release();
  await pool.end();
  console.log('🎉 Database setup is complete!\n');
  process.exit(0);
} catch (error: any) {
  console.error('❌ Database connection failed!\n');
  
  if (error.code === 'ECONNREFUSED') {
    console.error('   Error: Connection refused');
    console.error('   This usually means:');
    console.error('   - The database server is not running');
    console.error('   - The host/port in DATABASE_URL is incorrect');
    console.error('   - A firewall is blocking the connection\n');
  } else if (error.code === 'ENOTFOUND') {
    console.error('   Error: Host not found');
    console.error('   Check that the hostname in DATABASE_URL is correct\n');
  } else if (error.code === '28P01') {
    console.error('   Error: Authentication failed');
    console.error('   Check that the username and password in DATABASE_URL are correct\n');
  } else if (error.code === '3D000') {
    console.error('   Error: Database does not exist');
    console.error('   Create the database or check the database name in DATABASE_URL\n');
  } else {
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code || 'UNKNOWN'}\n`);
  }
  
  console.log('💡 Troubleshooting:');
  console.log('   - Verify your DATABASE_URL is correct');
  console.log('   - Make sure your database server is running');
  console.log('   - Check DATABASE_SETUP.md for setup instructions\n');
  
  await pool.end();
  process.exit(1);
}

