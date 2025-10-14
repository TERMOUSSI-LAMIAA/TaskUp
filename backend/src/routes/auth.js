import express from 'express';
import multer from 'multer';
import path from 'path';
import { signup,login } from '../controllers/authController.js'

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
router.post('/signup', upload.single('photo'), signup);
router.post('/login', login);
//TODO:logout

export default router;