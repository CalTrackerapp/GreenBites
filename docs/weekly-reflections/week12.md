# Week 12 Reflection (Nov 19-25, 2025)

## Learning
- API specification design and implementation
- RESTful API best practices (POST, GET, PATCH methods)
- Backend route organization and structure
- Date-based calorie history calculation
- Service layer refactoring to match API specifications
- BMI calculation and automatic updates
- FoodID reuse strategy (using name as foodID)

## Challenges
- Defining clear API specifications for frontend-backend integration
- Implementing calculateCalorieHistoryByDate with date filtering
- Ensuring all services and routes adhere to the new API spec
- Coordinating route structure changes across team
- Updating addFoodLogEntry to match new specification
- Moving calorie-history route to proper nested structure
- Testing Supabase functionality in separate branch

## Victories
- Created comprehensive API specification document
- Implemented all 5 required API endpoints:
  1. POST getUser - returns user with aggregated totals (including BMI and calorieGoal)
  2. PATCH updateUser - updates basic user attributes
  3. POST addFoodLog - adds meal and updates user totals
  4. POST createUser - creates new user
  5. POST calculateCalorieHistoryByDate - returns detailed totals for a specific date
- Updated services layer to match specifications:
  - Updated users.ts (createUser, updateUser, getUser)
  - Updated foodLogs.ts (addFoodLogEntry)
- Organized routes properly:
  - `/api/users/[username]/route.ts` (GET, PATCH)
  - `/api/users/[username]/foodLogs/route.ts` (POST)
  - `/api/users/route.ts` (POST createUser)
  - `/api/users/[username]/calorie-history/route.ts` (POST)
- Fixed route structure (moved calorie-history into [username] directory)
- Updated calculateCalorieHistoryByDate to return detailed totals on a given day
- Changed addFoodLogEntry to reuse name as foodID
- Team member (Damarcos) completed all service and route revisions
- Team member (Muaad) provided clear API specifications
- Started testing branch for Supabase experiments

