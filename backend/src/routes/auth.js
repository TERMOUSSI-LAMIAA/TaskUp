import express from 'express';
import multer from 'multer';
import path from 'path';
import { signup,login } from '../controllers/authController.js'
import {signupValidation,loginValidation} from '../validators/authValidator.js'
import {validateRequest} from '../middleware/validateRequest.js'

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});


const upload = multer({ storage });
router.post('/signup', upload.single('photo'),signupValidation,validateRequest, signup);
router.post('/login', loginValidation,validateRequest,login);

export default router;