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
      //mealsToday: [],
    },
    {
      date: "2025-10-07",
      caloriesToday: 2100,
      proteinToday: 120,
      carbsToday: 260,
      fatsToday: 70,
      sodiumToday: 2200,
      carbonFootPrintToday: 9,
      //mealsToday: [],
    },
    {
      date: "2025-10-08",
      caloriesToday: 2500,
      proteinToday: 135,
      carbsToday: 290,
      fatsToday: 85,
      sodiumToday: 2400,
      carbonFootPrintToday: 11,
      //mealsToday: [],
    },
    {
      date: "2025-10-09",
      caloriesToday: 1900,
      proteinToday: 100,
      carbsToday: 240,
      fatsToday: 65,
      sodiumToday: 2100,
      carbonFootPrintToday: 8,
      //mealsToday: [],
    },
    {
      date: "2025-10-10",
      caloriesToday: 2750,
      proteinToday: 160,
      carbsToday: 320,
      fatsToday: 95,
      sodiumToday: 2600,
      carbonFootPrintToday: 12,
      //mealsToday: [],
    },
    {
      date: "2025-10-11",
      caloriesToday: 2400,
      proteinToday: 130,
      carbsToday: 300,
      fatsToday: 80,
      sodiumToday: 2300,
      carbonFootPrintToday: 10,
      //  mealsToday: [],
    },
    {
      date: "2025-10-12",
      caloriesToday: 1950,
      proteinToday: 105,
      carbsToday: 250,
      fatsToday: 65,
      sodiumToday: 2000,
      carbonFootPrintToday: 8,
      //mealsToday: [],
    },
    {
      date: "2025-10-13",
      caloriesToday: 2200,
      proteinToday: 115,
      carbsToday: 270,
      fatsToday: 75,
      sodiumToday: 2100,
      carbonFootPrintToday: 9,
      //mealsToday: [],
    },
    {
      date: "2025-10-14",
      caloriesToday: 2600,
      proteinToday: 140,
      carbsToday: 310,
      fatsToday: 85,
      sodiumToday: 2400,
      carbonFootPrintToday: 11,
      //mealsToday: [],
    },
    {
      date: "2025-10-15",
      caloriesToday: 2300,
      proteinToday: 125,
      carbsToday: 280,
      fatsToday: 80,
      sodiumToday: 2200,
      carbonFootPrintToday: 10,
      //mealsToday: [],
    },
    {
      date: "2025-10-16",
      caloriesToday: 3200,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 100,
      sodiumToday: 2600,
      carbonFootPrintToday: 13,
      //mealsToday: [],
    },
    {
      date: "2025-10-17",
      caloriesToday: 2700,
      proteinToday: 150,
      carbsToday: 310,
      fatsToday: 90,
      sodiumToday: 2500,
      carbonFootPrintToday: 11,
      //mealsToday: [],
    },
    {
      date: "2025-10-18",
      caloriesToday: 2000,
      proteinToday: 110,
      carbsToday: 260,
      fatsToday: 70,
      sodiumToday: 2000,
      carbonFootPrintToday: 9,
      //  mealsToday: [],
    },
    {
      date: "2025-10-19",
      caloriesToday: 2050,
      proteinToday: 165,
      carbsToday: 340,
      fatsToday: 95,
      sodiumToday: 2700,
      carbonFootPrintToday: 12,
      //  mealsToday: [],
    },
  ],
};

// =========================
// Actions
// =========================

type AddFoodLogAction = {
  type: "ADD_FOOD_LOG";
  payload: FoodLog;
};

type LoadUserAction = {
  type: "LOAD_USER";
  payload: Partial<User>;
};

type CreateUserAction = {
  type: "CREATE_USER";
  payload: Partial<User>;
};

type UpdateUserAttributesAction = {
  type: "UPDATE_USER_ATTRIBUTES";
  payload: Partial<User>;
};

type CalculateCalorieHistoryAction = {
  type: "CALCULATE_CALORIE_HISTORY";
  payload: CalorieHistoryItem[];
};

type Action =
  | AddFoodLogAction
  | LoadUserAction
  | CreateUserAction
  | UpdateUserAttributesAction
  | CalculateCalorieHistoryAction;

// =========================
// Context Value
// =========================

type UserContextValue = User & {
  createUser: (userData: Partial<User>) => void;
  updateUser: (updates: Partial<User>) => void;
  addFoodLog: (foodLog: FoodLog) => void;
  loadUser: (username: string) => void;
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
    case "ADD_FOOD_LOG": {
      const foodLog = action.payload;
      const existingIndex = state.calorieHistory.findIndex(
        (entry) => entry.date === foodLog.date
      );

      let updatedHistory: CalorieHistoryItem[];

      if (existingIndex !== -1) {
        // Update existing date entry
        updatedHistory = state.calorieHistory.map((entry, idx) =>
          idx === existingIndex
            ? {
                ...entry,
                caloriesToday: entry.caloriesToday + foodLog.calories,
                proteinToday: entry.proteinToday + foodLog.proteinInGrams,
                carbsToday: entry.carbsToday + foodLog.carbsInGrams,
                fatsToday: entry.fatsToday + foodLog.fatInGrams,
                sodiumToday: entry.sodiumToday + foodLog.sodiumInMg,
                carbonFootPrintValueToday:
                  entry.carbonFootPrintToday + foodLog.CO2Expense,
                //  mealsToday: [...entry.mealsToday, foodLog],
              }
            : entry
        );
      } else {
        // Create new date entry
        const newEntry: CalorieHistoryItem = {
          date: foodLog.date,
          caloriesToday: foodLog.calories,
          proteinToday: foodLog.proteinInGrams,
          carbsToday: foodLog.carbsInGrams,
          fatsToday: foodLog.fatInGrams,
          sodiumToday: foodLog.sodiumInMg,
          carbonFootPrintToday: foodLog.CO2Expense,
          //  mealsToday: [foodLog],
        };
        updatedHistory = [...state.calorieHistory, newEntry];
      }

      return {
        ...state,
        // totalMeals: [...state.totalMeals, foodLog],
        calorieHistory: updatedHistory,
        totalCalories: state.totalCalories + foodLog.calories,
        totalProtein: state.totalProtein + foodLog.proteinInGrams,
        totalCarbs: state.totalCarbs + foodLog.carbsInGrams,
        totalFats: state.totalFats + foodLog.fatInGrams,
        totalSodium: state.totalSodium + foodLog.sodiumInMg,
        totalCarbonFootPrint: state.totalCarbonFootPrint + foodLog.CO2Expense,
      };
    }

    case "LOAD_USER": {
      return { ...state, ...action.payload };
    }

    case "CREATE_USER": {
      return { ...state, ...action.payload };
    }

    case "UPDATE_USER_ATTRIBUTES": {
      return { ...state, ...action.payload };
    }
    case "CALCULATE_CALORIE_HISTORY": {
      return { ...state, ...action.payload };
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

  async function createUser(userData: Partial<User>) {
    /*   await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(userData),
    }); */

    // CALL loadUser on profile-setup page after createUser.

    dispatch({ type: "CREATE_USER", payload: userData });
  }

  async function updateUser(updates: Partial<User>) {
    /*     await fetch("/api/updateUser", {
      method: "PATCH",
      body: JSON.stringify(updates),
    }); */

    // CALL loadUser on Account page after update.

    dispatch({ type: "UPDATE_USER_ATTRIBUTES", payload: updates });
  }

  async function addFoodLog(foodLog: FoodLog) {
    /*     await fetch("/api/addFoodLog", {
      method: "PATCH",
      body: JSON.stringify(foodLog),
    }); */

    // CALL loadUser after addMeal in AddMeal.tsx

    dispatch({ type: "ADD_FOOD_LOG", payload: foodLog });
  }

  async function calculateCalorieHistoryByDate(username: string) {
    const lastSevenDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i); // subtract i days
      const formatted = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
      lastSevenDays.push(formatted);
    }

    const calorieHistory: CalorieHistoryItem[] = [];
    for (const date of lastSevenDays) {
      const res = await fetch("/api/calculateCalorieHistory", {
        method: "POST",
        body: JSON.stringify({ username, date }),
      });
      const calorieHistoryItem: CalorieHistoryItem = await res.json();
      calorieHistory.push(calorieHistoryItem);
    }
    dispatch({ type: "CALCULATE_CALORIE_HISTORY", payload: calorieHistory });
  }

  async function loadUser(username: string) {
    const res = await fetch("/api/getUser", {
      method: "POST",
      body: JSON.stringify({ username }),
    });

    const user = await res.json();

    dispatch({ type: "LOAD_USER", payload: user });

    calculateCalorieHistoryByDate(username);
  }

  const ctx: UserContextValue = {
    ...userState,
    addFoodLog,
    createUser,
    updateUser,
    loadUser,
  };

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}

// ========================= to do list =========================

// Change name of meal log to food log.
// create calculateCalorieHistory function.
