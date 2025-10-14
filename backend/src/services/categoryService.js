import prisma from "../config/database.js";
import path from 'path';
import fs from 'fs';

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

export const getCategoryById = async (id, userId) => {
  return await prisma.category.findFirst({
    where: { id, userId },
    include: { tasks: true },
  });
};

export const updateCategory = async (userId, categoryId, categoryData) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category || category.userId !== userId) {
    throw new Error("Category not found or access denied");
  }

  if (categoryData.image) {
    if (category.image) {
      const oldImagePath = path.join(process.cwd(), "uploads", "categories", category.image);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log(`✅ Ancienne image supprimée: ${category.image}`);
      }
    }
  } else {
    categoryData.image = category.image;
  }

  return await prisma.category.update({
    where: { id: categoryId },
    data: categoryData,
    include: { tasks: true },
  });
};
