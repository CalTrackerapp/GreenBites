export type CalorieHistoryItem = {
    date: string;
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
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<UserState, "user/setUser">, updateTotals: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<Omit<UserState, "username" | "gender" | "height" | "weight" | "calorieHistory">>, "user/updateTotals">, addCalorieEntry: import("@reduxjs/toolkit").ActionCreatorWithPayload<CalorieHistoryItem, "user/addCalorieEntry">, setCalorieHistory: import("@reduxjs/toolkit").ActionCreatorWithPayload<CalorieHistoryItem[], "user/setCalorieHistory">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/logout">;
declare const _default: import("redux").Reducer<UserSliceState>;
export default _default;
