import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { addTask, listTasksByCategory,editTask} from '../controllers/taskController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/:categoryId', addTask);    
router.get('/:categoryId', listTasksByCategory);
router.put('/:id', editTask);    

export default router;