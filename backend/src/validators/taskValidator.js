import { body, param } from 'express-validator';

export const createTaskValidation = [
  param('categoryId')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a valid integer'),

  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('startDatetime')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),

  body('endDatetime')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),

  body('priority')
    .optional(),
    
  body('status')
    .optional()
    .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status value'),
];

export const updateTaskValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Task ID must be a valid integer'),

  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty'),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('startDatetime')
    .optional()
    .isISO8601()
    .withMessage('Start date must be valid'),

  body('endDatetime')
    .optional()
    .isISO8601()
    .withMessage('End date must be valid'),

  body('priority')
    .optional(),

  body('status')
    .optional()
    .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status value'),
];