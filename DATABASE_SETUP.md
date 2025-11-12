# Database Setup Guide

## Quick Setup with Neon (Recommended - Free)

1. **Sign up for Neon** (free tier):
   - Go to https://neon.tech
   - Sign up with GitHub (easiest)
   - Create a new project

2. **Get your connection string**:
   - In your Neon dashboard, click on your project
   - Go to "Connection Details"
   - Copy the connection string (it looks like: `postgresql://user:password@host/database?sslmode=require`)

3. **Create `.env.local` file**:
   - Copy `.env.local.example` to `.env.local`
   - Paste your DATABASE_URL from Neon
   - Add your Clerk keys (if you haven't already)

4. **Run database migrations**:
   ```bash
   npx drizzle-kit push
   ```
   This will create all the required tables in your database.

5. **Restart your dev server**:
   ```bash
   npm run dev
   ```

## Alternative: Supabase (Also Free)

1. Go to https://supabase.com
2. Sign up and create a new project
3. Go to Settings → Database
4. Copy the connection string (use the "URI" format)
5. Follow steps 3-5 above

## Alternative: Local PostgreSQL

If you prefer to run PostgreSQL locally:

1. **Install PostgreSQL**:
   - Windows: Download from https://www.postgresql.org/download/windows/
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create a database**:
   ```bash
   createdb greenbites
   ```

3. **Set DATABASE_URL** in `.env.local`:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/greenbites
   ```
   (Replace `postgres` and `password` with your PostgreSQL username and password)

4. **Run migrations**:
   ```bash
   npx drizzle-kit push
   ```

## Verify Setup

After setting up your database, you can verify it's working by:

1. Starting your dev server: `npm run dev`
2. Trying to update your profile at `/account`
3. If you see a success message, your database is connected!

## Troubleshooting

- **"ECONNREFUSED"**: Database server is not running or connection string is wrong
- **"DATABASE_URL is not set"**: Make sure `.env.local` exists and has DATABASE_URL
- **"relation does not exist"**: Run `npx drizzle-kit push` to create tables
- **SSL errors**: Make sure your connection string includes `?sslmode=require` for cloud databases

