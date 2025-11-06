<template>
  <div class="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
    <!-- Image Section -->
    <div class="relative h-48 overflow-hidden cursor-pointer" @click="$emit('view', category.id)">
      <div v-if="category.image" class="w-full h-full">
        <img :src="category.image" :alt="category.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div v-else class="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
      </div>
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
    </div>
    <!-- Content Section -->
    <div class="p-6">
      <!-- Title and Description -->
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ category.name }}</h3>
      <p class="text-sm text-gray-600 mb-4">Manage your {{ category.name.toLowerCase() }} tasks</p>

      <!-- Stats -->
      <div class="flex gap-4 mb-4 text-sm">
        <div class="flex items-center gap-1">
          <span class="font-semibold text-gray-800">{{ taskCount }}</span>
          <span class="text-gray-600">tasks</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-semibold text-green-600">{{ completedCount }}</span>
          <span class="text-gray-600">completed</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-xs font-semibold text-gray-700">Progress</span>
          <span class="text-xs font-bold text-blue-600">{{ progressPercentage }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="h-full rounded-full transition-all duration-300 bg-blue-500" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <button
          @click="$emit('view', category.id)"
          class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-105">
          View
        </button>
        <button @click="$emit('edit', category.id)" class="flex-1 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-50">Edit</button>
      </div>
    </div>

    <!-- Color Accent -->
    <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  tasks: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["view", "edit", "delete"]);

const taskCount = computed(() => {
  return props.tasks.filter((task) => task.categoryId === props.category.id).length;
});

const completedCount = computed(() => {
  return props.tasks.filter((task) => task.categoryId === props.category.id && task.status === "COMPLETED").length;
});

const progressPercentage = computed(() => {
  if (taskCount.value === 0) return 0;
  return Math.round((completedCount.value / taskCount.value) * 100);
});

</script>
