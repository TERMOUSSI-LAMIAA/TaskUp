import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getUserStats } from '../controllers/statsController.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getUserStats);

export default router;