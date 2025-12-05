# Technical Roadmap

## Phase 1: Foundation (Weeks 1-4)

### Week 1 (Sep 9-15): Project Initialization
- [x] Repository setup and initial project structure
- [x] Initial planning and documentation
- [x] Technology stack selection (ADR-001)
- [x] Project requirements gathering
- [x] Team coordination and task assignment

### Week 2 (Sep 16-22): Authentication & Database Setup
- [x] Clerk authentication integration
- [x] Drizzle ORM installation and configuration
- [x] Database schema design (users, foods, foodLog tables)
- [x] Basic UI components (Header, HomePage)
- [x] Sign-up and sign-in pages
- [x] Protected routes middleware setup
- [x] Database connection setup (local PostgreSQL initially)

### Week 3 (Sep 23-29): State Management & Dashboard Foundation
- [x] Redux store implementation
- [x] Dashboard component structure
- [x] Basic state management architecture
- [x] User state integration with Redux
- [x] Dashboard UI layout

### Week 4 (Sep 30-Oct 6): State Management Migration & UI Improvements
- [x] Migration from Redux to Context API
- [x] Homepage redesign
- [x] Responsive navbar improvements
- [x] User context implementation with useReducer
- [x] Context API integration across components

## Phase 2: Backend Development (Weeks 5-6)

### Week 5 (Oct 7-13): Services Layer & API Routes
- [x] Database services layer creation
  - [x] `users.ts` service (getAllUsers, createUser, updateUser)
  - [x] `foods.ts` service (getAllFoods, getFood, createFood, deleteFood)
  - [x] `foodLog.ts` service (createFoodLog, getUserFoodLogs)
- [x] Express API routes development
  - [x] User routes (`/api/users`)
  - [x] Food routes (`/api/foods`)
  - [x] FoodLog routes (nested under users)
- [x] Database query methods in `index.ts`
- [x] Testing API endpoints

### Week 6 (Oct 14-20): Food Logging & User Totals
- [x] Food logging functionality implementation
- [x] User totals calculation on food log entry
- [x] FoodLog service completion
- [x] API route completion for food logs
- [x] Merge params configuration for nested routes
- [x] Database timestamp integration for date filtering

## Phase 3: Frontend Features (Weeks 7-8)

### Week 7 (Oct 21-27): Nutrition API & Meal Logging
- [x] Calorie Ninjas API integration
- [x] Nutrition search service (`searchNutrition` function)
- [x] AddMeal component implementation
- [x] Food search functionality
- [x] Food selection and serving size adjustment
- [x] Meal logging to database
- [x] Carbon footprint calculation (placeholder)
- [x] API routes for food search (`/api/foods/search`)
- [x] API route for creating food from nutrition data (`/api/foods/fromNutrition`)

### Week 8 (Oct 28-Nov 3): Next.js Migration
- [x] Migration from Express to Next.js
- [x] Next.js API routes implementation
  - [x] Ported `/api/users` routes
  - [x] Ported `/api/users/[username]/foodLogs` routes
  - [x] Ported `/api/foods` routes
- [x] Project restructuring for Next.js App Router
- [x] Removed Express server setup
- [x] Updated frontend API calls
- [x] Folder structure cleanup

## Phase 4: Profile & Polish (Weeks 9-10)

### Week 9 (Nov 4-10): Profile Management
- [x] Profile setup page (`/profile-setup`)
- [x] Account management page (`/account`)
- [x] Profile API routes (`/api/profile`)
  - [x] GET profile data
  - [x] POST create profile
  - [x] PUT update profile
- [x] AddMeal component refinement for Next.js
- [x] User context improvements
- [x] Profile data integration with dashboard

### Week 10 (Nov 11-17): Database & Schema Fixes
- [x] Supabase database connection setup
- [x] Profile data persistence
- [x] Schema fixes (gender field type change)
- [x] Gender selection restrictions
- [x] Database connection verification
- [x] User context data fetching improvements
- [x] Documentation updates

## Phase 5: Refinement & Enhancement (Week 11)

### Week 11 (Nov 12-18): Database Structure & UI Polish
- [x] Database structure updates (sodium variables added)
- [x] Services layer fixes to match new database structure
  - [x] Updated all query methods to use correct structure
  - [x] Fixed foodLogs to save detailed nutritional information
  - [x] Added sodium tracking to calculations
- [x] Calorie history feature implementation
  - [x] Added `calculateCalorieHistory` method in foodLog services
  - [x] Created `/api/calorie-history` route
  - [x] Returns calorie entry array for each log per user
- [x] UI/UX improvements
  - [x] Dashboard redesign and restyling
  - [x] AddMeal component restyling
  - [x] Homepage styling completion
  - [x] CSS simplification for maintainability
- [x] Bug fixes and stability
  - [x] Fixed server startup issues
  - [x] Resolved TypeScript warnings
  - [x] Fixed API call setup
  - [x] Context API variable name updates
- [x] Code quality improvements
  - [x] Verified all CRUD operations work with updated structure
  - [x] Ensured route dependencies are updated

## Phase 6: API Specification & Refinement (Week 12)

### Week 12 (Nov 19-25): API Standardization
- [x] API specification design and documentation
  - [x] Defined 5 core API endpoints with request/response formats
  - [x] Specified difficulty levels for implementation
- [x] Backend route implementation and organization
  - [x] POST getUser - returns user with aggregated totals (BMI, calorieGoal included)
  - [x] PATCH updateUser - updates basic user attributes
  - [x] POST addFoodLog - adds meal and updates user totals
  - [x] POST createUser - creates new user
  - [x] POST calculateCalorieHistoryByDate - returns detailed totals for specific date
- [x] Service layer updates to match API spec
  - [x] Updated users.ts (createUser, updateUser, getUser)
  - [x] Updated foodLogs.ts (addFoodLogEntry)
  - [x] Added BMI calculation and automatic updates
  - [x] Updated addFoodLogEntry to reuse name as foodID
- [x] Route structure organization
  - [x] `/api/users/[username]/route.ts` (GET, PATCH)
  - [x] `/api/users/[username]/foodLogs/route.ts` (POST)
  - [x] `/api/users/route.ts` (POST createUser)
  - [x] `/api/users/[username]/calorie-history/route.ts` (POST)
- [x] calculateCalorieHistoryByDate enhancement
  - [x] Returns detailed totals (calories, protein, carbs, fats, sodium, carbon footprint) for a given date
- [x] Supabase testing branch created for experiments

## Phase 7: Testing & Deployment (Week 13+)

### Week 13+ (Nov 26+): Production Preparation
- [ ] Comprehensive testing
  - [ ] Unit tests for services
  - [ ] Integration tests for API routes
  - [ ] End-to-end testing
- [ ] Bug fixes and performance optimization
- [ ] Production deployment setup
  - [ ] Vercel/Netlify configuration
  - [ ] Environment variables setup
  - [ ] Database migration to production
- [ ] Documentation finalization
- [ ] Launch preparation

## Future Enhancements (Post-MVP)

### Phase 6: Advanced Features
- [ ] Favorites & Meal Templates
- [ ] Advanced analytics and reporting
- [ ] Natural language meal parsing (AI integration)
- [ ] Social features
- [ ] Mobile app development
- [ ] Export & report generation
- [ ] Meal planning functionality
- [ ] Recipe integration
