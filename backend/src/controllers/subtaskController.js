import {createSubtask} from '../services/subtaskService.js'


export const addSubtask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const subtask = await createSubtask(Number(taskId), req.body);
    res.status(201).json({ message: 'Subtask created successfully', subtask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};