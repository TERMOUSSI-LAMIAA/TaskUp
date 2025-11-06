<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <CategoryCard 
      v-for="category in categories" 
      :key="category.id"
      :category="category"
      @view="handleViewCategory"
      @edit="handleEditCategory"
    />
    
    <!-- Add new category card -->
    <div 
      class="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 h-96 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 group"
      @click="showAddForm = true"
    >
      <svg class="w-12 h-12 text-gray-400 group-hover:text-emerald-500 transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <p class="text-gray-600 font-semibold group-hover:text-emerald-600 transition-colors">Add a category</p>
    </div>
  </div>

  <!-- Add Category Modal -->
  <div v-if="showAddForm" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">New category</h2>
      <CategoryForm @submit="handleAddCategory" @cancel="showAddForm = false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryCard from './CategoryCard.vue'
import CategoryForm from './CategoryForm.vue'

const router = useRouter()
const showAddForm = ref(false)

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-category', 'edit-category'])

const handleViewCategory = (categoryId) => {
  router.push(`/category/${categoryId}`)
}

const handleEditCategory = (categoryId) => {
  emit('edit-category', categoryId)
}

const handleAddCategory = (formData) => {
  emit('add-category', formData)
  showAddForm.value = false
}
</script>
