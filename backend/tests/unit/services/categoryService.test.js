import prisma from "../../../src/config/database.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../../src/services/categoryService.js";

jest.mock("../../../src/config/database.js", () => ({
  category: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("fs");

describe("Category Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new category", async () => {
    const mockCategory = { id: 1, name: "Work", userId: 1 };
    prisma.category.create.mockResolvedValue(mockCategory);

    const result = await createCategory(1, { name: "Work" });

    expect(prisma.category.create).toHaveBeenCalledWith({
      data: { name: "Work", userId: 1 },
    });
    expect(result).toEqual(mockCategory);
  });

  test("should return all categories for a user", async () => {
    const mockCategories = [{ id: 1, name: "Work" }];
    prisma.category.findMany.mockResolvedValue(mockCategories);

    const result = await getAllCategories(1);

    expect(prisma.category.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      include: { tasks: true },
    });
    expect(result).toEqual(mockCategories);
  });

  test("should return category by id", async () => {
    const mockCategory = { id: 2, name: "Personal" };
    prisma.category.findFirst.mockResolvedValue(mockCategory);

    const result = await getCategoryById(2, 1);

    expect(prisma.category.findFirst).toHaveBeenCalledWith({
      where: { id: 2, userId: 1 },
      include: { tasks: true },
    });
    expect(result).toEqual(mockCategory);
  });

  test("should throw error if category not found in updateCategory", async () => {
    prisma.category.findUnique.mockResolvedValue(null);

    await expect(
      updateCategory(1, 99, { name: "Updated" })
    ).rejects.toThrow("Category not found or access denied");
  });

  test("should throw error if category not found in deleteCategory", async () => {
    prisma.category.findUnique.mockResolvedValue(null);

    await expect(deleteCategory(1, 99)).rejects.toThrow(
      "Category not found or access denied"
    );
  });
});