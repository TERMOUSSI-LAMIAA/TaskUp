import prisma from '../config/database.js';

export const getStatsForUser = async (userId) => {
  try {
    const totalTasks = await prisma.task.count({
      where: { category: { userId } }
    });

    const completedTasks = await prisma.task.count({
      where: { 
        category: { userId }, 
        status: "COMPLETED" 
      }
    });

    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const highPriority = await prisma.task.count({
      where: { category: { userId }, priority: "HIGH" }
    });
    
    const mediumPriority = await prisma.task.count({
      where: { category: { userId }, priority: "MEDIUM" }
    });
    
    const lowPriority = await prisma.task.count({
      where: { category: { userId }, priority: "LOW" }
    });
    
    const noPriority = await prisma.task.count({
      where: { category: { userId }, priority: "NONE" }
    });

    const priorityDistribution = [
      { priority: 'HIGH', _count: { id: highPriority } },
      { priority: 'MEDIUM', _count: { id: mediumPriority } },
      { priority: 'LOW', _count: { id: lowPriority } },
      { priority: 'NONE', _count: { id: noPriority } }
    ];

    const categoriesWithCounts = await prisma.category.findMany({
      where: { userId },
      include: {
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: {
        tasks: {
          _count: 'desc'
        }
      },
      take: 1
    });

    let topCategory = null;
    if (categoriesWithCounts.length > 0 && categoriesWithCounts[0]._count.tasks > 0) {
      topCategory = { name: categoriesWithCounts[0].name };
    }

    return {
      totalTasks,
      completionRate,
      priorityDistribution,
      topCategory
    };
  } catch (error) {
    console.log("Stats service error:", error);
    throw new Error("Failed to fetch stats: " + error.message);
  }
};