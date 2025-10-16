import {createTask,getTasksByCategory,updateTask } from '../services/taskService.js'

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

export const listTasksByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const tasks = await getTasksByCategory(parseInt(categoryId));
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await updateTask(parseInt(id), req.body);
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};