# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- A free account for one of these services:
  - [Neon](https://neon.tech) (recommended - easiest setup)
  - [Supabase](https://supabase.com)
  - Or local PostgreSQL installation

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up Database (Choose one option)

### Option A: Neon (Recommended - 2 minutes)
1. Go to https://neon.tech and sign up
2. Create a new project
3. Copy the connection string from "Connection Details"
4. Open `.env.local` and replace the `DATABASE_URL` line with your connection string:
   ```
   DATABASE_URL=postgresql://your-actual-connection-string-here
   ```

### Option B: Supabase
1. Go to https://supabase.com and sign up
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (URI format)
5. Update `.env.local` with your connection string

### Option C: Local PostgreSQL
1. Install PostgreSQL
2. Create a database: `createdb greenbites`
3. Update `.env.local`:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/greenbites
   ```

## Step 3: Set Up Clerk Authentication
1. Go to https://dashboard.clerk.com and sign up
2. Create a new application
3. Copy your API keys from "API Keys"
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   ```

## Step 4: Set Up Calorie Ninjas API
1. Go to https://www.calorieninjas.com/api and sign up for a free API key
2. Copy your API key
3. Update `.env.local`:
   ```
   CALORIE_NINJAS_API_KEY=your_api_key_here
   ```

## Step 5: Run Database Migrations
```bash
npm run db:push
```
This creates all the required tables in your database.

## Step 6: Verify Setup
```bash
npm run db:check
```
This will test your database connection and show any issues.

## Step 7: Start Development Server
```bash
npm run dev
```

## Step 8: Test the Application
1. Open http://localhost:3000
2. Sign up for an account
3. Complete your profile setup
4. Try updating your account at `/account`

## Troubleshooting

### "DATABASE_URL is not set"
- Make sure `.env.local` exists in the project root
- Check that `DATABASE_URL` is not commented out
- Restart your dev server after updating `.env.local`

### "ECONNREFUSED" error
- Verify your database server is running
- Check that the connection string is correct
- For cloud databases, make sure SSL is enabled (`?sslmode=require`)

### "relation does not exist"
- Run `npm run db:push` to create the database tables
- Verify the migration completed successfully

### Database connection works but profile update fails
- Check the browser console for error messages
- Verify you're signed in with Clerk
- Check that the database tables were created correctly

### "CALORIE_NINJAS_API_KEY is not set"
- Make sure `.env.local` exists and includes `CALORIE_NINJAS_API_KEY`
- Get your API key from https://www.calorieninjas.com/api
- Restart your dev server after adding the key

## Need Help?
- See `DATABASE_SETUP.md` for detailed database setup instructions
- See `CLERK_SETUP.md` for detailed Clerk setup instructions
- Check the error messages in your terminal and browser console

