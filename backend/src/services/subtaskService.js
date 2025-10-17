import prisma from '../config/database.js';


export const createSubtask = async (taskId, data) => {
  const { title } = data;

  const subtask = await prisma.subtask.create({
    data: {
      title,
      taskId,
    },
  });

  return subtask;
};

export const getSubtasksByTask = async (taskId) => {
  return await prisma.subtask.findMany({
    where: { taskId },
  });
};

export const updateSubtask = async (id, data) => {
    if (data.taskId !== undefined) {
    throw new Error("Subtask cannot be moved to a different task. Please delete and recreate the subtask.");
  }
  
  return await prisma.subtask.update({
    where: { id },
    data,
  });
};