import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {addSubtask,listSubtasksByTask} from '../controllers/subtaskController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/:taskId', addSubtask);
router.get('/:taskId', listSubtasksByTask);

export default router;