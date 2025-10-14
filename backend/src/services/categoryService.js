import prisma from '../config/database.js';

export const createCategory = async (userId, data) => {
  return await prisma.category.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getAllCategories = async (userId) => {
  return await prisma.category.findMany({
    where: { userId },
    include: { tasks: true },
  });
};