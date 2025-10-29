import express from 'express';
import { getAllFoods, getFood, createFood, deleteFood, searchNutrition, createFoodFromNutrition } from '../services/foods.ts';

const router = express.Router();

// Basic CRUD operations (from teammate)
router.get('/', async (req, res) => {
  const foods = await getAllFoods();
  res.json(foods);
});

router.get('/:foodID', async (req, res) => {
  const food = await getFood(req.params.foodID);
  res.json(food);
});

router.post('/', async (req, res) => {
  const newFood = await createFood(req.body);
  res.json(newFood);
});

router.delete('/:foodID', async (req, res) => {
  const deletedFood = await deleteFood(req.params.foodID);
  res.json(deletedFood);
});

// Nutrition API routes (from your work)
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const nutritionData = await searchNutrition(query as string);
    res.json(nutritionData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search nutrition data' });
  }
});

router.post('/from-nutrition', async (req, res) => {
  try {
    const { nutritionData, userID } = req.body;
    if (!nutritionData || !userID) {
      return res.status(400).json({ error: 'nutritionData and userID are required' });
    }
    const newFood = await createFoodFromNutrition(nutritionData, userID);
    res.json(newFood);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food from nutrition data' });
  }
});

export default router;