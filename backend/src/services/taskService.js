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