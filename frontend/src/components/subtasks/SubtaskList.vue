<template>
  <div class="bg-gray-50 rounded-lg p-4 mt-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-3">
      <h4 class="text-sm font-semibold text-gray-900">Subtasks</h4>
      <span class="text-xs text-gray-500 font-medium">{{ completedCount }}/{{ subtasks.length }}</span>
    </div>

    <!-- Progress Bar -->
    <div class="flex items-center gap-2 mb-3">
      <div class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      <span class="text-xs font-semibold text-gray-700 min-w-[30px]">{{ progressPercentage }}%</span>
    </div>

    <!-- Empty  -->
    <div v-if="subtasks.length === 0" class="text-center py-5 text-gray-400 text-sm">
      <p>No subtasks</p>
    </div>

    <!-- Subtasks List -->
    <div v-else class="mb-3 space-y-2">
      <SubtaskItem 
        v-for="subtask in subtasks"
        :key="subtask.id"
        :subtask="subtask"
        @toggle="$emit('toggle-subtask', subtask.id)"
        @delete="$emit('delete-subtask', subtask.id)"
      />
    </div>

    <!-- Add Subtask Form -->
    <div class="flex gap-2">
      <input 
        v-model="newSubtaskTitle"
        type="text"
        placeholder="Add a subtask..."
        @keyup.enter="handleAddSubtask"
        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
      />
      <button 
        @click="handleAddSubtask"
        class="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SubtaskItem from './SubtaskItem.vue'

const props = defineProps({
  subtasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-subtask', 'toggle-subtask', 'delete-subtask'])

const newSubtaskTitle = ref('')

const completedCount = computed(() => {
  return props.subtasks.filter(s => s.isCompleted).length
})

const progressPercentage = computed(() => {
  if (props.subtasks.length === 0) return 0
  return Math.round((completedCount.value / props.subtasks.length) * 100)
})

const handleAddSubtask = () => {
  if (newSubtaskTitle.value.trim()) {
    emit('add-subtask', newSubtaskTitle.value)
    newSubtaskTitle.value = ''
  }
}
</script>   