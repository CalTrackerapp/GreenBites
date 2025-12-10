/* eslint-disable react-refresh/only-export-components */
import { useAuth } from "@clerk/nextjs";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

// =========================
// Types
// =========================

export type MealLog = {
  name: string;
  date: string; // e.g., "2025-10-08"
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sodium: number;
  carbonFootPrintValue: number;
};

export type CalorieHistoryItem = {
  date: string;
  caloriesToday: number;
  proteinToday: number;
  carbsToday: number;
  fatsToday: number;
  sodiumToday: number;
  carbonFootPrintValueToday: number;
  mealsToday: MealLog[];
};

export type User = {
  gender: string;
  height: number;
  weight: number;
  calorieGoal: number;
  totalMeals: MealLog[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalSodium: number;
  totalCarbonFootPrint: number;
  calorieHistory: CalorieHistoryItem[];
};

// =========================
// Initial State
// =========================

const initialState: User = {
  gender: "",
  height: 0,
  weight: 0,
  calorieGoal: 0,
  totalMeals: [],
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  totalFats: 0,
  totalSodium: 0,
  totalCarbonFootPrint: 0,
  calorieHistory: [],
};

/* 
const initialState: User = {
  username: "TestUser",
  gender: "Male",
  height: 180,
  weight: 75,
  calorieGoal: 2500,
  totalMeals: [],
  totalCalories: 5200,
  totalProtein: 280,
  totalCarbs: 600,
  totalFats: 180,
  totalSodium: 3000,
  totalCarbonFootPrint: 25,
  calorieHistory: [
    {
      date: "2025-10-06",
      caloriesToday: 1800,
      proteinToday: 95,
      carbsToday: 230,
      fatsToday: 60,
      sodiumToday: 1800,
      carbonFootPrintValueToday: 7,
      mealsToday: [],
    },
    {
      date: "2025-10-07",
      caloriesToday: 2100,
      proteinToday: 120,
      carbsToday: 260,
      fatsToday: 70,
      sodiumToday: 2200,
      carbonFootPrintValueToday: 9,
      mealsToday: [],
    },
    {
      date: "2025-10-08",
      caloriesToday: 2500,
      proteinToday: 135,
      carbsToday: 290,
      fatsToday: 85,
      sodiumToday: 2400,
      carbonFootPrintValueToday: 11,
      mealsToday: [],
    },
    {
      date: "2025-10-09",
      caloriesToday: 1900,
      proteinToday: 100,
      carbsToday: 240,
      fatsToday: 65,
      sodiumToday: 2100,
      carbonFootPrintValueToday: 8,
      mealsToday: [],
    },
    {
      date: "2025-10-10",
      caloriesToday: 2750,
      proteinToday: 160,
      carbsToday: 320,
      fatsToday: 95,
      sodiumToday: 2600,
      carbonFootPrintValueToday: 12,
      mealsToday: [],
    },
    {
      date: "2025-10-11",
      caloriesToday: 2400,
      proteinToday: 130,
      carbsToday: 300,
      fatsToday: 80,
      sodiumToday: 2300,
      carbonFootPrintValueToday: 10,
      mealsToday: [],
    },
    {
      date: "2025-10-12",
      caloriesToday: 1950,
      proteinToday: 105,
      carbsToday: 250,
      fatsToday: 65,
      sodiumToday: 2000,
      carbonFootPrintValueToday: 8,
      mealsToday: [],
    },
    {
      date: "2025-10-13",
      caloriesToday: 2200,
      proteinToday: 115,
      carbsToday: 270,
      fatsToday: 75,
      sodiumToday: 2100,
      carbonFootPrintValueToday: 9,
      mealsToday: [],
    },
    {
      date: "2025-10-14",
      caloriesToday: 2600,
      proteinToday: 140,
      carbsToday: 310,
      fatsToday: 85,
      sodiumToday: 2400,
      carbonFootPrintValueToday: 11,
      mealsToday: [],
    },
    {
      date: "2025-10-15",
      caloriesToday: 2300,
      proteinToday: 125,
      carbsToday: 280,
      fatsToday: 80,
      sodiumToday: 2200,
      carbonFootPrintValueToday: 10,
      mealsToday: [],
    },
    {
      date: "2025-10-16",
      caloriesToday: 3200,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 100,
      sodiumToday: 2600,
      carbonFootPrintValueToday: 13,
      mealsToday: [],
    },
    {
      date: "2025-10-17",
      caloriesToday: 2700,
      proteinToday: 150,
      carbsToday: 310,
      fatsToday: 90,
      sodiumToday: 2500,
      carbonFootPrintValueToday: 11,
      mealsToday: [],
    },
    {
      date: "2025-10-18",
      caloriesToday: 2000,
      proteinToday: 110,
      carbsToday: 260,
      fatsToday: 70,
      sodiumToday: 2000,
      carbonFootPrintValueToday: 9,
      mealsToday: [],
    },
    {
      date: "2025-10-19",
      caloriesToday: 3050,
      proteinToday: 165,
      carbsToday: 340,
      fatsToday: 95,
      sodiumToday: 2700,
      carbonFootPrintValueToday: 12,
      mealsToday: [],
    },
  ],
}; */

// =========================
// Actions
// =========================

type AddCalorieEntryAction = {
  type: "ADD_CALORIE_ENTRY";
  payload: MealLog;
};

type SetUserAction = {
  type: "SET_USER";
  payload: User;
};

type Action = AddCalorieEntryAction | SetUserAction;

// =========================
// Context Value
// =========================

type UserContextValue = User & {
  addCalorieEntry: (meal: MealLog) => void;
  setUser: (user: User) => void;
};

// =========================
// Create Context
// =========================

const UserContext = createContext<UserContextValue | null>(null);

// =========================
// Reducer
// =========================

function userReducer(state: User, action: Action): User {
  switch (action.type) {
    case "ADD_CALORIE_ENTRY": {
      const meal = action.payload;
      const existingIndex = state.calorieHistory.findIndex(
        (entry) => entry.date === meal.date
      );

      let updatedHistory: CalorieHistoryItem[];

      if (existingIndex !== -1) {
        // Update existing date entry
        updatedHistory = state.calorieHistory.map((entry, idx) =>
          idx === existingIndex
            ? {
                ...entry,
                caloriesToday: entry.caloriesToday + meal.calories,
                proteinToday: entry.proteinToday + meal.protein,
                carbsToday: entry.carbsToday + meal.carbs,
                fatsToday: entry.fatsToday + meal.fats,
                sodiumToday: entry.sodiumToday + meal.sodium,
                carbonFootPrintValueToday:
                  entry.carbonFootPrintValueToday + meal.carbonFootPrintValue,
                mealsToday: [...entry.mealsToday, meal],
              }
            : entry
        );
      } else {
        // Create new date entry
        const newEntry: CalorieHistoryItem = {
          date: meal.date,
          caloriesToday: meal.calories,
          proteinToday: meal.protein,
          carbsToday: meal.carbs,
          fatsToday: meal.fats,
          sodiumToday: meal.sodium,
          carbonFootPrintValueToday: meal.carbonFootPrintValue,
          mealsToday: [meal],
        };
        updatedHistory = [...state.calorieHistory, newEntry];
      }

      return {
        ...state,
        totalMeals: [...state.totalMeals, meal],
        calorieHistory: updatedHistory,
        totalCalories: state.totalCalories + meal.calories,
        totalProtein: state.totalProtein + meal.protein,
        totalCarbs: state.totalCarbs + meal.carbs,
        totalFats: state.totalFats + meal.fats,
        totalSodium: state.totalSodium + meal.sodium,
        totalCarbonFootPrint:
          state.totalCarbonFootPrint + meal.carbonFootPrintValue,
      };
    }

    case "SET_USER": {
      // PLACE API CALL TO UPDATE USER
      return action.payload;
    }

    default:
      return state;
  }
}

// =========================
// Hook
// =========================

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a <UserContextProvider />"
    );
  }
  return context;
}

// =========================
// Provider
// =========================

type UserContextProviderProps = {
  children: ReactNode;
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const { userId, isLoaded } = useAuth();
  
  useEffect(() => {
    async function fetchUserData() {
      // Wait for Clerk to finish loading
      if (!isLoaded) return;
      
      // If user is not signed in, reset to initial state
      if (!userId) {
        dispatch({ type: "SET_USER", payload: initialState });
        return;
      }

      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (!res.ok) {
          // If error, just log it and keep initial state
          console.error("Error fetching user data:", data.error);
          return;
        }

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch today's calorie history from database
        let todayHistory: CalorieHistoryItem | null = null;
        try {
          const historyRes = await fetch(`/api/users/${userId}/calorie-history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: today }),
          });
          
          if (historyRes.ok) {
            const historyData = await historyRes.json();
            // Always create today's history entry from database (even if all values are 0)
            // This ensures the dashboard can display current day data properly
            todayHistory = {
              date: today,
              caloriesToday: historyData.caloriesToday || 0,
              proteinToday: historyData.proteinToday || 0,
              carbsToday: historyData.carbsToday || 0,
              fatsToday: historyData.fatsToday || 0,
              sodiumToday: historyData.sodiumToday || 0,
              carbonFootPrintValueToday: historyData.carbonFootPrintValueToday || 0,
              mealsToday: [], // Individual meals can be loaded separately if needed
            };
          }
        } catch (error) {
          console.error("Error fetching calorie history:", error);
          // Continue without today's history if it fails - user can still use the app
        }

        // Map API response to User type
        // The API returns: gender, height, weight, calorieGoal, and other fields
        // We need to map it to the full User type with all required fields
        const userData: User = {
          gender: data.gender || "",
          height: data.height || 0,
          weight: data.weight || 0,
          calorieGoal: data.calorieGoal || 0,
          totalMeals: [], // TODO: Load meals from database if needed
          totalCalories: data.totalCalories || 0,
          totalProtein: data.totalProtein || 0,
          totalCarbs: data.totalCarb || 0,
          totalFats: data.totalFats || 0,
          totalSodium: data.totalSodium || 0,
          totalCarbonFootPrint: data.totalCO2Expense || 0,
          calorieHistory: todayHistory ? [todayHistory] : [], // Load today's history from database
        };

        dispatch({ type: "SET_USER", payload: userData });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Don't throw, just log the error - user can still use the app
      }
    }

    fetchUserData();
  }, [userId, isLoaded]);
  const ctx: UserContextValue = {
    ...userState,
    addCalorieEntry(meal) {
      dispatch({ type: "ADD_CALORIE_ENTRY", payload: meal });
    },
    setUser(user) {
      dispatch({ type: "SET_USER", payload: user });
    },
  };

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
