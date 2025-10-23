import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateToken } from '../middleware/auth.js';
import { addCategory ,listCategories,getCategory,editCategory,removeCategory} from '../controllers/categoryController.js';
import {validateRequest} from '../middleware/validateRequest.js'
import {createCategoryValidation,updateCategoryValidation} from '../validators/categoryValidator.js'

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/categories/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.use(authenticateToken);

router.post('/', upload.single('image'),  createCategoryValidation,validateRequest, addCategory);
router.get('/', listCategories);
router.get('/:id', getCategory);
router.put('/:id', upload.single('image'),updateCategoryValidation,validateRequest, editCategory);
router.delete('/:id', removeCategory);

export default router;