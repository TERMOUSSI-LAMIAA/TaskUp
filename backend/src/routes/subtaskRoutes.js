import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {addSubtask,listSubtasksByTask,editSubtask,removeSubtask} from '../controllers/subtaskController.js';
import {createSubtaskValidation,updateSubtaskValidation} from '../validators/subtaskValidator';
import {validateRequest} from '../middleware/validateRequest.js';


const router = express.Router();
router.use(authenticateToken);

router.post('/:taskId',   createSubtaskValidation, validateRequest,addSubtask);
router.get('/:taskId', listSubtasksByTask);
router.put('/:id',updateSubtaskValidation,validateRequest, editSubtask);
router.delete('/:id', removeSubtask);

export default router;