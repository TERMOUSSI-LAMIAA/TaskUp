import prisma from "../config/database.js";

export const createTask = async (categoryId, taskData) => {
  const { startDatetime, endDatetime, ...restData } = taskData;
  return await prisma.task.create({
    data: {
      ...restData,
      categoryId,
      ...(startDatetime && { startDatetime: new Date(startDatetime) }),
      ...(endDatetime && { endDatetime: new Date(endDatetime) }),
    },
  });
};

export const getTasksByCategory = async (categoryId) => {
  return await prisma.task.findMany({
    where: { categoryId },
    include: { subtasks: true },
  });
};

export const updateTask = async (id, updates) => {
    if (updates.categoryId !== undefined) {
    throw new Error("Task category cannot be changed once created. Please create a new task in the desired category.");
  }
  
  return await prisma.task.update({
    where: { id },
    data: updates,
  });
};

export const deleteTask = async (userId, taskId) => {
  const task = await prisma.task.findFirst({
    where: { 
      id: taskId,
      category: { 
        userId: userId  
      }
    }
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  return await prisma.task.delete({
    where: { id: taskId },
  });
};

export const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { id },
    include: { subtasks: true, category: true },
  });
};