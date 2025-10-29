# Clerk Authentication Setup for Next.js

Your GreenBites app now has Clerk authentication integrated with Next.js! Here's what you need to do to complete the setup:

## 1. Create a Clerk Account

1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up for a free account
3. Create a new application

## 2. Get Your API Keys

1. In your Clerk dashboard, go to "API Keys"
2. Copy both:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

## 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Clerk keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
   ```

   **Important**: 
   - Never commit `.env.local` to git (it's already in `.gitignore`)
   - The `NEXT_PUBLIC_` prefix makes the publishable key available to client-side code
   - The secret key is only used server-side (middleware, API routes)

## 4. Configure Authentication Methods

In your Clerk dashboard, you can configure:
- **Email/Password**: Enable for traditional sign-up/sign-in
- **Social Providers**: Google, GitHub, etc.
- **Phone Number**: SMS authentication
- **Magic Links**: Passwordless email authentication

## 5. Test Your Setup

1. Start your Next.js development server: `npm run dev`
2. Navigate to `/sign-up` to test registration
3. Navigate to `/login` to test sign-in
4. Try accessing `/dashboard` without being signed in (should redirect to `/login`)
5. Sign in and verify you can access protected routes (`/dashboard`, `/add-meal`, `/profile`)

## Features Implemented

✅ **Sign In/Sign Up Pages**: Beautiful, responsive auth forms using Clerk's Next.js components
✅ **Protected Routes**: Middleware automatically protects `/dashboard`, `/add-meal`, and `/profile`
✅ **User Management**: UserButton in header for profile/sign out
✅ **Conditional Navigation**: Dashboard links only show when signed in
✅ **Automatic Redirects**: Middleware redirects to `/login` when accessing protected routes
✅ **Server-Side Protection**: Routes are protected at the middleware level, not just client-side

## Next Steps

- Customize the appearance of auth components in `src/components/auth/`
- Add more protected routes as needed
- Implement user profile management
- Add role-based access control if needed

## Troubleshooting

- Make sure your `.env` file is in the project root
- Ensure your publishable key starts with `pk_test_` or `pk_live_`
- Check the browser console for any Clerk-related errors
- Verify your Clerk application is properly configured in the dashboard

