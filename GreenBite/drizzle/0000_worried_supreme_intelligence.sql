CREATE TABLE "foodLog" (
	"logID" serial PRIMARY KEY NOT NULL,
	"userID" varchar NOT NULL,
	"foodID" varchar NOT NULL,
	"servingSize" integer NOT NULL,
	"loggedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "foods" (
	"foodID" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"calories" integer,
	"fatInGrams" integer,
	"proteinInGrams" integer,
	"carbsInGrams" integer,
	"CO2Expense" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"username" varchar PRIMARY KEY NOT NULL,
	"gender" char,
	"height" integer,
	"weight" integer,
	"bmi" numeric,
	"totalCalories" integer,
	"totalProtein" integer,
	"totalCarb" integer,
	"totalFats" integer,
	"calGoal" integer
);
--> statement-breakpoint
ALTER TABLE "foodLog" ADD CONSTRAINT "foodLog_userID_users_username_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("username") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foodLog" ADD CONSTRAINT "foodLog_foodID_foods_foodID_fk" FOREIGN KEY ("foodID") REFERENCES "public"."foods"("foodID") ON DELETE no action ON UPDATE no action;