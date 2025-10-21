import express from 'express';
import { getAllFoods, getFood, createFood, deleteFood } from '../services/foods';


const router = express.Router({});



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
})

router.delete('/:foodID', async (req, res) => {
    const deletedFood = await deleteFood(req.params.foodID);
    res.json(deletedFood);
})

export default router;


