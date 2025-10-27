import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { addTask, listTasksByCategory,editTask,removeTask,getTask} from '../controllers/taskController.js';
import {createTaskValidation,updateTaskValidation} from '../validators/taskValidator.js';
import {validateRequest} from '../middleware/validateRequest.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/:categoryId',createTaskValidation, validateRequest,addTask);    
router.get('/:categoryId', listTasksByCategory);
router.put('/:id',updateTaskValidation,validateRequest, editTask);    
router.delete('/:id', removeTask); 
router.get('/details/:id', getTask);            

export default router;