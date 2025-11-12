#!/usr/bin/env node
/**
 * Simple database connection test script
 * Tests different connection string formats to find the working one
 */

import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({ path: '.env.local' });
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

console.log('🔍 Testing database connection...\n');
console.log('Current connection string:');
console.log(DATABASE_URL.replace(/:([^:@]+)@/, ':****@'));
console.log('\n');

// Test configurations to try
const configs = [
  {
    name: 'Current connection (Direct)',
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  {
    name: 'Direct connection with postgres user',
    connectionString: DATABASE_URL.replace(/postgres:/, 'postgres:'),
    ssl: { rejectUnauthorized: false },
  },
  // Try Session Pooler format
  {
    name: 'Session Pooler (IPv4 compatible)',
    connectionString: DATABASE_URL
      .replace(/db\.([^.]+)\.supabase\.co:5432/, 'aws-0-us-east-1.pooler.supabase.com:6543')
      .replace(/postgres:/, 'postgres.mcpseebadlmjnmkgiyxs:'),
    ssl: { rejectUnauthorized: false },
  },
];

async function testConnection(config) {
  const pool = new Pool({
    connectionString: config.connectionString,
    ssl: config.ssl,
    connectionTimeoutMillis: 5000,
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW(), current_database(), current_user');
    client.release();
    await pool.end();
    
    console.log(`✅ ${config.name} - SUCCESS!`);
    console.log(`   Database: ${result.rows[0].current_database}`);
    console.log(`   User: ${result.rows[0].current_user}`);
    console.log(`   Server time: ${result.rows[0].now}\n`);
    console.log(`📝 Working connection string:`);
    console.log(`   ${config.connectionString.replace(/:([^:@]+)@/, ':****@')}\n`);
    return true;
  } catch (error) {
    console.log(`❌ ${config.name} - FAILED`);
    console.log(`   Error: ${error.message}`);
    if (error.code) console.log(`   Code: ${error.code}\n`);
    await pool.end();
    return false;
  }
}

// Test all configurations
console.log('Testing different connection methods...\n');
let success = false;

for (const config of configs) {
  const result = await testConnection(config);
  if (result) {
    success = true;
    break;
  }
}

if (!success) {
  console.log('❌ All connection attempts failed.\n');
  console.log('💡 Next steps:');
  console.log('   1. Go to Supabase Dashboard → Settings → Database');
  console.log('   2. Verify your database password (or reset it)');
  console.log('   3. Copy the connection string from the "Connection String" section');
  console.log('   4. Make sure to use the Session Pooler (port 6543) if you see IPv4 warnings');
  console.log('   5. Update your .env.local file with the correct connection string\n');
  process.exit(1);
}

process.exit(0);

