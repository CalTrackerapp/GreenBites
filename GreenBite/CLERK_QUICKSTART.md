# Quick Start: Clerk Configuration for Next.js

## Step 1: Get Your Clerk Keys

1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up/login and create a new application
3. Navigate to **API Keys** in your dashboard
4. Copy both:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)

## Step 2: Create Environment File

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

## Step 3: Install Dependencies & Run

```bash
npm install
npm run dev
```

## Step 4: Test It

1. Visit `http://localhost:3000`
2. Click "Sign Up" or go to `/sign-up`
3. Create an account
4. Try accessing `/dashboard` - you should be able to see it when signed in
5. Sign out and try accessing `/dashboard` again - you'll be redirected to `/login`

## How It Works

✅ **Middleware Protection**: The `middleware.ts` file automatically protects routes matching `/dashboard`, `/add-meal`, and `/profile`

✅ **Automatic Redirects**: Unauthenticated users trying to access protected routes are redirected to `/login`

✅ **Client Components**: The `ClerkProvider` in `app/layout.tsx` makes Clerk available throughout your app

✅ **Environment Variables**:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Used by client-side components (safe to expose)
- `CLERK_SECRET_KEY` - Used by server-side middleware (keep secret!)

## Troubleshooting

- **"Missing Publishable Key"**: Make sure `.env.local` exists and has `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **Middleware not working**: Check that both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set
- **Redirect loop**: Make sure `/login` and `/sign-up` are NOT in the protected routes list in `middleware.ts`
