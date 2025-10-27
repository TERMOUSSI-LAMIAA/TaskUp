import { createSubtask, getSubtasksByTask, updateSubtask, deleteSubtask } from "../services/subtaskService.js";

export const addSubtask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;
    const subtask = await createSubtask(userId, parseInt(taskId), req.body);
    res.status(201).json({ message: "Subtask created successfully", subtask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const listSubtasksByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;
    const subtasks = await getSubtasksByTask(userId,parseInt(taskId));
    res.status(200).json(subtasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const updated = await updateSubtask(userId,parseInt(id), req.body);
    res.status(200).json({ message: "Subtask updated successfully", subtask: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await deleteSubtask(userId, parseInt(id, 10));
    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
