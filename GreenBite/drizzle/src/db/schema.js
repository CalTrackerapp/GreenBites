"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodLog = exports.foods = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
// Users table
exports.users = (0, pg_core_1.pgTable)("users", {
    username: (0, pg_core_1.varchar)("username").primaryKey(),
    gender: (0, pg_core_1.char)("gender"),
    height: (0, pg_core_1.integer)("height"),
    weight: (0, pg_core_1.integer)("weight"),
    bmi: (0, pg_core_1.numeric)("bmi"),
    totalCalories: (0, pg_core_1.integer)("totalCalories"),
    totalProtein: (0, pg_core_1.integer)("totalProtein"),
    totalCarb: (0, pg_core_1.integer)("totalCarb"),
    totalFats: (0, pg_core_1.integer)("totalFats"),
    calGoal: (0, pg_core_1.integer)("calGoal"),
});
// Foods table
exports.foods = (0, pg_core_1.pgTable)("foods", {
    foodID: (0, pg_core_1.varchar)("foodID").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
    calories: (0, pg_core_1.integer)("calories"),
    fatInGrams: (0, pg_core_1.integer)("fatInGrams"),
    proteinInGrams: (0, pg_core_1.integer)("proteinInGrams"),
    carbsInGrams: (0, pg_core_1.integer)("carbsInGrams"),
    CO2Expense: (0, pg_core_1.integer)("CO2Expense"),
});
// FoodLog table
exports.foodLog = (0, pg_core_1.pgTable)("foodLog", {
    logID: (0, pg_core_1.serial)("logID").primaryKey(),
    userID: (0, pg_core_1.varchar)("userID").notNull().references(function () { return exports.users.username; }),
    foodID: (0, pg_core_1.varchar)("foodID").notNull().references(function () { return exports.foods.foodID; }),
    servingSize: (0, pg_core_1.integer)("servingSize").notNull(),
    loggedAt: (0, pg_core_1.timestamp)("loggedAt", { withTimezone: true }).defaultNow().notNull()
});
