# Clerk Authentication Setup

Your GreenBites app now has Clerk authentication integrated! Here's what you need to do to complete the setup:

## 1. Create a Clerk Account

1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up for a free account
3. Create a new application

## 2. Get Your Publishable Key

1. In your Clerk dashboard, go to "API Keys"
2. Copy your **Publishable Key**
3. Open the `.env` file in your project root
4. Replace `your_clerk_publishable_key_here` with your actual publishable key:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

## 3. Configure Authentication Methods

In your Clerk dashboard, you can configure:
- **Email/Password**: Enable for traditional sign-up/sign-in
- **Social Providers**: Google, GitHub, etc.
- **Phone Number**: SMS authentication
- **Magic Links**: Passwordless email authentication

## 4. Test Your Setup

1. Start your development server: `npm run dev`
2. Navigate to `/sign-up` to test registration
3. Navigate to `/login` to test sign-in
4. Try accessing `/dashboard` without being signed in (should redirect to login)
5. Sign in and verify you can access protected routes

## Features Implemented

✅ **Sign In/Sign Up Pages**: Beautiful, responsive auth forms
✅ **Protected Routes**: Dashboard routes require authentication
✅ **User Management**: UserButton in header for profile/sign out
✅ **Conditional Navigation**: Dashboard link only shows when signed in
✅ **Automatic Redirects**: Redirects to login when accessing protected routes

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

