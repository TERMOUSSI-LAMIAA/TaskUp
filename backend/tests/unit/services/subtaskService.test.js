import prisma from "../../../src/config/database.js";
import {
  createSubtask,
  getSubtasksByTask,
  updateSubtask,
  deleteSubtask,
} from "../../../src/services/subtaskService.js";

jest.mock("../../../src/config/database.js", () => ({
  subtask: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  task: {
    findFirst: jest.fn(),
  },
}));

describe("Subtask Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a subtask if task exists", async () => {
    prisma.task.findFirst.mockResolvedValue({ id: 1, category: { userId: 1 } });
    prisma.subtask.create.mockResolvedValue({ id: 1, title: "Test Subtask" });

    const result = await createSubtask(1, 1, { title: "Test Subtask" });

    expect(result).toEqual({ id: 1, title: "Test Subtask" });
    expect(prisma.subtask.create).toHaveBeenCalledWith({
      data: { title: "Test Subtask", taskId: 1 },
    });
  });

  test("should throw error if task not found on create", async () => {
    prisma.task.findFirst.mockResolvedValue(null);

    await expect(createSubtask(1, 99, { title: "Subtask" }))
      .rejects
      .toThrow("Task not found or access denied");
  });

  test("should return subtasks by task if authorized", async () => {
    prisma.task.findFirst.mockResolvedValue({ id: 1, category: { userId: 1 } });
    prisma.subtask.findMany.mockResolvedValue([{ id: 1, title: "Subtask 1" }]);

    const result = await getSubtasksByTask(1, 1);

    expect(result).toEqual([{ id: 1, title: "Subtask 1" }]);
  });

  test("should update a subtask if found", async () => {
    prisma.subtask.findFirst.mockResolvedValue({ id: 1 });
    prisma.subtask.update.mockResolvedValue({ id: 1, title: "Updated Subtask" });

    const result = await updateSubtask(1, 1, { title: "Updated Subtask" });

    expect(result).toEqual({ id: 1, title: "Updated Subtask" });
  });

  test("should throw error if trying to change taskId on update", async () => {
    prisma.subtask.findFirst.mockResolvedValue({ id: 1 });

    await expect(updateSubtask(1, 1, { taskId: 2 }))
      .rejects
      .toThrow("Subtask cannot be moved to a different task. Please delete and recreate the subtask.");
  });

  test("should delete a subtask if found", async () => {
    prisma.subtask.findFirst.mockResolvedValue({ id: 1 });
    prisma.subtask.delete.mockResolvedValue({ id: 1 });

    const result = await deleteSubtask(1, 1);

    expect(result).toEqual({ id: 1 });
    expect(prisma.subtask.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test("should throw error if subtask not found on delete", async () => {
    prisma.subtask.findFirst.mockResolvedValue(null);

    await expect(deleteSubtask(1, 1))
      .rejects
      .toThrow("Subtask not found or access denied");
  });
});
