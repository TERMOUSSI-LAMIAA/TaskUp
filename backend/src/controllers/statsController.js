import { getStatsForUser } from '../services/statsService.js';

export const getUserStats = async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const stats = await getStatsForUser(userId);
        
    res.json({
      totalTasks: stats.totalTasks,
      completionRate: stats.completionRate,
      priorityDistribution: stats.priorityDistribution,
      topCategory: stats.topCategory
    });

  } catch (error) {
    console.log("Stats controller error:", error.message);
    res.status(500).json({ error: error.message });
  }
};