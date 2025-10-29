import express from 'express';
import {getAllFoodLogs, createFoodLogEntry, deleteFoodLogEntry} from '../services/foodLog.ts';

const router = express.Router();

router.get('/users/:username/foodLogs', async (req, res) => {
  const foodLogs = await getAllFoodLogs();
  res.json(foodLogs);
});


router.post('/users/:username/foodLogs', async (req, res) => {
    const newFoodLog = await createFoodLogEntry(req.body);
    res.json(newFoodLog);
});

router.delete('/users/:username/foodLogs/:logID', async (req, res) => {
  const result = await deleteFoodLogEntry(Number(req.params.logID));
    res.json(result);
});

export default router;