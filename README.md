# GreenBites

A clean nutrition & sustainability logger where you search or describe meals, save entries, and see how your choices impact health and carbon footprint.

## Overview

GreenBites is a comprehensive nutrition tracking application that combines health monitoring with environmental consciousness. Users can log their meals through natural language descriptions, track nutritional information, and visualize their carbon footprint impact. The app helps users make informed decisions about their food choices by providing real-time feedback on both health metrics and environmental sustainability.

## Problem Statement

Many people want to eat healthier and reduce their environmental impact, but lack the tools to easily track and understand the relationship between their food choices and both personal health and carbon emissions. Existing nutrition apps focus solely on calories and macros, while environmental apps don't connect to personal eating habits. GreenBites bridges this gap by providing an integrated platform that makes sustainable eating accessible and actionable.

## Target Users

- **Health-conscious individuals** who want to track nutrition while considering environmental impact
- **Eco-conscious consumers** looking to reduce their carbon footprint through food choices
- **Fitness enthusiasts** who want comprehensive tracking including sustainability metrics
- **Families** seeking to make more informed food decisions for health and environmental reasons

## Core Features (MVP)

- [x] **Food Search & Logging** - Integration with Calorie Ninjas API for comprehensive nutrition data
- [x] **Meal Logging** - Search and add foods to track daily nutrition intake
- [x] **Carbon Footprint Tracking** - Real-time calculation of CO₂e emissions based on food consumption
- [x] **Interactive Dashboards** - Visual charts showing daily/weekly progress on calories, macros, and CO₂e
- [x] **User Profiles & Goals** - Personalized targets for nutrition and environmental impact with profile setup
- [ ] **Favorites & Meal Templates** - Quick-add common meals and customizable meal templates

## Technical Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Frontend | Next.js 15 + React 19 + TypeScript | Full-stack framework with App Router, type safety, and modern development experience |
| Styling | Tailwind CSS | Utility-first CSS framework for rapid, consistent UI development |
| Type Safety | TypeScript 5.8 | Enhanced developer experience and runtime error prevention |
| State Management | React Context API + useReducer | Built-in React patterns for predictable state management |
| Backend | Next.js API Routes | Full-stack TypeScript with serverless deployment capabilities |
| Database | PostgreSQL (Supabase/Neon) + Drizzle ORM | Cloud-hosted relational database with type-safe queries and migrations |
| Authentication | Clerk | Secure, scalable authentication with social login options |
| External APIs | Calorie Ninjas API | Comprehensive nutrition data for accurate food tracking |
| Data Visualization | Recharts | Interactive charts for dashboard analytics |
| Deployment | Vercel/Netlify | Serverless deployment with automatic scaling |
| Testing | (Planned) Vitest + React Testing Library | Fast unit and integration testing with 70%+ coverage |
| CI/CD | (Planned) GitHub Actions | Automated testing, building, and deployment pipeline |

## Project Timeline

- **Week 1** (Sep 9-15): Project initialization, repository setup, initial planning and documentation
- **Week 2** (Sep 16-22): Clerk authentication integration, Drizzle ORM setup, database schema design, basic UI components
- **Week 3** (Sep 23-29): Redux store implementation, dashboard foundation, state management architecture
- **Week 4** (Sep 30-Oct 6): Migration to Context API, homepage redesign, responsive navbar improvements
- **Week 5** (Oct 7-13): Database services layer (users, foods, foodLog), Express API routes development
- **Week 6** (Oct 14-20): Food logging functionality, user totals calculation, API route completion
- **Week 7** (Oct 21-27): Calorie Ninjas API integration, AddMeal component implementation, nutrition search functionality
- **Week 8** (Oct 28-Nov 3): Migration from Express to Next.js, Next.js API routes, project restructuring
- **Week 9** (Nov 4-10): Profile setup page, account management, Next.js route integration, AddMeal component refinement
- **Week 10** (Nov 11-17): Supabase database connection, profile data persistence, schema fixes, gender selection restrictions, documentation updates
- **Week 11** (Nov 12-18): Database structure updates (sodium variables), services fixes, calorie history feature, dashboard redesign, UI/UX improvements, bug fixes
- **Week 12** (Nov 19-25): API specification design, backend route standardization, service layer refactoring, calculateCalorieHistoryByDate implementation, route structure organization, daily data persistence fix, Supabase database migration, complete sodium tracking implementation

## Getting Started

*Note: This setup guide reflects the current state of the project and will be updated as we add more features and integrations.*

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CalTrackerapp/GreenBites.git
cd GreenBites
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [QUICKSTART.md](./QUICKSTART.md) for details):
   - Create `.env.local` file in the project root
   - Add `DATABASE_URL` (from Supabase or Neon - see [DATABASE_SETUP.md](./DATABASE_SETUP.md))
   - Add Clerk keys: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` (see [CLERK_SETUP.md](./CLERK_SETUP.md))

4. Run database migrations:
```bash
npm run db:push
```
This creates all the required tables in your database.

5. (Optional) Verify database connection:
```bash
npm run db:check
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Current Features

The project currently includes:
- **Next.js 15** with App Router and TypeScript
- **Clerk Authentication** - Complete sign-up, sign-in, and protected routes
- **Database Integration** - PostgreSQL via Supabase/Neon with Drizzle ORM
- **Food Search & Logging** - Calorie Ninjas API integration for nutrition data
- **AddMeal Component** - Search foods, select servings, and log meals to database
- **Dashboard** - Interactive charts showing:
  - Daily calorie progress with goal tracking (persists across sessions)
  - Macro breakdown (protein, carbs, fats)
  - Carbon footprint visualization
  - Weekly calorie trends
  - Sodium tracking (fully integrated with database)
- **User Profile System** - Profile setup and account management with:
  - Gender, height, weight tracking
  - Customizable calorie goals
  - Profile data persistence
- **Protected Routes** - Middleware-based route protection for authenticated users
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **State Management** - Context API for global user state

### Upcoming Features

Future enhancements planned:
- **Favorites & Meal Templates** - Save frequently eaten meals for quick logging
- **Advanced Analytics** - Long-term trends, weekly/monthly reports, and insights
- **Natural Language Processing** - AI-powered meal description parsing (e.g., "2 eggs and toast")
- **Social Features** - Share achievements, compare with friends, community challenges
- **Mobile App** - Native iOS and Android applications
- **Export & Reports** - Download nutrition data, generate PDF reports
- **Meal Planning** - Weekly meal planning with carbon footprint optimization
- **Recipe Integration** - Recipe database with nutrition and carbon data

## Development Process

Our development workflow follows these principles:

1. **Feature-driven development** - Each feature is developed in isolation with comprehensive testing
2. **Test-driven development** - Write tests before implementing features to ensure reliability
3. **Continuous integration** - All changes are automatically tested and validated
4. **Code reviews** - All pull requests require review before merging
5. **Documentation-first** - Update documentation alongside code changes

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data

## Architecture Decisions

See [docs/decisions](./docs/decisions) for detailed technical decisions.

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository and create a feature branch
2. Make your changes with appropriate tests
3. Ensure all tests pass and coverage remains above 70%
4. Update documentation as needed
5. Submit a pull request with a clear description

For bug reports or feature requests, please use the GitHub Issues tab.

## Learning Goals

- [x] Master full-stack TypeScript development with React and Next.js
- [x] Design scalable database schemas with Drizzle ORM
- [x] Create engaging data visualizations for user insights
- [x] Implement cloud-hosted database solutions (Supabase/Neon)
- [x] Build authentication and authorization systems with Clerk
- [ ] Implement AI integration for natural language processing
- [ ] Build comprehensive testing strategies with high coverage
- [ ] Optimize performance and implement caching strategies

## Author

**[Your Name]**
- GitHub: [Your GitHub profile]
- LinkedIn: [Your LinkedIn profile]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Clerk for seamless authentication solutions
- The React and Next.js communities for excellent documentation and tools