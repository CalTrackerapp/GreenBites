//no longer used (express)

// import express from 'express';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import usersRouter from '../drizzle/src/routes/users.ts';
// import foodsRouter from '../drizzle/src/routes/foods.ts';

// // Database connection setup
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL, // Set your database URL in .env
// });

// const db = drizzle(pool);      

// const app = express();
// app.use(express.json());

// // API Routes
// app.use('/api/users', usersRouter);
// app.use('/api/foods', foodsRouter);

// // Health check route
// app.get('/', async (req, res) => {
//     res.send('GreenBite server is running!');
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//     console.log(`API endpoints available at http://localhost:${PORT}/api/`);
// });