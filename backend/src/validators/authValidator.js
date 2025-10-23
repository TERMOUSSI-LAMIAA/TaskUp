import { body } from 'express-validator';
import prisma from '../config/database.js';


export const signupValidation = [
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email')
    .bail()
    .normalizeEmail()
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) {
        throw new Error('Email already used');
      }
      return true;
    }),

  body('password')
    .isString().withMessage('Password required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('username')
    .trim()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
];

export const loginValidation = [
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email')
    .bail()
    .normalizeEmail(),

  body('password')
    .isString().withMessage('Password required')
    .notEmpty().withMessage('Password required'),
];

