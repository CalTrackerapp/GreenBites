import express from 'express';
import {getAllUsers, createUser, deleteUser, getUser} from '../services/users.ts';
import foodLogsRouter from './foodLog.ts';

const router = express.Router();

// Mount nested foodLogs route
router.use('/:username/foodLogs', foodLogsRouter);

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = await createUser(req.body);
  res.json(newUser);
});

router.get('/:username', async (req, res) => {
  const user = await getUser(req.body);
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user);
});

router.delete('/:username', async (req, res) => {
  const result = await deleteUser(req.params.username);
  res.json(result);
});

export default router;
