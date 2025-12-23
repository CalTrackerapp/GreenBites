import { useState } from "react";
import { useUserContext } from "../../context/user-context";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  Plus,
  Trash2,
  Clock,
  Utensils,
  Zap,
  Leaf,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

// Calorie Ninjas API Response Types
type CalorieNinjasItem = {
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  sodium_mg: number;
  name: string;
  potassium_mg: number;
  fat_saturated_g: number;
  fat_total_g: number;
  calories: number;
  cholesterol_mg: number;
  protein_g: number;
  carbohydrates_total_g: number;
};

type CalorieNinjasResponse = {
  items?: CalorieNinjasItem[];
};

// Internal types for the component
type SelectedFood = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sodium: number;
  servingSize: number;
  carbonFootprint: number;
};

export default function AddMeal() {
  const { user: clerkUser } = useUser();

  // ✅ Call context hook once
  const contextUser = useUserContext();
  const { addCalorieEntry } = contextUser;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CalorieNinjasItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSearch() {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch("/api/foods/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: CalorieNinjasResponse = await response.json();

      // ✅ Safe access
      const items = data.items ?? [];
      setSearchResults(items);

      if (items.length === 0) {
        setError("No food items found. Try a different search term.");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to search for food items. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  function calculateCarbonFootprint(calories: number): number {
    // Rough estimation: 1 calorie ≈ 0.1 kg CO₂
    return Math.round(calories * 0.1 * 100) / 100;
  }

  function addFoodToSelection(food: CalorieNinjasItem) {
    const existingFood = selectedFoods.find((f) => f.name === food.name);

    if (existingFood) {
      setSelectedFoods((prev) =>
        prev.map((f) =>
          f.name === food.name ? { ...f, servingSize: f.servingSize + 1 } : f
        )
      );
      return;
    }

    const newFood: SelectedFood = {
      id: Date.now().toString(),
      name: food.name,
      calories: food.calories,
      protein: food.protein_g,
      carbs: food.carbohydrates_total_g,
      fats: food.fat_total_g,
      sodium: food.sodium_mg,
      servingSize: 1,
      carbonFootprint: calculateCarbonFootprint(food.calories),
    };

    setSelectedFoods((prev) => [...prev, newFood]);
  }

  function removeFoodFromSelection(foodId: string) {
    setSelectedFoods((prev) => prev.filter((f) => f.id !== foodId));
  }

  function updateServingSize(foodId: string, size: number) {
    if (!Number.isFinite(size) || size <= 0) return;

    setSelectedFoods((prev) =>
      prev.map((f) => (f.id === foodId ? { ...f, servingSize: size } : f))
    );
  }

  function calculateTotals() {
    return selectedFoods.reduce(
      (totals, food) => ({
        calories: totals.calories + food.calories * food.servingSize,
        protein: totals.protein + food.protein * food.servingSize,
        carbs: totals.carbs + food.carbs * food.servingSize,
        fats: totals.fats + food.fats * food.servingSize,
        sodium: totals.sodium + food.sodium * food.servingSize,
        carbonFootprint:
          totals.carbonFootprint + food.carbonFootprint * food.servingSize,
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        sodium: 0,
        carbonFootprint: 0,
      }
    );
  }

  async function ensureUserExists(userId: string) {
    const existing = await fetch(`/api/users/${userId}`);
    if (existing.ok) return;

    const createRes = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userId,
        gender: contextUser.gender || "",
        height: contextUser.height || 0,
        weight: contextUser.weight || 0,
        calGoal: contextUser.calorieGoal || 0,
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json().catch(() => ({}));
      throw new Error(err.error || `Failed to create user (${createRes.status})`);
    }
  }

  async function logMeal() {
    if (selectedFoods.length === 0) return;

    if (!clerkUser?.id) {
      setError("You must be logged in to log meals.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const today = new Date().toISOString().split("T")[0];
    const userId = clerkUser.id;

    try {
      await ensureUserExists(userId);

      const totals = calculateTotals();

      for (const food of selectedFoods) {
        const nutritionData = {
          name: food.name,
          calories: food.calories,
          fat_total_g: food.fats,
          protein_g: food.protein,
          carbohydrates_total_g: food.carbs,
          sodium_mg: food.sodium,
          serving_size_g: 100,
        };

        const foodRes = await fetch("/api/foods/fromNutrition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nutritionData, userID: userId }),
        });

        if (!foodRes.ok) {
          const errorData = await foodRes.json().catch(() => ({}));
          const msg =
            errorData.error || `Failed to create food entry (${foodRes.status})`;
          console.error("Food creation error:", msg, errorData);
          throw new Error(msg);
        }

        const foodData = await foodRes.json();

        const logRes = await fetch(`/api/users/${userId}/foodLogs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            foodID: foodData.foodID,
            servingSize: food.servingSize,
          }),
        });

        if (!logRes.ok) {
          throw new Error("Failed to log food entry");
        }
      }

      addCalorieEntry({
        name: selectedFoods.map((f) => f.name).join(", "),
        date: today,
        calories: Math.round(totals.calories),
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fats: Math.round(totals.fats),
        sodium: Math.round(totals.sodium),
        carbonFootPrintValue: Math.round(totals.carbonFootprint),
      });

      const mealCount = selectedFoods.length;
      setSelectedFoods([]);
      setSearchQuery("");
      setSearchResults([]);
      setSuccess(`${mealCount} food item(s) logged successfully! 🎉`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to log meal:", err);
      setError(
        err instanceof Error ? err.message : "Failed to log meal. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
            <Utensils className="mr-3 text-green-600" />
            Meal Logger
            <Leaf className="ml-3 text-green-600" />
          </h1>
          <p className="text-slate-600 text-lg">
            Powered by Calorie Ninjas API • Track nutrition & environmental impact
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Food Search */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6 flex items-center">
                <Search className="mr-3 text-blue-600" />
                Search Food
              </h2>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., 1lb chicken breast, 2 cups rice, 3 apples"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  // ✅ Replace onKeyPress with onKeyDown
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 flex items-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">
                    Search Results
                  </h3>
                  {searchResults.map((food, index) => (
                    <div
                      key={`${food.name}-${index}`}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 capitalize">
                          {food.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-slate-600">
                          <div>🔥 {Math.round(food.calories)} cal</div>
                          <div>💪 {Math.round(food.protein_g)}g protein</div>
                          <div>🍞 {Math.round(food.carbohydrates_total_g)}g carbs</div>
                          <div>🧂 {Math.round(food.sodium_mg)}mg sodium</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addFoodToSelection(food)}
                        className="ml-4 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Foods */}
            {selectedFoods.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-6">
                  Selected Foods
                </h2>

                <div className="space-y-4">
                  {selectedFoods.map((food) => (
                    <div
                      key={food.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 capitalize">
                          {food.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={food.servingSize}
                              onChange={(e) =>
                                updateServingSize(
                                  food.id,
                                  parseFloat(e.target.value)
                                )
                              }
                              min="0.1"
                              step="0.1"
                              className="w-20 px-3 py-1 border border-slate-300 rounded-lg text-sm bg-white/50"
                            />
                            <span className="text-sm text-slate-600">
                              servings
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">
                            🔥 {Math.round(food.calories * food.servingSize)} cal
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFoodFromSelection(food.id)}
                        className="ml-4 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <TrendingUp className="mr-2 text-blue-600" />
                    Meal Totals
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">🔥 Calories:</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(totals.calories)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">💪 Protein:</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(totals.protein)}g
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">🍞 Carbs:</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(totals.carbs)}g
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">🥑 Fats:</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(totals.fats)}g
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">🧂 Sodium:</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(totals.sodium)}mg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">🌱 CO₂:</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(totals.carbonFootprint)}kg
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logMeal}
                  disabled={isLoading}
                  className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin mr-3" />
                      Logging Meal...
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6 mr-3" />
                      Log This Meal
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Instructions */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6 flex items-center">
              <Clock className="mr-3 text-purple-600" />
              How to Use
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
                  <Search className="w-5 h-5 text-blue-600 mr-2" />
                  1. Search for Food
                </h3>
                <p className="text-sm text-slate-600">
                  Enter food items with quantities like "1lb chicken breast" or
                  "2 cups rice"
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
                  <Plus className="w-5 h-5 text-green-600 mr-2" />
                  2. Add to Meal
                </h3>
                <p className="text-sm text-slate-600">
                  Click the + button to add foods to your meal. Adjust serving
                  sizes as needed.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  3. Log Meal
                </h3>
                <p className="text-sm text-slate-600">
                  Click "Log This Meal" to save your nutrition data to the dashboard.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
                  <Leaf className="w-5 h-5 text-orange-600 mr-2" />
                  Environmental Impact
                </h3>
                <p className="text-sm text-slate-600">
                  Track your carbon footprint and make eco-friendly food choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
