import {
  pgTable,
  varchar,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  username: varchar("username", { length: 64 }).primaryKey(),
  gender: varchar("gender", { length: 10 }),
  height: integer("height"),
  weight: integer("weight"),
  bmi: integer("bmi"),
  calorieGoal: integer("calorieGoal"),
  totalCalories: integer("totalCalories"),
  totalProtein: integer("totalProtein"),
  totalCarbs: integer("totalCarbs"),
  totalFats: integer("totalFats"),
  totalSodium: integer("totalSodium"),
  totalCarbonFootPrint: integer("totalCarbonFootPrint"),
});

// Food Logs
export const foodLog = pgTable("foodLog", {
  logID: serial("logID").primaryKey(),
  userID: varchar("userID", { length: 64 })
    .notNull()
    .references(() => users.username),

  name: varchar("name", { length: 128 }),
  servingSize: integer("servingSize").notNull(),
  loggedAt: varchar("loggedAt", { length: 10 }),
  calories: integer("calories"),
  protein: integer("protein"),
  carbs: integer("carbs"),
  fats: integer("fats"),
  sodium: integer("sodium"),
  carbonFootPrintValue: integer("carbonFootPrintValue"),
});
