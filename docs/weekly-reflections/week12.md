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
- Fixed daily data persistence issue - dashboard metrics now persist across logout/login
- Migrated to new Supabase project due to connection issues
- Implemented complete sodium tracking in database (schema, services, API)

## Additional Work (Post-Week 12)

### Daily Data Persistence Fix
- **Problem**: Daily dashboard metrics (calories, CO2, sodium) were resetting to 0 when users logged out and back in on the same day
- **Root Cause**: User context was not loading today's calorie history from food logs in the database
- **Solution**: 
  - Created `calculateTodayTotals()` function in foodLog service to calculate today's totals from database
  - Updated user context to fetch today's calorie history on login via `/api/users/[username]/calorie-history`
  - Dashboard now correctly displays persisted daily data

### Supabase Database Migration
- **Problem**: Database connection errors (`ENOTFOUND`, "Tenant or user not found")
- **Root Cause**: Previous Supabase project was deleted or inaccessible, connection string was invalid
- **Solution**: 
  - Created new Supabase project
  - Updated `DATABASE_URL` in `.env.local` with new connection string
  - Verified connection with `npm run db:push`
  - All database operations now working correctly

### Sodium Tracking Implementation
- **Problem**: Sodium was not stored in database, showing 0 after logout/login
- **Solution**: Complete sodium tracking implementation
  - Added `sodiumInMg` field to foods table schema
  - Added `totalSodium` field to users table schema
  - Updated `createFoodFromNutrition()` to save sodium from CalorieNinjas API
  - Created `calculateSodium()` function in foodLog service
  - Updated `alterUserTotals()` to track sodium in user totals
  - Updated `calculateTodayTotals()` to calculate sodium from food logs
  - Updated profile API to return `totalSodium`
  - Updated user context to load `totalSodium` from API
  - Applied schema changes to database with `npm run db:push`

### Production Deployment
- **Achievement**: Successfully deployed GreenBites to production
- **Platform**: Deployed to Vercel with full environment variable configuration
- **Database**: Connected to Supabase PostgreSQL database in production
- **Features Deployed**:
  - Complete authentication system with Clerk
  - Food search and meal logging functionality
  - Interactive dashboards with daily/weekly nutrition tracking
  - Carbon footprint tracking
  - Sodium tracking (complete implementation)
  - User profile management
- **Production Optimizations**:
  - Optimized database connection pooling for serverless environments (max: 1 connection)
  - Improved SSL detection for Supabase and Neon databases
  - Enhanced error handling with detailed error messages for debugging
  - Fixed security vulnerabilities (CVE-2025-66478) by updating Next.js to 15.5.7 and React to 19.2.1
  - Implemented comprehensive error handling for production environments
- **Documentation**: Created VERCEL_DEPLOYMENT.md guide for environment variable setup and troubleshooting
- **Status**: Application is live and fully functional in production environment

