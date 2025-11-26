// =========================
// User Context Types
// =========================

export type FoodLog = {
  name: string;
  date: string; // e.g., "2025-10-08"
  calories: number;
  proteinInGrams: number;
  carbsInGrams: number;
  fatInGrams: number;
  sodiumInMg: number;
  CO2Expense: number;
  servingSize: number;
};

export type CalorieHistoryItem = {
  date: string;
  caloriesToday: number;
  proteinToday: number;
  carbsToday: number;
  fatsToday: number;
  sodiumToday: number;
  carbonFootPrintToday: number;
  //mealsToday: MealLog[];
};

export type User = {
  username: string;
  gender: string;
  height: number;
  weight: number;
  calorieGoal: number;
  //totalMeals: MealLog[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalSodium: number;
  totalCarbonFootPrint: number;
  calorieHistory: CalorieHistoryItem[];
};

