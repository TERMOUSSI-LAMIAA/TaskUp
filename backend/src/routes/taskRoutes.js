import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { addTask } from '../controllers/taskController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/:categoryId', addTask);    

export default router;