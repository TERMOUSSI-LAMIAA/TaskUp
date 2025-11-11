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
            <button
              @click="showAddTaskForm = true"
              class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              New task
            </button>
          </div>
        </div>
      </div>

      <!-- Tasks Content -->
      <div class="p-8">
        <TaskList :tasks="tasks" @view-task="handleViewTask" @delete-task="handleDeleteTask" />
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
    <TaskDetailModal v-if="selectedTask" :task="selectedTask" @close="selectedTask = null" @save="handleSaveTask" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import TaskList from "@/components/tasks/TaskList.vue";
import TaskForm from "@/components/tasks/TaskForm.vue";
import TaskDetailModal from "@/components/tasks/TaskDetailModal.vue";

const router = useRouter();
const route = useRoute();
const category = ref(null);
const tasks = ref([]);
const showAddTaskForm = ref(false);
const selectedTask = ref(null);

const loadCategory = () => {
  category.value = { id: 1, name: "Work" }; // Mock category
};

const loadTasks = () => {
  tasks.value = [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Create the project proposal document",
      priority: "HIGH",
      status: "TODO",
      categoryId: 1,
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      subtasks: [],
    },
    {
      id: 2,
      title: "Team meeting",
      description: "Weekly team sync meeting",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      categoryId: 1,
      startDate: "2024-01-16",
      endDate: "2024-01-16",
      subtasks: [],
    },
  ];
};

const handleAddTask = (formData) => {
  const newTask = {
    ...formData,
    id: Date.now(),
    subtasks: [],
  };
  tasks.value.push(newTask);
  showAddTaskForm.value = false;
};

const handleViewTask = (task) => { 
  selectedTask.value = task; 
};

const handleDeleteTask = (taskId) => {
  tasks.value = tasks.value.filter((t) => t.id !== taskId);
};

const handleSaveTask = (updatedTask) => {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
  selectedTask.value = null; 
};
// Initialize mock data
loadCategory();
loadTasks();
</script>
