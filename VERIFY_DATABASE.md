# How to Verify Your Supabase Database Connection

## Step 1: Check Your Current Connection String

Your `.env.local` file should contain a line like:
```
DATABASE_URL=postgresql://postgres:password@host:port/postgres
```

## Step 2: Get the Correct Connection String from Supabase

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (the one with project ref: mcpseebadlmjnmkgiyxs)
3. **Go to Settings → Database**
4. **Scroll down to "Connection String"**
5. **Make sure you're on the "URI" tab** (not "JDBC" or others)
6. **Copy the connection string** - it should look like:
   ```
   postgresql://postgres.[PROJECT_REF]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

## Step 3: Verify Your Password

### Option A: Reset Your Database Password
1. In Supabase Dashboard, go to **Settings → Database**
2. Scroll to **"Database Password"** section
3. Click **"Reset Database Password"**
4. Copy the new password
5. Update your `.env.local` file with the new password

### Option B: Check if Password Needs URL Encoding
If your password contains special characters (@, #, $, %, etc.), they need to be URL-encoded:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- etc.

## Step 4: Choose the Right Connection Method

### For IPv4 Networks (Recommended - Use Session Pooler):
- **Port**: 6543
- **Host format**: `aws-0-[region].pooler.supabase.com`
- **Username format**: `postgres.[PROJECT_REF]`
- **Example**: `postgresql://postgres.mcpseebadlmjnmkgiyxs:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

### For Direct Connection (IPv6 or with IPv4 add-on):
- **Port**: 5432
- **Host format**: `db.[PROJECT_REF].supabase.co`
- **Username**: `postgres`
- **Example**: `postgresql://postgres:password@db.mcpseebadlmjnmkgiyxs.supabase.co:5432/postgres`

## Step 5: Update Your .env.local File

1. Open `.env.local` in your project root
2. Replace the `DATABASE_URL` line with the connection string from Supabase
3. Make sure to replace `[YOUR-PASSWORD]` with your actual password
4. Save the file

## Step 6: Test the Connection

Run this command to test your connection:
```bash
npm run db:check
```

If successful, you should see:
- ✅ DATABASE_URL is set
- ✅ Database connection successful!
- ✅ Database tables found

## Common Issues

### "Authentication failed"
- **Cause**: Wrong password or username
- **Solution**: Reset your database password in Supabase Dashboard and update `.env.local`

### "ECONNREFUSED"
- **Cause**: Wrong host, port, or IPv4 compatibility issue
- **Solution**: Use Session Pooler (port 6543) instead of direct connection (port 5432)

### "self-signed certificate"
- **Cause**: SSL certificate issue
- **Solution**: The code already handles this with `rejectUnauthorized: false` for Supabase

### "Connection timeout"
- **Cause**: Firewall or network issue
- **Solution**: Check your internet connection and firewall settings

## Quick Test Script

You can also test the connection directly with psql (if installed):
```bash
psql "postgresql://postgres.mcpseebadlmjnmkgiyxs:your-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

Or test with Node.js:
```bash
node -e "const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }); pool.query('SELECT NOW()').then(r => { console.log('Success:', r.rows[0]); pool.end(); }).catch(e => { console.error('Error:', e.message); process.exit(1); });"
```

