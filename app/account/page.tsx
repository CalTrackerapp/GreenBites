"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useUserContext } from "../../src/context/user-context";
import { User } from "../../src/context/user-context";
import { UserCircle, Save, Ruler, Weight, Target } from "lucide-react";

export default function AccountPage() {
  const user = useUserContext();
  const [formData, setFormData] = useState({
    gender: user.gender || "",
    height: user.height || 0,
    weight: user.weight || 0,
    calorieGoal: user.calorieGoal || 0,
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setFormData({
      gender: user.gender || "",
      height: user.height || 0,
      weight: user.weight || 0,
      calorieGoal: user.calorieGoal || 0,
    });
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender: formData.gender,
          height: formData.height.toString(),
          weight: formData.weight.toString(),
          calorieGoal: formData.calorieGoal.toString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update profile");
      }

      const updatedUserData = await response.json();
      
      // Update local context (no conversion needed - database stores inches/pounds)
      // API returns calGoal but User type expects calorieGoal
      const updatedUser: User = {
        ...user,
        gender: updatedUserData.gender || formData.gender,
        height: updatedUserData.height || formData.height,
        weight: updatedUserData.weight || formData.weight,
        calorieGoal: updatedUserData.calorieGoal || updatedUserData.calGoal || formData.calorieGoal,
      };

      user.setUser(updatedUser);
      setMessage({ type: "success", text: "Account updated successfully!" });
    } catch (error) {
      console.error("Error updating account:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update account. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    }
  }

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mb-4 shadow-lg">
                <UserCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Account Settings
              </h1>
              <p className="text-gray-600">
                Manage your personal information and preferences
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Gender Field */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white text-gray-900"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Height Field */}
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <Ruler className="w-4 h-4 text-emerald-600" />
                    Height (inches)
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={formData.height || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        height: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white text-gray-900"
                    placeholder="Enter your height"
                  />
                </div>

                {/* Weight Field */}
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <Weight className="w-4 h-4 text-emerald-600" />
                    Weight (pounds)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={formData.weight || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weight: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white text-gray-900"
                    placeholder="Enter your weight"
                  />
                </div>

                {/* Calorie Goal Field */}
                <div>
                  <label
                    htmlFor="calorieGoal"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <Target className="w-4 h-4 text-emerald-600" />
                    Daily Calorie Goal
                  </label>
                  <input
                    type="number"
                    id="calorieGoal"
                    value={formData.calorieGoal || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        calorieGoal: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white text-gray-900"
                    placeholder="Enter your daily calorie goal"
                  />
                </div>

                {/* Message */}
                {message && (
                  <div
                    className={`p-4 rounded-xl ${
                      message.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </form>
            </div>

            {/* User Info Display */}
            {user && (
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Current Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Gender:</span>
                    <p className="font-medium text-gray-900">
                      {user.gender || "Not set"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Height:</span>
                    <p className="font-medium text-gray-900">
                      {user.height ? `${user.height} inches` : "Not set"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Weight:</span>
                    <p className="font-medium text-gray-900">
                      {user.weight ? `${user.weight} lbs` : "Not set"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Daily Calorie Goal:</span>
                    <p className="font-medium text-gray-900">
                      {user.calorieGoal
                        ? `${user.calorieGoal} kcal`
                        : "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
