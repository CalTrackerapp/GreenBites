import { type ReactNode } from "react";
export type MealLog = {
    name: string;
    date: string;
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
    username: string;
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
type UserContextValue = User & {
    addCalorieEntry: (meal: MealLog) => void;
};
export declare function useUserContext(): UserContextValue;
type UserContextProviderProps = {
    children: ReactNode;
};
export default function UserContextProvider({ children, }: UserContextProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
