import { useEffect, useReducer, type ReactNode } from "react";
import type { FoodLog, CalorieHistoryItem, User } from "./user-types";
import { UserContext } from "./user-context-value";

// =========================
// Initial State
// =========================

const initialState: User = {
  username: "",
  gender: "Male",
  height: 70,
  weight: 180,
  calorieGoal: 2500,
  // totalMeals: [],
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

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("userState");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_USER", payload: parsed });

        // After loading, ensure today's entry exists
        const today = new Date().toISOString().split("T")[0];
        const lastEntry =
          parsed.calorieHistory?.[parsed.calorieHistory.length - 1];

        if (!lastEntry || lastEntry.date !== today) {
          dispatch({ type: "ADD_TODAY_IF_MISSING" });
        }
      } else {
        // If no saved state, ensure today's entry exists for initial state
        dispatch({ type: "ADD_TODAY_IF_MISSING" });
      }
    } catch (err) {
      console.error("Failed to load userState from localStorage", err);
      // Even on error, ensure today's entry exists
      dispatch({ type: "ADD_TODAY_IF_MISSING" });
    }
  }, []);

  // Save to localStorage automatically when userState changes
  useEffect(() => {
    try {
      localStorage.setItem("userState", JSON.stringify(userState));
    } catch (err) {
      console.error("Failed to save userState to localStorage", err);
    }
  }, [userState]);

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
    /*   await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(userData),
    }); */

    // CALL loadUser on profile-setup page after createUser.

    dispatch({ type: "CREATE_USER", payload: userData });
  }

  async function updateUser(updatedUserAttributes: Partial<User>) {
    /*     await fetch("/api/updateUser", {
      method: "PATCH",
      body: JSON.stringify(updatedUserAttributes),
    }); */

    // CALL loadUser on Account page after update.

    dispatch({
      type: "UPDATE_USER_ATTRIBUTES",
      payload: updatedUserAttributes,
    });
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
