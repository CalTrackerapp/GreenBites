# Vercel Deployment Guide

## Environment Variables Setup

For your GreenBites app to work on Vercel, you **must** set these environment variables in your Vercel project settings:

### Required Environment Variables

1. **DATABASE_URL**
   - Get from: Supabase Dashboard → Settings → Database → Connection String (URI format)
   - Format: `postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`
   - **Important**: Use the Session Pooler connection string (port 6543) for better compatibility with serverless

2. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**
   - Get from: Clerk Dashboard → API Keys
   - Format: `pk_test_...` or `pk_live_...`

3. **CLERK_SECRET_KEY**
   - Get from: Clerk Dashboard → API Keys
   - Format: `sk_test_...` or `sk_live_...`

4. **CALORIE_NINJAS_API_KEY**
   - Get from: https://www.calorieninjas.com/api
   - Your API key from Calorie Ninjas

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: The variable name (e.g., `DATABASE_URL`)
   - **Value**: The actual value
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**
5. **Redeploy** your application for changes to take effect

## Verifying Environment Variables

After deployment, you can verify your environment variables are set by:

1. Going to your Vercel project → **Settings** → **Environment Variables**
2. Check that all 4 required variables are listed
3. Make sure they're enabled for the correct environments

## Common Deployment Issues

### "Failed to update user" or "Failed to log meal"

**Cause**: Database connection issues or missing environment variables

**Solutions**:
1. Verify `DATABASE_URL` is set in Vercel environment variables
2. Make sure you're using the **Session Pooler** connection string (port 6543) for Supabase
3. Check that the connection string includes SSL parameters if needed
4. Verify your database password is correct and URL-encoded if it contains special characters

### "CALORIE_NINJAS_API_KEY is not set"

**Cause**: Missing API key environment variable

**Solution**: Add `CALORIE_NINJAS_API_KEY` to Vercel environment variables

### Database queries failing

**Cause**: 
- Environment variables not set
- Wrong connection string format
- SSL configuration issues

**Solutions**:
1. Double-check all environment variables are set in Vercel
2. Use Supabase Session Pooler connection string (recommended for serverless)
3. Ensure your database allows connections from Vercel's IP addresses
4. Check Supabase dashboard for any connection restrictions

## Supabase Connection String Format

For Vercel deployment, use the **Session Pooler** format:

```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
```

Example:
```
postgresql://postgres.abcdefghijklmnop:yourpassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**To get this**:
1. Go to Supabase Dashboard → Settings → Database
2. Scroll to "Connection String"
3. Select "Session mode" (not Transaction mode)
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your actual database password

## After Setting Environment Variables

1. **Redeploy** your application in Vercel
2. Wait for the deployment to complete
3. Test the application:
   - Try updating your profile at `/account`
   - Try logging a meal at `/add-meal`
   - Check the dashboard at `/dashboard`

## Testing Database Connection

You can test if your database connection works by visiting:
```
https://your-app.vercel.app/api/health/db
```

This should return:
```json
{
  "status": "ok",
  "message": "Database connection successful"
}
```

If it returns an error, check your `DATABASE_URL` environment variable.
