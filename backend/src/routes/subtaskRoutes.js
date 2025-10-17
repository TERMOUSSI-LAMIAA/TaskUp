import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {addSubtask,listSubtasksByTask,editSubtask,removeSubtask} from '../controllers/subtaskController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/:taskId', addSubtask);
router.get('/:taskId', listSubtasksByTask);
router.put('/:id', editSubtask);
router.delete('/:id', removeSubtask);

export default router;