<template>
  <div 
    class="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg mb-2 transition-all duration-200 hover:bg-gray-100"
    :class="{ 'opacity-60': subtask.isCompleted }"
  >
    <input 
      type="checkbox" 
      :checked="subtask.isCompleted"
      @change="$emit('toggle')"
      class="w-4.5 h-4.5 cursor-pointer text-emerald-500 rounded border-gray-300 focus:ring-emerald-500 focus:ring-2"
    />
    <span 
      class="flex-1 text-sm text-gray-700"
      :class="{ 'line-through text-gray-400': subtask.isCompleted }"
    >
      {{ subtask.title }}
    </span>
    <button 
      class="text-gray-400 hover:text-red-500 text-xl transition-colors w-6 h-6 flex items-center justify-center"
      @click="handleDelete"
    >
      ×
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  subtask: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete'])

const handleDelete = () => {
  emit('delete');
}

</script>