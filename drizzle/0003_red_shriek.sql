ALTER TABLE "users" RENAME COLUMN "calGoal" TO "calorieGoal";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "totalCarb" TO "totalCarbs";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "totalCO2Expense" TO "totalCarbonFootPrint";--> statement-breakpoint
ALTER TABLE "foodLog" ALTER COLUMN "userID" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "foodLog" ALTER COLUMN "foodID" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "foods" ALTER COLUMN "foodID" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "foods" ALTER COLUMN "name" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "gender" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "foodLog" ADD COLUMN "name" varchar(128);--> statement-breakpoint
ALTER TABLE "foodLog" ADD COLUMN "calories" integer;--> statement-breakpoint
ALTER TABLE "foodLog" ADD COLUMN "protein" integer;--> statement-breakpoint
ALTER TABLE "foodLog" ADD COLUMN "carbs" integer;--> statement-breakpoint
ALTER TABLE "foodLog" ADD COLUMN "fats" integer;--> statement-breakpoint
ALTER TABLE "foodLog" ADD COLUMN "sodium" integer;--> statement-breakpoint
ALTER TABLE "foodLog" ADD COLUMN "carbonFootPrintValue" integer;--> statement-breakpoint
ALTER TABLE "foods" ADD COLUMN "sodiumInMg" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "totalSodium" integer;