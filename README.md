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

- [ ] **Food Search & Logging** - Integration with USDA/Nutritionix APIs for comprehensive nutrition data
- [ ] **Natural Language Meal Logging** - OpenAI-powered parsing of meal descriptions like "2 eggs and toast"
- [ ] **Carbon Footprint Tracking** - Real-time calculation of CO₂e emissions based on food categories
- [ ] **Interactive Dashboards** - Visual rings showing daily/weekly progress on calories, macros, and CO₂e
- [ ] **Favorites & Meal Templates** - Quick-add common meals and customizable meal templates
- [ ] **User Profiles & Goals** - Personalized targets for nutrition and environmental impact

## Technical Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Frontend | React + TypeScript | Type safety, component reusability, and modern development experience |
| Styling | Tailwind CSS | Utility-first CSS framework for rapid, consistent UI development |
| Type Safety | TypeScript | Enhanced developer experience and runtime error prevention |
| State Management | React Context + useReducer | Built-in React patterns for predictable state management |
| Backend | Next.js API Routes | Full-stack TypeScript with serverless deployment capabilities |
| Database | PostgreSQL + Drizzle ORM | Relational data with type-safe queries and migrations |
| Authentication | Clerk | Secure, scalable authentication with social login options |
| AI Integration | OpenAI API | Natural language processing for meal parsing and carbon classification |
| External APIs | USDA/Nutritionix | Comprehensive nutrition data for accurate food tracking |
| Deployment | AWS (Vercel/Netlify) | Serverless deployment with automatic scaling |
| Testing | Vitest + React Testing Library | Fast unit and integration testing with 70%+ coverage |
| CI/CD | GitHub Actions | Automated testing, building, and deployment pipeline |

## Project Timeline

- **Week 1**: Project setup, authentication integration, and basic UI components
- **Week 2**: Food search functionality and nutrition API integration
- **Week 3**: Natural language meal logging with OpenAI integration
- **Week 4**: Carbon footprint calculation and lookup table implementation
- **Week 5**: Dashboard components and data visualization
- **Week 6**: User profiles, goals, and preferences system
- **Week 7**: Favorites and meal templates functionality
- **Week 8**: Database schema optimization and performance improvements
- **Week 9**: Advanced features and mobile responsiveness
- **Week 10**: Testing, documentation, and production deployment

## Getting Started

*Note: This setup guide reflects the current state of the project and will be updated as we add more features and integrations.*

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/greenbites.git
cd greenbites
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Current Features

The project currently includes:
- Basic React + TypeScript + Vite setup
- Tailwind CSS for styling
- ESLint configuration
- Basic authentication components (SignIn/SignUp)
- Header and HomePage components
- Project structure with organized components and features

### Upcoming Integrations

As development progresses, we will add:
- PostgreSQL database with Drizzle ORM
- Clerk authentication setup
- OpenAI API integration
- USDA/Nutritionix API integration
- Carbon footprint tracking
- User dashboards and analytics

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

- [ ] Master full-stack TypeScript development with React and Next.js
- [ ] Implement AI integration for natural language processing
- [ ] Build comprehensive testing strategies with high coverage
- [ ] Design scalable database schemas with Drizzle ORM
- [ ] Create engaging data visualizations for user insights

## Author

**[Your Name]**
- GitHub: [Your GitHub profile]
- LinkedIn: [Your LinkedIn profile]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Clerk for seamless authentication solutions
- The React and Next.js communities for excellent documentation and tools