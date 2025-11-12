import { pgTable, varchar, integer, numeric, timestamp, serial } from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  username: varchar("username", { length: 64 }).primaryKey(),
  gender: varchar("gender", { length: 10 }),
  height: integer("height"),
  weight: integer("weight"),
  bmi: numeric("bmi"),
  calorieGoal: integer("calorieGoal"),
  totalCalories: integer("totalCalories"),
  totalProtein: integer("totalProtein"),
  totalCarbs: integer("totalCarbs"),
  totalFats: integer("totalFats"),
  totalSodium: integer("totalSodium"),
  totalCarbonFootPrint: integer("totalCarbonFootPrint"),
});

// Foods
export const foods = pgTable("foods", {
  foodID: varchar("foodID", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 128 }),
  calories: integer("calories"),
  fatInGrams: integer("fatInGrams"),
  proteinInGrams: integer("proteinInGrams"),
  carbsInGrams: integer("carbsInGrams"),
  sodiumInMg: integer("sodiumInMg"),
  CO2Expense: integer("CO2Expense"),
});

// Food Logs
export const foodLog = pgTable("foodLog", {
  logID: serial("logID").primaryKey(),
  userID: varchar("userID", { length: 64 }).notNull().references(() => users.username),
  foodID: varchar("foodID", { length: 64 }).notNull().references(() => foods.foodID),
  name: varchar("name", { length: 128 }),
  servingSize: integer("servingSize").notNull(),
  loggedAt: timestamp("loggedAt", { withTimezone: true }).defaultNow().notNull(),
  calories: integer("calories"),
  protein: integer("protein"),
  carbs: integer("carbs"),
  fats: integer("fats"),
  sodium: integer("sodium"),
  carbonFootPrintValue: integer("carbonFootPrintValue"),
});
