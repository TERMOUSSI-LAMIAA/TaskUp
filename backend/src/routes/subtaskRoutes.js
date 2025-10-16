import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {addSubtask} from '../controllers/subtaskController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/:taskId', addSubtask);


export default router;