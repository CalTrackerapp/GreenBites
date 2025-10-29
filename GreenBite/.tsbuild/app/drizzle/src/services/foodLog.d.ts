type FoodLogData = {
    logID: number;
    userID: string;
    foodID: string;
    servingSize: number;
};
export declare function getAllFoodLogs(): Promise<{
    logID: number;
    userID: string;
    foodID: string;
    servingSize: number;
    loggedAt: Date;
}[]>;
export declare function createFoodLogEntry(data: FoodLogData): Promise<{
    foodID: string;
    logID: number;
    userID: string;
    servingSize: number;
    loggedAt: Date;
}[]>;
export declare function deleteFoodLogEntry(logID: number): Promise<import("pg").QueryResult<never>>;
export {};
