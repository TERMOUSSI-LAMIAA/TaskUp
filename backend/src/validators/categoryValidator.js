import { body, param } from 'express-validator';

export const createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),
];

export const updateCategoryValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Category ID must be a valid number'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),

];
