<template>
  <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-sm p-6">
    <div class="mb-4">
      <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
        Task Title
      </label>
      <input 
        id="title"
        v-model="formData.title" 
        type="text" 
        placeholder="Ex: Client meeting"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <textarea 
        id="description"
        v-model="formData.description" 
        placeholder="Describe the task..."
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      ></textarea>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label for="priority" class="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <select 
          id="priority" 
          v-model="formData.priority"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="NONE">None</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select 
          id="status" 
          v-model="formData.status"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label for="startDatetime" class="block text-sm font-medium text-gray-700 mb-2">
          Start Date
        </label>
        <input 
          id="startDatetime"
          v-model="formData.startDatetime" 
          type="datetime-local"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label for="endDatetime" class="block text-sm font-medium text-gray-700 mb-2">
          End Date
        </label>
        <input 
          id="endDatetime"
          v-model="formData.endDatetime" 
          type="datetime-local"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>

    <div class="flex gap-3">
      <button 
        type="submit" 
        class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
      >
        Create Task
      </button>
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold transition-colors"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['cancel', 'submit'])

const formData = ref({
  title: '',
  description: '',
  priority: 'MEDIUM',
  status: 'TODO',
  startDatetime: '',
  endDatetime: ''
})

const handleSubmit = () => {
  if (formData.value.title.trim()) {
    emit('submit', formData.value)
    
    // Reset form
    formData.value = {
      title: '',
      description: '',
      priority: 'MEDIUM',
      status: 'TODO',
      startDatetime: '',
      endDatetime: ''
    }
  }
}
</script>