type UserData = {
    name: string;
    gender: string;
    height: number;
    weight: number;
    calGoal: number;
};
export declare function getAllUsers(): Promise<{
    username: string;
    gender: string | null;
    height: number | null;
    weight: number | null;
    bmi: string | null;
    totalCalories: number | null;
    totalProtein: number | null;
    totalCarb: number | null;
    totalFats: number | null;
    totalCO2Expense: number | null;
    calGoal: number | null;
}[]>;
export declare function createUser(data: UserData): Promise<{
    username: string;
    gender: string | null;
    height: number | null;
    weight: number | null;
    totalCalories: number | null;
    totalProtein: number | null;
    totalCarb: number | null;
    totalFats: number | null;
    bmi: string | null;
    totalCO2Expense: number | null;
    calGoal: number | null;
}[]>;
export declare function deleteUser(username: string): Promise<import("pg").QueryResult<never>>;
export declare function getUser(username: string): Promise<{
    username: string;
    gender: string | null;
    height: number | null;
    weight: number | null;
    bmi: string | null;
    totalCalories: number | null;
    totalProtein: number | null;
    totalCarb: number | null;
    totalFats: number | null;
    totalCO2Expense: number | null;
    calGoal: number | null;
}>;
export {};
