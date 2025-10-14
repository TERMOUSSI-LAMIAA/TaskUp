import {createCategory,getAllCategories } from '../services/categoryService.js';


export const addCategory = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;

    const category = await createCategory(req.user.userId, data);
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const listCategories = async (req, res) => {
  try {
    const categories = await getAllCategories(req.user.userId);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
