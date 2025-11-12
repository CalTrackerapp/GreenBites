import {
  pgTable,
  varchar,
  integer,
  numeric,
  char,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  username: varchar("username").primaryKey(),
  gender: varchar("gender"), // Changed from char to varchar to support "Male" and "Female"
  height: integer("height"),
  weight: integer("weight"),
  bmi: numeric("bmi"),
  totalCalories: integer("totalCalories"),
  totalProtein: integer("totalProtein"),
  totalCarb: integer("totalCarb"),
  totalFats: integer("totalFats"),
  totalCO2Expense: integer("totalCO2Expense"),
  calGoal: integer("calGoal"),
});

// Foods table
export const foods = pgTable("foods", {
  foodID: varchar("foodID").primaryKey(),
  name: varchar("name"),
  calories: integer("calories"),
  fatInGrams: integer("fatInGrams"),
  proteinInGrams: integer("proteinInGrams"),
  carbsInGrams: integer("carbsInGrams"),
  CO2Expense: integer("CO2Expense"),
});

// FoodLog table
export const foodLog = pgTable("foodLog", {
  logID: serial("logID").primaryKey(),
  userID: varchar("userID")
    .notNull()
    .references(() => users.username),
  foodID: varchar("foodID")
    .notNull()
    .references(() => foods.foodID),
  servingSize: integer("servingSize").notNull(),
  loggedAt: timestamp("loggedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
