import prisma from "../config/database.js";

export const createSubtask = async (userId, taskId, data) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      category: {
        userId: userId,
      },
    },
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  const { title } = data;

  const subtask = await prisma.subtask.create({
    data: {
      title,
      taskId,
    },
  });

  return subtask;
};

export const getSubtasksByTask = async (userId, taskId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      category: {
        userId: userId,
      },
    },
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  return await prisma.subtask.findMany({
    where: { taskId },
  });
};

export const updateSubtask = async (userId, id, data) => {
  const subtask = await prisma.subtask.findFirst({
    where: {
      id: id,
      task: {
        category: {
          userId: userId,
        },
      },
    },
  });

  if (!subtask) {
    throw new Error("Subtask not found or access denied");
  }

  if (data.taskId !== undefined) {
    throw new Error("Subtask cannot be moved to a different task. Please delete and recreate the subtask.");
  }

  return await prisma.subtask.update({
    where: { id },
    data,
  });
};

export const deleteSubtask = async (userId, subtaskId) => {
  const subtask = await prisma.subtask.findFirst({
    where: {
      id: subtaskId,
      task: {
        category: {
          userId: userId,
        },
      },
    },
  });

  if (!subtask) {
    throw new Error("Subtask not found or access denied");
  }

  return await prisma.subtask.delete({
    where: { id: subtaskId },
  });
};
