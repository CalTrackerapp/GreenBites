"use client";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import Dashboard from '../../src/features/dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}


