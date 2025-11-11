<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-xl font-semibold text-gray-900">Tasks</h3>
    </div>

    <!-- Empty -->
    <div v-if="tasks.length === 0" class="text-center py-10 text-gray-500">
      <p>No tasks found</p>
    </div>

    <!-- Tasks List -->
    <div v-else class="space-y-3">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-status="handleToggleStatus(task.id)"
        @view="$emit('view-task', task)"
        @delete="$emit('delete-task', task.id)" />
    </div>

  </div>
</template>

<script setup>
import TaskCard from "./TaskCard.vue";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["view-task", "delete-task", "toggle-status"]);

const handleToggleStatus = (taskId) => {
  emit("toggle-status", taskId);
};
</script>
