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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // after saving, send them to the dashboard
    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Set Up Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
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
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
}
