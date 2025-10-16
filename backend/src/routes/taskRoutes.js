import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { addTask, listTasksByCategory} from '../controllers/taskController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/:categoryId', addTask);    
router.get('/:categoryId', listTasksByCategory); 

export default router;