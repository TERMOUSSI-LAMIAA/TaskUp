<template>
  <div 
    class="bg-white border border-gray-200 rounded-lg p-4 mb-3 transition-all duration-200 hover:shadow-md border-l-4"
    :class="{
      'border-l-blue-500': task.status !== 'COMPLETED',
      'border-l-emerald-500 hover:border-l-emerald-600': task.status === 'COMPLETED',
      'bg-gray-50 opacity-70': task.status === 'COMPLETED'
    }"
  >
    <!-- Header -->
    <div class="flex justify-between items-start mb-3">
      <div class="flex items-center gap-3 flex-1">
        <input 
          type="checkbox" 
          :checked="task.status === 'COMPLETED'"
          @change="$emit('toggle-status')"
          class="w-5 h-5 cursor-pointer accent-emerald-500"
        />
        <h4 
          class="text-sm font-semibold text-gray-900"
          :class="{ 'line-through text-gray-500': task.status === 'COMPLETED' }"
        >
          {{ task.title }}
        </h4>
      </div>
      <span 
        class="px-2 py-1 rounded text-xs font-semibold uppercase"
        :class="{
          'bg-red-100 text-red-800': task.priority === 'HIGH',
          'bg-yellow-100 text-yellow-800': task.priority === 'MEDIUM',
          'bg-green-100 text-green-800': task.priority === 'LOW',
          'bg-gray-100 text-gray-800': task.priority === 'NONE'
        }"
      >
        {{ formatPriority(task.priority) }}
      </span>
    </div>

    <!-- Description -->
    <p v-if="task.description" class="text-sm text-gray-600 mb-3 leading-relaxed">
      {{ task.description }}
    </p>

    <!--status Info -->
    <div class="flex gap-3 mb-3 text-xs">
      <span 
        class="px-2 py-1 rounded"
        :class="{
          'bg-blue-100 text-blue-800': task.status === 'TODO',
          'bg-yellow-100 text-yellow-800': task.status === 'IN_PROGRESS',
          'bg-green-100 text-green-800': task.status === 'COMPLETED'
        }"
      >
        {{ formatStatus(task.status) }}
      </span>
      
      <!-- Start Date -->
      <span v-if="task.startDatetime" class="flex items-center gap-1 text-gray-500">
        <span>🟢</span>
        {{ formatDate(task.startDatetime) }}
      </span>
      
      <!-- End Date -->
      <span v-if="task.endDatetime" class="flex items-center gap-1 text-gray-500">
        <span>📅</span>
        {{ formatDate(task.endDatetime) }}
      </span>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <button 
        @click="$emit('view')"
        class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
      >
        View
      </button>
      <button 
        @click="$emit('delete')"
        class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-status', 'view', 'edit', 'delete'])

const formatStatus = (status) => {
  const statuses = {
    'TODO': 'To Do',
    'IN_PROGRESS': 'In Progress',
    'COMPLETED': 'Completed'
  }
  return statuses[status] || status
}

const formatPriority = (priority) => {
  const priorities = {
    'NONE': 'None',
    'LOW': 'Low',
    'MEDIUM': 'Medium', 
    'HIGH': 'High'
  }
  return priorities[priority] || priority
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>