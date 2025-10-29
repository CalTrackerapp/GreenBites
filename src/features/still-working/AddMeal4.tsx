import { useState, useEffect } from "react";
import { useUserContext } from "../../context/user-context";
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
  items: CalorieNinjasItem[];
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

type MealLog = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sodium: number;
  carbonFootprint: number;
  timestamp: string;
  foods: SelectedFood[];
};

const CALORIE_NINJAS_API_URL = "https://api.calorieninjas.com/v1/nutrition";
const API_KEY = "S7okFpAr/YkWyHNo754tIA==LLV0XkmStgrD6cN3"; // Replace with your actual API key

export default function AddMeal2() {
  const { addCalorieEntry } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CalorieNinjasItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [pastLogs, setPastLogs] = useState<MealLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Search for nutrition data using Calorie Ninjas API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `${CALORIE_NINJAS_API_URL}?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: CalorieNinjasResponse = await response.json();
      setSearchResults(data.items || []);

      if (data.items.length === 0) {
        setError("No food items found. Try a different search term.");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setError(
        "Failed to search for food items. Please check your API key and try again."
      );
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Add food to selected foods
  const addFoodToSelection = (food: CalorieNinjasItem) => {
    const existingFood = selectedFoods.find((f) => f.name === food.name);
    if (existingFood) {
      // Update serving size if food already exists
      setSelectedFoods(
        selectedFoods.map((f) =>
          f.name === food.name ? { ...f, servingSize: f.servingSize + 1 } : f
        )
      );
    } else {
      // Add new food
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
      setSelectedFoods([...selectedFoods, newFood]);
    }
  };

  // Remove food from selection
  const removeFoodFromSelection = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter((f) => f.id !== foodId));
  };

  // Update serving size
  const updateServingSize = (foodId: string, size: number) => {
    if (size <= 0) return;
    setSelectedFoods(
      selectedFoods.map((f) =>
        f.id === foodId ? { ...f, servingSize: size } : f
      )
    );
  };

  // Calculate carbon footprint based on calories
  const calculateCarbonFootprint = (calories: number): number => {
    // Rough estimation: 1 calorie ≈ 0.1 kg CO₂
    return Math.round(calories * 0.1 * 100) / 100;
  };

  // Calculate totals for selected foods
  const calculateTotals = () => {
    return selectedFoods.reduce(
      (totals, food) => {
        return {
          calories: totals.calories + food.calories * food.servingSize,
          protein: totals.protein + food.protein * food.servingSize,
          carbs: totals.carbs + food.carbs * food.servingSize,
          fats: totals.fats + food.fats * food.servingSize,
          sodium: totals.sodium + food.sodium * food.servingSize,
          carbonFootprint:
            totals.carbonFootprint + food.carbonFootprint * food.servingSize,
        };
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        sodium: 0,
        carbonFootprint: 0,
      }
    );
  };

  // Log the meal
  const logMeal = async () => {
    if (selectedFoods.length === 0) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const totals = calculateTotals();
    const today = new Date().toISOString().split("T")[0];

    try {
      // Add to Context API (for Dashboard updates)
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

      // Create meal log entry
      const newMealLog: MealLog = {
        id: Date.now().toString(),
        name: selectedFoods.map((f) => f.name).join(", "),
        calories: Math.round(totals.calories),
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fats: Math.round(totals.fats),
        sodium: Math.round(totals.sodium),
        carbonFootprint: Math.round(totals.carbonFootprint),
        timestamp: new Date().toLocaleTimeString(),
        foods: selectedFoods,
      };

      // Add to past logs
      setPastLogs([newMealLog, ...pastLogs]);

      // Clear selection
      setSelectedFoods([]);
      setSearchQuery("");
      setSearchResults([]);
      setSuccess("Meal logged successfully! 🎉");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Failed to log meal:", error);
      setError("Failed to log meal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load past logs from localStorage (for demo purposes)
  useEffect(() => {
    const savedLogs = localStorage.getItem("mealLogs");
    if (savedLogs) {
      setPastLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save logs to localStorage whenever pastLogs changes
  useEffect(() => {
    localStorage.setItem("mealLogs", JSON.stringify(pastLogs));
  }, [pastLogs]);

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
            <Utensils className="mr-3 text-green-600" />
            Smart Meal Logger
            <Leaf className="ml-3 text-green-600" />
          </h1>
          <p className="text-slate-600 text-lg">
            Powered by Calorie Ninjas API • Track nutrition & environmental
            impact
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
          {/* Left Column: Search and Selection */}
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
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 capitalize">
                          {food.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-slate-600">
                          <div>🔥 {Math.round(food.calories)} cal</div>
                          <div>💪 {Math.round(food.protein_g)}g protein</div>
                          <div>
                            🍞 {Math.round(food.carbohydrates_total_g)}g carbs
                          </div>
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
                                  parseFloat(e.target.value) || 1
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
                            🔥 {Math.round(food.calories * food.servingSize)}{" "}
                            cal
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

          {/* Right Column: Past Logs */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6 flex items-center">
              <Clock className="mr-3 text-purple-600" />
              Today's Meals
            </h2>

            {pastLogs.length === 0 ? (
              <div className="text-center py-12">
                <Utensils className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No meals logged today</p>
                <p className="text-slate-400 text-sm mt-2">
                  Start by searching for food items above!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pastLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-slate-900">
                        {log.name}
                      </h3>
                      <span className="text-sm text-slate-500 bg-white/50 px-2 py-1 rounded-lg">
                        {log.timestamp}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">🔥 Calories:</span>
                        <span className="font-semibold">{log.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">💪 Protein:</span>
                        <span className="font-semibold">{log.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">🍞 Carbs:</span>
                        <span className="font-semibold">{log.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">🥑 Fats:</span>
                        <span className="font-semibold">{log.fats}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">🧂 Sodium:</span>
                        <span className="font-semibold">{log.sodium}mg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">🌱 CO₂:</span>
                        <span className="font-semibold">
                          {log.carbonFootprint}kg
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
