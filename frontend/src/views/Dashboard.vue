<template>
  <div class="flex">
    <AppSidebar />
    <main class="ml-64 w-full p-6 bg-gray-50 min-h-screen">
      <h1 class="text-2xl font-bold mb-6">Statistics Overview</h1>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading stats...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-10 text-red-500">
        {{ error }}
      </div>

      <!-- Stats Content -->
      <div v-else>
        <!-- 3 Top Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Total Tasks -->
          <div class="p-6 bg-white shadow rounded-lg">
            <p class="text-gray-500">Total Tasks</p>
            <p class="text-3xl font-bold">{{ stats.totalTasks || 0 }}</p>
          </div>

          <!-- Completion Rate -->
          <div class="p-6 bg-white shadow rounded-lg">
            <p class="text-gray-500">Completion Rate</p>
            <p class="text-3xl font-bold">
              {{ (stats.completionRate || 0).toFixed(1) }}%
            </p>
          </div>

          <!-- Top Category -->
          <div class="p-6 bg-white shadow rounded-lg">
            <p class="text-gray-500">Category With Most Tasks</p>
            <p class="text-xl font-semibold mt-2">
              {{ stats.topCategory?.name || "No tasks yet" }}
            </p>
          </div>
        </div>

        <!-- Priority Chart -->
        <div v-if="hasPriorityData" class="bg-white p-6 shadow rounded-lg">
          <h2 class="text-xl font-bold mb-4">Tasks by Priority</h2>
          <canvas id="priorityChart" height="100"></canvas>
        </div>

        <!-- No Data Message -->
        <div v-else class="bg-white p-6 shadow rounded-lg text-center text-gray-500">
          No task data available to display charts
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/layout/AppSidebar.vue";
import { ref, onMounted, computed } from "vue";
import { api } from '@/services/api.js'; 
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
  return stats.value.priorityDistribution && 
         stats.value.priorityDistribution.length > 0;
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
    const priorityOrder = ['HIGH', 'MEDIUM', 'LOW', 'NONE'];
    const priorityColors = {
      'HIGH': '#EF4444',    
      'MEDIUM': '#F59E0B',  
      'LOW': '#3B82F6',     
      'NONE': '#6B7280'    
    };

    const sortedData = [...stats.value.priorityDistribution].sort((a, b) => {
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedData.map((p) => {
          const priorityMap = {
            'NONE': 'No Priority',
            'LOW': 'Low',
            'MEDIUM': 'Medium', 
            'HIGH': 'High'
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
              stepSize: 1
            }
          },
        },
      },
    });
  } catch (chartError) {
    console.error("Error creating chart:", chartError);
  }
}
</script>