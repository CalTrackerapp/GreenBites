type FoodData = {
    foodID: string;
    name: string;
    calories: number;
    fatInGrams: number;
    proteinInGrams: number;
    carbsInGrams: number;
    CO2Expense: number;
};
export declare function getAllFoods(): Promise<{
    foodID: string;
    name: string | null;
    calories: number | null;
    fatInGrams: number | null;
    proteinInGrams: number | null;
    carbsInGrams: number | null;
    CO2Expense: number | null;
}[]>;
export declare function getFood(id: String): Promise<{
    foodID: string;
    name: string | null;
    calories: number | null;
    fatInGrams: number | null;
    proteinInGrams: number | null;
    carbsInGrams: number | null;
    CO2Expense: number | null;
}[]>;
export declare function createFood(data: FoodData): Promise<{
    name: string | null;
    calories: number | null;
    foodID: string;
    fatInGrams: number | null;
    proteinInGrams: number | null;
    carbsInGrams: number | null;
    CO2Expense: number | null;
}>;
export declare function deleteFood(foodID: string): Promise<import("pg").QueryResult<never>>;
export type NutritionAPIResponse = {
    items: Array<{
        name: string;
        calories: number;
        serving_size_g: number;
        fat_total_g: number;
        fat_saturated_g: number;
        protein_g: number;
        sodium_mg: number;
        potassium_mg: number;
        cholesterol_mg: number;
        carbohydrates_total_g: number;
        fiber_g: number;
        sugar_g: number;
    }>;
};
export declare function searchNutrition(query: string): Promise<NutritionAPIResponse>;
export declare function createFoodFromNutrition(nutritionData: NutritionAPIResponse['items'][0], userID: string): Promise<any>;
export {};
