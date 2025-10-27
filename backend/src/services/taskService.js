import prisma from "../config/database.js";

export const createTask = async (userId, categoryId, taskData) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId: userId,
    },
  });

  if (!category) {
    throw new Error("Category not found or access denied");
  }
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

export const getTasksByCategory = async (userId, categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId: userId,
    },
  });

  if (!category) {
    throw new Error("Category not found or access denied");
  }

  return await prisma.task.findMany({
    where: { categoryId },
    include: { subtasks: true },
  });
};

export const updateTask = async (userId, id, updates) => {
  const task = await prisma.task.findFirst({
    where: {
      id: id,
      category: {
        userId: userId,
      },
    },
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

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
        userId: userId,
      },
    },
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  return await prisma.task.delete({
    where: { id: taskId },
  });
};

export const getTaskById = async (userId, id) => {
  const task = await prisma.task.findFirst({
    where: {
      id: id,
      category: {
        userId: userId,
      },
    },
    include: { subtasks: true, category: true },
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  return task;
};
