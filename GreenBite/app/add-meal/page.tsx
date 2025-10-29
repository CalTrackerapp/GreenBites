"use client";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import AddMeal from '../../src/features/meal/AddMeal';

export default function AddMealPage() {
  return (
    <>
      <SignedIn>
        <AddMeal />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

