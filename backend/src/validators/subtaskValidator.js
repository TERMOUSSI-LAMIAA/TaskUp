import { body, param } from "express-validator";

export const createSubtaskValidation = [
  param("taskId")
    .isInt({ min: 1 })
    .withMessage("Task ID must be a valid integer"),

  body("title")
    .notEmpty()
    .withMessage("Subtask title is required")
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters"),

  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be a boolean value"),
];

export const updateSubtaskValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Subtask ID must be a valid integer"),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters"),

  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be a boolean value"),
];
