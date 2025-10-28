import prisma from "../../../src/config/database.js";
import {
  createTask,
  getTasksByCategory,
  updateTask,
  deleteTask,
  getTaskById,
} from "../../../src/services/taskService.js";

jest.mock("../../../src/config/database.js", () => ({
  task: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  category: {
    findFirst: jest.fn(),
  },
}));

describe("Task Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a task when category exists", async () => {
    prisma.category.findFirst.mockResolvedValue({ id: 1, userId: 1 });
    prisma.task.create.mockResolvedValue({ id: 1, title: "Test Task" });

    const result = await createTask(1, 1, { title: "Test Task" });

    expect(prisma.category.findFirst).toHaveBeenCalledWith({
      where: { id: 1, userId: 1 },
    });
    expect(prisma.task.create).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, title: "Test Task" });
  });

  test("should throw error if category not found on create", async () => {
    prisma.category.findFirst.mockResolvedValue(null);

    await expect(createTask(1, 99, { title: "Task" }))
      .rejects
      .toThrow("Category not found or access denied");
  });

  test("should return tasks by category when authorized", async () => {
    prisma.category.findFirst.mockResolvedValue({ id: 1, userId: 1 });
    prisma.task.findMany.mockResolvedValue([{ id: 1, title: "Task 1" }]);

    const tasks = await getTasksByCategory(1, 1);

    expect(tasks).toEqual([{ id: 1, title: "Task 1" }]);
  });

  test("should update a task if found", async () => {
    prisma.task.findFirst.mockResolvedValue({ id: 1, title: "Old Task" });
    prisma.task.update.mockResolvedValue({ id: 1, title: "Updated Task" });

    const result = await updateTask(1, 1, { title: "Updated Task" });

    expect(result).toEqual({ id: 1, title: "Updated Task" });
  });

  test("should throw if trying to change categoryId on update", async () => {
    prisma.task.findFirst.mockResolvedValue({ id: 1 });

    await expect(updateTask(1, 1, { categoryId: 2 }))
      .rejects
      .toThrow("Task category cannot be changed once created. Please create a new task in the desired category.");
  });

  test("should delete a task if found", async () => {
    prisma.task.findFirst.mockResolvedValue({ id: 1 });
    prisma.task.delete.mockResolvedValue({ id: 1 });

    const result = await deleteTask(1, 1);

    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual({ id: 1 });
  });

  test("should throw error if deleting unauthorized or missing task", async () => {
    prisma.task.findFirst.mockResolvedValue(null);

    await expect(deleteTask(1, 1))
      .rejects
      .toThrow("Task not found or access denied");
  });

  test("should get a task by id if authorized", async () => {
    prisma.task.findFirst.mockResolvedValue({ id: 1, title: "Task" });

    const task = await getTaskById(1, 1);

    expect(task).toEqual({ id: 1, title: "Task" });
  });

  test("should throw if task not found by id", async () => {
    prisma.task.findFirst.mockResolvedValue(null);

    await expect(getTaskById(1, 1))
      .rejects
      .toThrow("Task not found or access denied");
  });
});
