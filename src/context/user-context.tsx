import { useEffect, useReducer, type ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import type { FoodLog, CalorieHistoryItem, User } from "./user-types";
import { UserContext } from "./user-context-value";

// =========================
// Initial State
// =========================

const initialState: User = {
  username: "",
  gender: "",
  height: 0,
  weight: 0,
  calorieGoal: 2500,
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  totalFats: 0,
  totalSodium: 0,
  totalCarbonFootPrint: 0,
  calorieHistory: [],
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

type AddTodayIfMissingAction = {
  type: "ADD_TODAY_IF_MISSING";
};

type Action =
  | AddFoodLogAction
  | LoadUserAction
  | CreateUserAction
  | UpdateUserAttributesAction
  | CalculateCalorieHistoryAction
  | AddTodayIfMissingAction;

// =========================
// Context Value
// =========================

export type UserContextValue = User & {
  createUser: (userData: Partial<User>) => void;
  updateUser: (updates: Partial<User>) => void;
  addFoodLog: (foodLog: FoodLog) => void;
  loadUser: (username: string) => void;
};

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
                carbonFootPrintToday:
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
      return { ...state, calorieHistory: action.payload };
    }

    case "ADD_TODAY_IF_MISSING": {
      const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
      const lastEntry = state.calorieHistory[state.calorieHistory.length - 1];

      // If no history exists or last entry is not today, add today's entry
      if (!lastEntry || lastEntry.date !== today) {
        const todayEntry: CalorieHistoryItem = {
          date: today,
          caloriesToday: 0,
          proteinToday: 0,
          carbsToday: 0,
          fatsToday: 0,
          sodiumToday: 0,
          carbonFootPrintToday: 0,
        };
        return {
          ...state,
          calorieHistory: [...state.calorieHistory, todayEntry],
        };
      }

      return state;
    }

    default:
      return state;
  }
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
  const { user: clerkUser, isLoaded } = useUser();

  // Load user data from API when Clerk user is loaded
  useEffect(() => {
    if (!isLoaded) return;

    if (clerkUser?.id) {
      // User is logged in, load their data from API
      loadUser(clerkUser.id);
    } else {
      // User is not logged in, reset to initial state
      dispatch({ type: "LOAD_USER", payload: initialState });
    }
  }, [clerkUser?.id, isLoaded]);

  // Clear localStorage on logout

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
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          gender: userData.gender,
          height: userData.height,
          weight: userData.weight,
          calorieGoal: userData.calorieGoal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create user");
      }

      // After creating user, load their data
      if (userData.username) {
        await loadUser(userData.username);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async function updateUser(updatedUserAttributes: Partial<User>) {
    if (!clerkUser?.id) {
      throw new Error("User must be logged in to update profile");
    }

    try {
      const response = await fetch("/api/updateUser", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: clerkUser.id,
          gender: updatedUserAttributes.gender,
          height: updatedUserAttributes.height,
          weight: updatedUserAttributes.weight,
          calorieGoal: updatedUserAttributes.calorieGoal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update user");
      }

      // Reload user data to get latest values
      await loadUser(clerkUser.id);

      // Also update local state for immediate UI feedback
      dispatch({
        type: "UPDATE_USER_ATTRIBUTES",
        payload: updatedUserAttributes,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async function addFoodLog(foodLog: FoodLog) {
    if (!clerkUser?.id) {
      throw new Error("User must be logged in to add food log");
    }

    try {
      const response = await fetch("/api/addFoodLog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: clerkUser.id,
          name: foodLog.name,
          date: foodLog.date,
          calories: foodLog.calories,
          proteinInGrams: foodLog.proteinInGrams,
          carbsInGrams: foodLog.carbsInGrams,
          fatInGrams: foodLog.fatInGrams,
          sodiumInMg: foodLog.sodiumInMg,
          CO2Expense: foodLog.CO2Expense,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to add food log");
      }

      // Reload user data to get updated totals from database
      // This ensures we have the correct totals that match the database
      await loadUser(clerkUser.id);
    } catch (error) {
      console.error("Error adding food log:", error);
      throw error;
    }
  }

  async function loadUser(username: string) {
    try {
      const response = await fetch("/api/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        // If user doesn't exist, that's okay - they might need to create profile
        if (response.status === 404) {
          dispatch({
            type: "LOAD_USER",
            payload: { ...initialState, username },
          });
          return;
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to load user");
      }

      const user = await response.json();

      // Map API response to User type
      const userData: User = {
        username: user.username || username,
        gender: user.gender || "",
        height: user.height || 0,
        weight: user.weight || 0,
        calorieGoal: user.calorieGoal || 2500,
        totalCalories: user.totalCalories || 0,
        totalProtein: user.totalProtein || 0,
        totalCarbs: user.totalCarbs || 0,
        totalFats: user.totalFats || 0,
        totalSodium: user.totalSodium || 0,
        totalCarbonFootPrint: user.totalCarbonFootPrint || 0,
        calorieHistory: user.calorieHistory || [],
      };

      dispatch({ type: "LOAD_USER", payload: userData });
    } catch (error) {
      console.error("Error loading user:", error);
      // Don't throw - just log the error
    }
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
