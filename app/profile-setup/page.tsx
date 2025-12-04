"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useUserContext } from "../../src/context/use-user-context";
import { Leaf, User, Ruler, Weight, Target } from "lucide-react";

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();
  const { createUser } = useUserContext();
  const [formData, setFormData] = useState({
    gender: "",
    height: "",
    weight: "",
    calorieGoal: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);

  // Check if user already exists, if so redirect to dashboard
  useEffect(() => {
    if (!isLoaded || !clerkUser?.id) {
      setCheckingUser(false);
      return;
    }

    let isMounted = true;

    async function checkExistingUser() {
      try {
        const response = await fetch("/api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: clerkUser.id }),
        });

        if (!isMounted) return;

        if (response.ok) {
          // User exists, redirect to dashboard
          router.push("/dashboard");
        } else if (response.status === 404) {
          // User doesn't exist, show form
          setCheckingUser(false);
        } else {
          // Other error, show form anyway
          setCheckingUser(false);
        }
      } catch {
        // Error checking, show form
        if (isMounted) {
          setCheckingUser(false);
        }
      }
    }

    checkExistingUser();

    return () => {
      isMounted = false;
    };
  }, [isLoaded, clerkUser?.id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!clerkUser?.id) {
      setError("You must be logged in to create a profile.");
      setIsLoading(false);
      return;
    }

    // Validate form data
    if (
      !formData.gender ||
      !formData.height ||
      !formData.weight ||
      !formData.calorieGoal
    ) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Convert height from feet to inches if needed (assuming input is in inches)
      const heightInches = parseFloat(formData.height);
      const weight = parseFloat(formData.weight);
      const calorieGoal = parseInt(formData.calorieGoal);

      if (isNaN(heightInches) || isNaN(weight) || isNaN(calorieGoal)) {
        throw new Error(
          "Please enter valid numbers for height, weight, and calorie goal."
        );
      }

      // Create user with clerkId as username
      await createUser({
        username: clerkUser.id,
        gender: formData.gender,
        height: Math.round(heightInches),
        weight: Math.round(weight),
        calorieGoal: calorieGoal,
      });

      // After creating user, redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create profile"
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (checkingUser || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!clerkUser?.id) {
    router.push("/sign-up");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-emerald-600 border-2 border-solid p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <User className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-blue-600 bg-clip-text text-transparent mb-2">
            Complete Your Profile
          </h1>
          <p className="text-slate-600">
            Tell us about yourself to get personalized nutrition tracking
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center">
            <span className="mr-2">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-green-600" />
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
              <Ruler className="w-4 h-4 mr-2 text-green-600" />
              Height (inches)
            </label>
            <input
              type="number"
              placeholder="e.g., 70"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              min="1"
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              Enter your height in inches (1 foot = 12 inches)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
              <Weight className="w-4 h-4 mr-2 text-green-600" />
              Weight (pounds)
            </label>
            <input
              type="number"
              placeholder="e.g., 180"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2 text-green-600" />
              Daily Calorie Goal
            </label>
            <input
              type="number"
              placeholder="e.g., 2500"
              value={formData.calorieGoal}
              onChange={(e) =>
                setFormData({ ...formData, calorieGoal: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              min="1000"
              max="5000"
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              Recommended: 2000-2500 calories per day
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Creating Profile...
              </>
            ) : (
              <>
                <Leaf className="w-5 h-5 mr-2" />
                Complete Setup
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
