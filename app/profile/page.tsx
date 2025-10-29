"use client";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <>
      <SignedIn>
        <h1 className="p-6 text-3xl font-bold">Profile</h1>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

