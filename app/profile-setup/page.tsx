"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileSetupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: "",
    height: "",
    weight: "",
    calorieGoal: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save profile");
      }

      // after saving, send them to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error instanceof Error ? error.message : "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Set Up Your Profile
      </h1>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="border rounded p-2 w-full"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="number"
          placeholder="Height (inches)"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Weight (pounds)"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Calorie Goal"
          value={formData.calorieGoal}
          onChange={(e) =>
            setFormData({ ...formData, calorieGoal: e.target.value })
          }
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save and Continue"}
        </button>
      </form>
    </div>
  );
}
