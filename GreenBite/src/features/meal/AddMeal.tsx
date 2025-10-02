import { Leaf } from "lucide-react";
import { useState, useEffect } from "react";

type FoodNutrient = {
  nutrientName: string;
  value: number;
  unitName: string;
};

type FoodItem = {
  fdcId: number;
  description: string;

  foodCategory?: string;
  brandOwner?: string;
  foodNutrients?: FoodNutrient[];
  carbonFootPrint?: number;
};

function getCarbonFootPrint(): number {
  const steps = 11;
  const randomStep = Math.floor(Math.random() * steps);
  return randomStep * 0.5;
}

const API_KEY = "I0DmpTmAjhj8CNLfOxk0aAqdNOg36qan1nRRcwSi";

export default function AddMeal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [meals, setMeals] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchFoods(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchFoods = async (searchTerm: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
          searchTerm
        )}&pageSize=5&fields=fdcId,description,foodCategory,brandOwner,foodNutrients&api_key=${API_KEY}`
      );
      const data = await res.json();
      setResults(data.foods || []);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMeal = (food: FoodItem, footprint: number) => {
    setMeals((prev) => [...prev, { ...food, carbonFootPrint: footprint }]);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        DEMO SEARCH BAR (In progress)
      </h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for food..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
      />

      {loading && <p className="mt-2 text-gray-500">Searching...</p>}

      {results.length > 0 && (
        <ul className="mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((food) => {
            const footprint = getCarbonFootPrint();

            return (
              <li
                key={food.fdcId}
                onClick={() => addMeal(food, footprint)}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
              >
                <div className="font-medium">{food.description}</div>
                <div className="text-sm text-gray-500">
                  {food.foodCategory || "Unknown Category"}
                </div>
                {food.brandOwner && (
                  <div className="text-xs text-gray-400">{food.brandOwner}</div>
                )}
                <div className="text-sm text-gray-500">
                  <Leaf className="h-3 w-3 text-green-600 inline" />
                  Carbon Footprint: {footprint}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {meals.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Your Meals
          </h3>
          <ul className="space-y-2">
            {meals.map((meal, index) => (
              <li
                key={index}
                className="p-3 border rounded-lg bg-green-50 shadow-sm"
              >
                <div className="font-medium">{meal.description}</div>
                <div className="text-sm text-gray-500">
                  {meal.foodCategory || "Unknown Category"}
                </div>
                {meal.foodNutrients &&
                  meal.foodNutrients.find(
                    (n) => n.nutrientName === "Energy"
                  ) && (
                    <div className="text-sm text-gray-600">
                      Calories:{" "}
                      {
                        meal.foodNutrients.find(
                          (n) => n.nutrientName === "Energy"
                        )?.value
                      }{" "}
                      kcal
                    </div>
                  )}

                <div className="text-sm text-gray-500">
                  <Leaf className="h-3 w-3 text-green-600 inline" />
                  Carbon Footprint: {meal.carbonFootPrint}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
