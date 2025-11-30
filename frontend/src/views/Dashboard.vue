<template>
  <div class="flex min-h-screen bg-gray-50">
    <AppSidebar />
    <div class="flex-1 lg:ml-64 transition-all duration-300">
      <main class="p-4 sm:p-6 lg:p-8 min-h-screen">
        <h1 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Statistics Overview</h1>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-8 sm:py-10 text-gray-500">
          <div class="flex justify-center items-center gap-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
            <span class="text-sm sm:text-base">Loading stats...</span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-8 sm:py-10">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 max-w-md mx-auto">
            <p class="text-red-700 font-medium text-sm sm:text-base">{{ error }}</p>
          </div>
        </div>

        <!-- Stats Content -->
        <div v-else>
          <!-- 3 Top Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <!-- Total Tasks -->
            <div class="p-4 sm:p-6 bg-white shadow rounded-lg border border-gray-100">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <p class="text-gray-500 text-sm sm:text-base">Total Tasks</p>
              </div>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900">{{ stats.totalTasks || 0 }}</p>
            </div>

            <!-- Completion Rate -->
            <div class="p-4 sm:p-6 bg-white shadow rounded-lg border border-gray-100">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p class="text-gray-500 text-sm sm:text-base">Completion Rate</p>
              </div>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900">{{ (stats.completionRate || 0).toFixed(1) }}%</p>
              <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${stats.completionRate || 0}%` }"></div>
              </div>
            </div>

            <!-- Top Category -->
            <div class="p-4 sm:p-6 bg-white shadow rounded-lg border border-gray-100">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <p class="text-gray-500 text-sm sm:text-base">Top Category</p>
              </div>
              <p class="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {{ stats.topCategory?.name || "No tasks yet" }}
              </p>
            </div>
          </div>

          <!-- Priority Chart -->
          <div v-if="hasPriorityData" class="bg-white p-4 sm:p-6 shadow rounded-lg border border-gray-100">
            <h2 class="text-lg sm:text-xl font-bold mb-4 lg sm:text-xl">Tasks by Priority</h2>
            <div class="relative h-64 sm:h-80">
              <canvas id="priorityChart" height="100"></canvas>
            </div>
          </div>

          <!-- No Data Message -->
          <div v-else class="bg-white p-6 sm:p-8 shadow rounded-lg border border-gray-100 text-center">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
            <p class="text-gray-500 text-sm sm:text-base max-w-md mx-auto">No task data available to display charts. Start by creating tasks in your categories.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/layout/AppSidebar.vue";
import { ref, onMounted, computed } from "vue";
import { api } from "@/services/api.js";
import Chart from "chart.js/auto";

const loading = ref(true);
const error = ref(null);
const stats = ref({
  totalTasks: 0,
  completionRate: 0,
  priorityDistribution: [],
  topCategory: null,
});

const hasPriorityData = computed(() => {
  return stats.value.priorityDistribution && stats.value.priorityDistribution.length > 0;
});

onMounted(async () => {
  await loadStats();
  if (hasPriorityData.value) {
    createPriorityChart();
  }
});

async function loadStats() {
  try {
    const res = await api.get("/api/stats");

    stats.value = {
      totalTasks: res.data.totalTasks || 0,
      completionRate: res.data.completionRate || 0,
      priorityDistribution: res.data.priorityDistribution || [],
      topCategory: res.data.topCategory || null,
    };
  } catch (err) {
    console.error("Error loading stats:", err);
    console.error("Error response:", err.response?.data);
    error.value = "Failed to load statistics. Please try again.";
  } finally {
    loading.value = false;
  }
}

function createPriorityChart() {
  if (!hasPriorityData.value) return;

  const ctx = document.getElementById("priorityChart");
  if (!ctx) return;

  try {
    const priorityOrder = ["HIGH", "MEDIUM", "LOW", "NONE"];
    const priorityColors = {
      HIGH: "#EF4444",
      MEDIUM: "#F59E0B",
      LOW: "#3B82F6",
      NONE: "#6B7280",
    };

    const sortedData = [...stats.value.priorityDistribution].sort((a, b) => {
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedData.map((p) => {
          const priorityMap = {
            NONE: "No Priority",
            LOW: "Low",
            MEDIUM: "Medium",
            HIGH: "High",
          };
          return priorityMap[p.priority] || p.priority;
        }),
        datasets: [
          {
            label: "Tasks",
            data: sortedData.map((p) => p._count.id),
            backgroundColor: sortedData.map((p) => priorityColors[p.priority]),
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  } catch (chartError) {
    console.error("Error creating chart:", chartError);
  }
}
</script>
