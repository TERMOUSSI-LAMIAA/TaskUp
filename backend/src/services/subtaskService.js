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