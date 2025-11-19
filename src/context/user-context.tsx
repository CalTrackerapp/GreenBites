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

/* name: nutritionData.name,
calories: Math.round(nutritionData.calories),
fatInGrams: Math.round(nutritionData.fat_total_g),
proteinInGrams: Math.round(nutritionData.protein_g),
carbsInGrams: Math.round(nutritionData.carbohydrates_total_g),
sodiumInMg: Math.round(nutritionData.sodium_mg),
CO2Expense */
export type MealLog = {
  name: string;
  date: string; // e.g., "2025-10-08"
  calories: number;
  proteinInGrams: number;
  carbsInGrams: number;
  fatInGrams: number;
  sodiumInMg: number;
  CO2Expense: number;
};

export type CalorieHistoryItem = {
  date: string;
  caloriesToday: number;
  proteinToday: number;
  carbsToday: number;
  fatsToday: number;
  sodiumToday: number;
  carbonFootPrintToday: number;
  mealsToday: MealLog[];
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

// =========================
// Initial State
// =========================
/* 
const initialState: User = {
  username: "",
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
 */

const initialState: User = {
  username: "TestUser",
  gender: "Male",
  height: 180,
  weight: 75,
  calorieGoal: 2500,
  //totalMeals: [],
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
      carbonFootPrintToday: 7,
      mealsToday: [],
    },
    {
      date: "2025-10-07",
      caloriesToday: 2100,
      proteinToday: 120,
      carbsToday: 260,
      fatsToday: 70,
      sodiumToday: 2200,
      carbonFootPrintToday: 9,
      mealsToday: [],
    },
    {
      date: "2025-10-08",
      caloriesToday: 2500,
      proteinToday: 135,
      carbsToday: 290,
      fatsToday: 85,
      sodiumToday: 2400,
      carbonFootPrintToday: 11,
      mealsToday: [],
    },
    {
      date: "2025-10-09",
      caloriesToday: 1900,
      proteinToday: 100,
      carbsToday: 240,
      fatsToday: 65,
      sodiumToday: 2100,
      carbonFootPrintToday: 8,
      mealsToday: [],
    },
    {
      date: "2025-10-10",
      caloriesToday: 2750,
      proteinToday: 160,
      carbsToday: 320,
      fatsToday: 95,
      sodiumToday: 2600,
      carbonFootPrintToday: 12,
      mealsToday: [],
    },
    {
      date: "2025-10-11",
      caloriesToday: 2400,
      proteinToday: 130,
      carbsToday: 300,
      fatsToday: 80,
      sodiumToday: 2300,
      carbonFootPrintToday: 10,
      mealsToday: [],
    },
    {
      date: "2025-10-12",
      caloriesToday: 1950,
      proteinToday: 105,
      carbsToday: 250,
      fatsToday: 65,
      sodiumToday: 2000,
      carbonFootPrintToday: 8,
      mealsToday: [],
    },
    {
      date: "2025-10-13",
      caloriesToday: 2200,
      proteinToday: 115,
      carbsToday: 270,
      fatsToday: 75,
      sodiumToday: 2100,
      carbonFootPrintToday: 9,
      mealsToday: [],
    },
    {
      date: "2025-10-14",
      caloriesToday: 2600,
      proteinToday: 140,
      carbsToday: 310,
      fatsToday: 85,
      sodiumToday: 2400,
      carbonFootPrintToday: 11,
      mealsToday: [],
    },
    {
      date: "2025-10-15",
      caloriesToday: 2300,
      proteinToday: 125,
      carbsToday: 280,
      fatsToday: 80,
      sodiumToday: 2200,
      carbonFootPrintToday: 10,
      mealsToday: [],
    },
    {
      date: "2025-10-16",
      caloriesToday: 3200,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 100,
      sodiumToday: 2600,
      carbonFootPrintToday: 13,
      mealsToday: [],
    },
    {
      date: "2025-10-17",
      caloriesToday: 2700,
      proteinToday: 150,
      carbsToday: 310,
      fatsToday: 90,
      sodiumToday: 2500,
      carbonFootPrintToday: 11,
      mealsToday: [],
    },
    {
      date: "2025-10-18",
      caloriesToday: 2000,
      proteinToday: 110,
      carbsToday: 260,
      fatsToday: 70,
      sodiumToday: 2000,
      carbonFootPrintToday: 9,
      mealsToday: [],
    },
    {
      date: "2025-10-19",
      caloriesToday: 2050,
      proteinToday: 165,
      carbsToday: 340,
      fatsToday: 95,
      sodiumToday: 2700,
      carbonFootPrintToday: 12,
      mealsToday: [],
    },
  ],
};

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
                proteinToday: entry.proteinToday + meal.proteinInGrams,
                carbsToday: entry.carbsToday + meal.carbsInGrams,
                fatsToday: entry.fatsToday + meal.fatInGrams,
                sodiumToday: entry.sodiumToday + meal.sodiumInMg,
                carbonFootPrintValueToday:
                  entry.carbonFootPrintToday + meal.CO2Expense,
                mealsToday: [...entry.mealsToday, meal],
              }
            : entry
        );
      } else {
        // Create new date entry
        const newEntry: CalorieHistoryItem = {
          date: meal.date,
          caloriesToday: meal.calories,
          proteinToday: meal.proteinInGrams,
          carbsToday: meal.carbsInGrams,
          fatsToday: meal.fatInGrams,
          sodiumToday: meal.sodiumInMg,
          carbonFootPrintToday: meal.CO2Expense,
          mealsToday: [meal],
        };
        updatedHistory = [...state.calorieHistory, newEntry];
      }

      return {
        ...state,
        // totalMeals: [...state.totalMeals, meal],
        calorieHistory: updatedHistory,
        totalCalories: state.totalCalories + meal.calories,
        totalProtein: state.totalProtein + meal.proteinInGrams,
        totalCarbs: state.totalCarbs + meal.carbsInGrams,
        totalFats: state.totalFats + meal.fatInGrams,
        totalSodium: state.totalSodium + meal.sodiumInMg,
        totalCarbonFootPrint: state.totalCarbonFootPrint + meal.CO2Expense,
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

  /*  useEffect(() => {
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

        // Map API response to User type
        // The API returns: gender, height, weight, calorieGoal, and other fields
        // We need to map it to the full User type with all required fields
        const userData: User = {
          username: userId || "",
          gender: data.gender || "",
          height: data.height || 0,
          weight: data.weight || 0,
          calorieGoal: data.calorieGoal || 0,
          totalMeals: [], // TODO: Load meals from database if needed
          totalCalories: data.totalCalories || 0,
          totalProtein: data.totalProtein || 0,
          totalCarbs: data.totalCarb || 0,
          totalFats: data.totalFats || 0,
          totalSodium: 0, // TODO: Add sodium tracking if needed
          totalCarbonFootPrint: data.totalCO2Expense || 0,
          calorieHistory: [], // TODO: Load calorie history from database if needed
        };

        dispatch({ type: "SET_USER", payload: userData });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Don't throw, just log the error - user can still use the app
      }
    }

    fetchUserData();
  }, [userId, isLoaded]); */
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
