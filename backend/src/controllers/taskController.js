import {createTask } from '../services/taskService.js'

export const addTask = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const taskData = req.body;

    const task = await createTask(parseInt(categoryId), taskData);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
