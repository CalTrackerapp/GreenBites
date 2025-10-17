// src/routes/users.ts
import express from 'express';
import { getAllUsers, createUser } from '../index';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = await createUser(req.body);
  res.json(newUser);
});

export default router;
