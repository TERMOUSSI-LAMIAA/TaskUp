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
    <TaskDetailModal v-if="selectedTask" :task="selectedTask" @close="selectedTask = null" @save="handleSaveTask"  @add-subtask="handleAddSubtask" @delete-subtask="handleDeleteSubtask"  @toggle-subtask="handleToggleSubtask"  />
 
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import TaskList from "@/components/tasks/TaskList.vue";
import TaskForm from "@/components/tasks/TaskForm.vue";
import TaskDetailModal from "@/components/tasks/TaskDetailModal.vue";
import { getCategoryById } from "@/services/categoryService.js";
import { createTask, updateTask, deleteTask } from "@/services/taskService.js";
import { createSubtask, deleteSubtask,updateSubtask } from "@/services/subtaskService.js";

const router = useRouter();
const route = useRoute();
const category = ref(null);
const tasks = ref([]);
const showAddTaskForm = ref(false);
const selectedTask = ref(null);
const deletingTask = ref(null); 

const categoryId = route.params.id;

onMounted(() => {
  loadCategoryWithTasks();
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
      console.error('Failed to delete task:', error);
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
       const updatedTask = tasks.value.find(t => t.id === taskId);
    
    if (updatedTask && selectedTask.value) {
      selectedTask.value = { ...updatedTask }; 
    }
    
  } catch (error) {
    console.error('Failed to add subtask:', error);
  }
};

const handleDeleteSubtask = async (subtaskId) => {
  try {
    const taskWithSubtask = tasks.value.find(task => 
      task.subtasks?.some(subtask => subtask.id === subtaskId)
    );
    
    if (taskWithSubtask) {
      await deleteSubtask(subtaskId);
      await loadCategoryWithTasks();
      
      const updatedTask = tasks.value.find(t => t.id === taskWithSubtask.id);
      if (updatedTask && selectedTask.value?.id === taskWithSubtask.id) {
        selectedTask.value = { ...updatedTask };
      }
    }
  } catch (error) {
    console.error('Failed to delete subtask:', error);
  }
};

const handleToggleSubtask = async (subtaskId) => {
  try {
    const allSubtasks = tasks.value.flatMap(task => task.subtasks || []);
    const subtask = allSubtasks.find(s => s.id === subtaskId);
    
    if (subtask) {
      await updateSubtask(subtaskId, { isCompleted: !subtask.isCompleted });
      await loadCategoryWithTasks();
      
      const taskWithSubtask = tasks.value.find(task => 
        task.subtasks?.some(s => s.id === subtaskId)
      );
      if (taskWithSubtask && selectedTask.value?.id === taskWithSubtask.id) {
        const updatedTask = tasks.value.find(t => t.id === taskWithSubtask.id);
        if (updatedTask) {
          selectedTask.value = { ...updatedTask };
        }
      }
    }
  } catch (error) {
    console.error('Failed to toggle subtask:', error);
  }
};
</script>
