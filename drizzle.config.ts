import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load .env.local first (highest priority), then .env
dotenv.config({ path: '.env.local' });
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Please create a .env.local file with your database connection string.');
}

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
