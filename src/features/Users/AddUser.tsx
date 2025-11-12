//unrevised code

import { useState } from "react";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    height: "",
    weight: "",
    calGoal: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    const payload = {
      name: form.name,
      gender: form.gender,
      height: Number(form.height),
      weight: Number(form.weight),
      calGoal: Number(form.calGoal),
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("✅ User created successfully!");
      setForm({ name: "", gender: "", height: "", weight: "", calGoal: "" });
    } else {
      setStatus("❌ Failed to create user.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Username" required />
      <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender (M/F)" maxLength={1} />
      <input name="height" value={form.height} onChange={handleChange} placeholder="Height (inches)" type="number" required />
      <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (lbs)" type="number" required />
      <input name="calGoal" value={form.calGoal} onChange={handleChange} placeholder="Calorie Goal" type="number" required />
      <button type="submit">Add User</button>
      {status && <p>{status}</p>}
    </form>
  );
}