import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CalorieHistoryItem = {
  date: string; // e.g. "2025-10-08"
  caloriesToday: number;
  protein: number;
  carb: number;
  fats: number;
  carbonFootPrintValue: number;
};

export type UserState = {
  username: string;
  gender: string;
  height: number;
  weight: number;
  calorieGoal: number;
  totalCalories: number;
  totalProtein: number;
  totalCarb: number;
  totalFats: number;
  totalCarbonFootPrint: number;
  calorieHistory: CalorieHistoryItem[];
};

type UserSliceState = {
  user: UserState | null;
  loading: boolean;
  error: string | null;
};

// Default user for testing
const testUser: UserState = {
  username: "JohnDoe",
  gender: "Male",
  height: 180,
  weight: 75,
  calorieGoal: 2500,
  totalCalories: 2200,
  totalProtein: 160,
  totalCarb: 250,
  totalFats: 70,
  totalCarbonFootPrint: 18.5,
  calorieHistory: [
    {
      date: "2025-10-01",
      caloriesToday: 2400,
      protein: 150,
      carb: 260,
      fats: 65,
      carbonFootPrintValue: 19.2,
    },
    {
      date: "2025-10-02",
      caloriesToday: 2300,
      protein: 155,
      carb: 240,
      fats: 60,
      carbonFootPrintValue: 18.8,
    },
    {
      date: "2025-10-03",
      caloriesToday: 2500,
      protein: 170,
      carb: 270,
      fats: 75,
      carbonFootPrintValue: 19.0,
    },
    {
      date: "2025-10-04",
      caloriesToday: 2000,
      protein: 130,
      carb: 220,
      fats: 55,
      carbonFootPrintValue: 17.5,
    },
    {
      date: "2025-10-05",
      caloriesToday: 2700,
      protein: 180,
      carb: 300,
      fats: 80,
      carbonFootPrintValue: 19.9,
    },
    {
      date: "2025-10-06",
      caloriesToday: 2600,
      protein: 165,
      carb: 280,
      fats: 78,
      carbonFootPrintValue: 19.4,
    },
    {
      date: "2025-10-07",
      caloriesToday: 2550,
      protein: 160,
      carb: 275,
      fats: 76,
      carbonFootPrintValue: 19.1,
    },
  ],
};

const initialState: UserSliceState = {
  user: testUser,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    updateTotals: (
      state,
      action: PayloadAction<
        Partial<
          Omit<
            UserState,
            "username" | "gender" | "height" | "weight" | "calorieHistory"
          >
        >
      >
    ) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
    addCalorieEntry: (state, action: PayloadAction<CalorieHistoryItem>) => {
      if (state.user) {
        const existingIndex = state.user.calorieHistory.findIndex(
          (entry) => entry.date === action.payload.date
        );
        if (existingIndex >= 0) {
          state.user.calorieHistory[existingIndex] = action.payload;
        } else {
          state.user.calorieHistory.push(action.payload);
        }
      }
    },
    setCalorieHistory: (state, action: PayloadAction<CalorieHistoryItem[]>) => {
      if (state.user) {
        state.user.calorieHistory = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUser,
  updateTotals,
  addCalorieEntry,
  setCalorieHistory,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
