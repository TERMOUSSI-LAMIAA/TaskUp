<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="px-8 py-6">
          <router-link to="/" class="text-emerald-600 font-semibold hover:text-emerald-700 mb-4 inline-block">← Back to categories</router-link>
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ category?.name }}</h1>
              <p class="text-gray-600 mt-1">Manage tasks in this category</p>
            </div>
            <div class="flex items-center gap-4">
              <!-- Search Bar -->
              <div class="relative group">
                <div class="relative flex items-center">
                  <svg class="absolute left-3 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search tasks..."
                    class="pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg bg-white" />
                  <button v-if="searchQuery" @click="clearSearch" class="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Priority Filter -->
              <div class="relative group">
                <select
                  v-model="priorityFilter"
                  class="pl-10 pr-8 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg w-48">
                  <option value="ALL">All Priorities</option>
                  <option value="HIGH">🆘 High Priority</option>
                  <option value="MEDIUM">🔥 Medium Priority</option>
                  <option value="LOW">❗ Low Priority</option>
                  <option value="NONE">⚪ No Priority</option>
                </select>
                <svg
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Status Filter -->
              <div class="relative group">
                <select
                  v-model="statusFilter"
                  class="pl-10 pr-8 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg w-44">
                  <option value="ALL">All Status</option>
                  <option value="TODO">📝 To Do</option>
                  <option value="IN_PROGRESS">🔄 In Progress</option>
                  <option value="COMPLETED">✅ Completed</option>
                </select>
                <svg
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <button
                @click="showAddTaskForm = true"
                class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                New task
              </button>
            </div>
          </div>

          <!-- Search & Filter Results Info -->
          <div v-if="hasActiveFilters" class="mt-4 flex items-center gap-4 text-sm">
            <span class="text-gray-700 font-medium">{{ filteredTasks.length }} task(s) found</span>
            <div class="flex items-center gap-2">
              <span v-if="searchQuery" class="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                "{{ searchQuery }}"
              </span>
              <span v-if="priorityFilter !== 'ALL'" class="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                {{ formatPriority(priorityFilter) }}
              </span>
              <span v-if="statusFilter !== 'ALL'" class="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ formatStatus(statusFilter) }}
              </span>
            </div>
            <button @click="clearAllFilters" class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear all
            </button>
          </div>
        </div>
      </div>

      <!-- Tasks Content -->
      <div class="p-8">
        <TaskList :tasks="filteredTasks" @view-task="handleViewTask" @delete-task="handleDeleteTask" />
      </div>
    </div>

    <!-- Add Task Modal -->
    <div v-if="showAddTaskForm" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">New task</h2>
        <TaskForm @submit="handleAddTask" @cancel="showAddTaskForm = false" :category-id="categoryId" />
      </div>
    </div>

    <!-- Task Detail Modal -->
    <TaskDetailModal
      v-if="selectedTask"
      :task="selectedTask"
      @close="selectedTask = null"
      @save="handleSaveTask"
      @add-subtask="handleAddSubtask"
      @delete-subtask="handleDeleteSubtask"
      @toggle-subtask="handleToggleSubtask" />

    <!-- Delete Task Confirmation Modal -->
    <div v-if="deletingTask" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Delete Task</h2>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete this task?
          <span class="font-semibold text-red-600 block mt-2">This action cannot be undone.</span>
        </p>
        <div class="flex gap-3">
          <button @click="confirmTaskDelete" class="flex-1 bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
          <button @click="deletingTask = null" class="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import TaskList from "@/components/tasks/TaskList.vue";
import TaskForm from "@/components/tasks/TaskForm.vue";
import TaskDetailModal from "@/components/tasks/TaskDetailModal.vue";
import { getCategoryById } from "@/services/categoryService.js";
import { createTask, updateTask, deleteTask } from "@/services/taskService.js";
import { createSubtask, deleteSubtask, updateSubtask } from "@/services/subtaskService.js";

const route = useRoute();
const category = ref(null);
const tasks = ref([]);
const showAddTaskForm = ref(false);
const selectedTask = ref(null);
const deletingTask = ref(null);
const searchQuery = ref("");
const priorityFilter = ref("ALL");
const statusFilter = ref("ALL");

const categoryId = route.params.id;

onMounted(() => {
  loadCategoryWithTasks();
});

const filteredTasks = computed(() => {
  let filtered = tasks.value;

  console.log("Original tasks:", tasks.value.length);
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter((task) => task.title.toLowerCase().includes(query) || (task.description && task.description.toLowerCase().includes(query)));
    console.log("After search:", filtered.length);
  }

  if (priorityFilter.value !== "ALL") {
    filtered = filtered.filter((task) => task.priority === priorityFilter.value);
    console.log("After priority filter:", filtered.length);
  }

  if (statusFilter.value !== "ALL") {
    filtered = filtered.filter((task) => task.status === statusFilter.value);
    console.log("After status filter:", filtered.length);
  }
  console.log("Final filtered tasks:", filtered.length);
  return filtered;
});

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() || priorityFilter.value !== "ALL" || statusFilter.value !== "ALL";
});

const loadCategoryWithTasks = async () => {
  try {
    const response = await getCategoryById(categoryId);
    category.value = response.data;
    tasks.value = response.data.tasks || [];
  } catch (error) {
    console.error("Failed to load category with tasks:", error);
  }
};

const handleAddTask = async (formData) => {
  try {
    const taskData = {
      ...formData,
    };

    await createTask(categoryId, taskData);
    await loadCategoryWithTasks();
    showAddTaskForm.value = false;
  } catch (error) {
    console.error("Failed to create task:", error);
  }
};

const handleViewTask = (task) => {
  selectedTask.value = task;
};

const handleDeleteTask = async (taskId) => {
  deletingTask.value = taskId;
};

const confirmTaskDelete = async () => {
  if (deletingTask.value) {
    try {
      await deleteTask(deletingTask.value);
      await loadCategoryWithTasks();
      deletingTask.value = null;
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }
};

const handleSaveTask = async (updatedTask) => {
  try {
    const { categoryId, startDate, endDate, ...updateData } = updatedTask;
    if (startDate) {
      updateData.startDatetime = new Date(startDate).toISOString();
    }
    if (endDate) {
      updateData.endDatetime = new Date(endDate).toISOString();
    }

    await updateTask(updatedTask.id, updateData);
    await loadCategoryWithTasks();
    selectedTask.value = null;
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

const handleAddSubtask = async ({ taskId, title }) => {
  try {
    await createSubtask(taskId, title);
    await loadCategoryWithTasks();
    const updatedTask = tasks.value.find((t) => t.id === taskId);

    if (updatedTask && selectedTask.value) {
      selectedTask.value = { ...updatedTask };
    }
  } catch (error) {
    console.error("Failed to add subtask:", error);
  }
};

const handleDeleteSubtask = async (subtaskId) => {
  try {
    const taskWithSubtask = tasks.value.find((task) => task.subtasks?.some((subtask) => subtask.id === subtaskId));

    if (taskWithSubtask) {
      await deleteSubtask(subtaskId);
      await loadCategoryWithTasks();

      const updatedTask = tasks.value.find((t) => t.id === taskWithSubtask.id);
      if (updatedTask && selectedTask.value?.id === taskWithSubtask.id) {
        selectedTask.value = { ...updatedTask };
      }
    }
  } catch (error) {
    console.error("Failed to delete subtask:", error);
  }
};

const handleToggleSubtask = async (subtaskId) => {
  try {
    const allSubtasks = tasks.value.flatMap((task) => task.subtasks || []);
    const subtask = allSubtasks.find((s) => s.id === subtaskId);

    if (subtask) {
      await updateSubtask(subtaskId, { isCompleted: !subtask.isCompleted });
      await loadCategoryWithTasks();

      const taskWithSubtask = tasks.value.find((task) => task.subtasks?.some((s) => s.id === subtaskId));
      if (taskWithSubtask && selectedTask.value?.id === taskWithSubtask.id) {
        const updatedTask = tasks.value.find((t) => t.id === taskWithSubtask.id);
        if (updatedTask) {
          selectedTask.value = { ...updatedTask };
        }
      }
    }
  } catch (error) {
    console.error("Failed to toggle subtask:", error);
  }
};

const formatPriority = (priority) => {
  const priorities = {
    ALL: "All",
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
  };
  return priorities[priority] || priority;
};

const formatStatus = (status) => {
  const statuses = {
    ALL: "All",
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
  };
  return statuses[status] || status;
};

const clearSearch = () => {
  searchQuery.value = "";
};

const clearAllFilters = () => {
  searchQuery.value = "";
  priorityFilter.value = "ALL";
  statusFilter.value = "ALL";
};
</script>
