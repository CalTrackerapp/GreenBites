import { createContext, useContext, useReducer, type ReactNode } from "react";

export type CalorieHistoryItem = {
  date: string; // e.g., "2025-10-08"
  caloriesToday: number;
  proteinToday: number;
  carbsToday: number;
  fatsToday: number;
  carbonFootPrintValueToday: number;
};

export type MealItem = {
  date: string; // e.g., "2025-10-08"
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  carbonFootPrintValue: number;
};

export type User = {
  username: string;
  gender: string;
  height: number;
  weight: number;
  calorieGoal: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCarbonFootPrint: number;
  calorieHistory: CalorieHistoryItem[];
};

// === Initial State for testing ===
const initialState: User = {
  username: "TestUser",
  gender: "Male",
  height: 180,
  weight: 75,
  calorieGoal: 2500,
  totalCalories: 5200,
  totalProtein: 280,
  totalCarbs: 600,
  totalFats: 180,
  totalCarbonFootPrint: 25,
  calorieHistory: [
    {
      date: "2025-10-13",
      caloriesToday: 2200,
      proteinToday: 110,
      carbsToday: 250,
      fatsToday: 70,
      carbonFootPrintValueToday: 8,
    },
    {
      date: "2025-10-14",
      caloriesToday: 1000,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 110,
      carbonFootPrintValueToday: 10,
    },
    {
      date: "2025-10-15",
      caloriesToday: 2000,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 110,
      carbonFootPrintValueToday: 10,
    },
    {
      date: "2025-10-16",
      caloriesToday: 3230,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 110,
      carbonFootPrintValueToday: 10,
    },
    {
      date: "2025-10-17",
      caloriesToday: 1500,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 110,
      carbonFootPrintValueToday: 10,
    },
    {
      date: "2025-10-18",
      caloriesToday: 1200,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 110,
      carbonFootPrintValueToday: 10,
    },
    {
      date: "2025-10-19",
      caloriesToday: 3000,
      proteinToday: 170,
      carbsToday: 350,
      fatsToday: 110,
      carbonFootPrintValueToday: 10,
    },
  ],
};

type AddCalorieEntryAction = {
  type: "ADD_CALORIE_ENTRY";
  payload: MealItem;
};

type Action = AddCalorieEntryAction;

// Context Value
type UserContextValue = User & {
  addCalorieEntry: (meal: MealItem) => void;
};

//  Create Context
const UserContext = createContext<UserContextValue | null>(null);

// Reducer
function userReducer(state: User, action: Action): User {
  switch (action.type) {
    case "ADD_CALORIE_ENTRY": {
      const meal = action.payload;
      const existingEntryIndex = state.calorieHistory.findIndex(
        (entry) => entry.date === meal.date
      );

      let updatedHistory: CalorieHistoryItem[];

      if (existingEntryIndex !== -1) {
        // Date exists → add meal values to that date
        updatedHistory = state.calorieHistory.map((entry, idx) =>
          idx === existingEntryIndex
            ? {
                ...entry,
                caloriesToday: entry.caloriesToday + meal.calories,
                proteinToday: entry.proteinToday + meal.protein,
                carbsToday: entry.carbsToday + meal.carbs,
                fatsToday: entry.fatsToday + meal.fats,
                carbonFootPrintValueToday:
                  entry.carbonFootPrintValueToday + meal.carbonFootPrintValue,
              }
            : entry
        );
      } else {
        // Date does not exist → create new entry
        const newEntry: CalorieHistoryItem = {
          date: meal.date,
          caloriesToday: meal.calories,
          proteinToday: meal.protein,
          carbsToday: meal.carbs,
          fatsToday: meal.fats,
          carbonFootPrintValueToday: meal.carbonFootPrintValue,
        };
        updatedHistory = [...state.calorieHistory, newEntry];
      }

      return {
        ...state,
        calorieHistory: updatedHistory,
        totalCalories: state.totalCalories + meal.calories,
        totalProtein: state.totalProtein + meal.protein,
        totalCarbs: state.totalCarbs + meal.carbs,
        totalFats: state.totalFats + meal.fats,
        totalCarbonFootPrint:
          state.totalCarbonFootPrint + meal.carbonFootPrintValue,
      };
    }

    default:
      return state;
  }
}

// Hook
export function useUserContext() {
  const userCtx = useContext(UserContext);
  if (userCtx === null)
    throw new Error(
      "UserContext is null — wrap your component in UserContextProvider!"
    );
  return userCtx;
}

// Provider
type UserContextProviderProps = {
  children: ReactNode;
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const ctx: UserContextValue = {
    ...userState,
    addCalorieEntry(meal) {
      dispatch({ type: "ADD_CALORIE_ENTRY", payload: meal });
    },
  };

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
