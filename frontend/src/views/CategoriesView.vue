<template>
  <div class="flex min-h-screen bg-gray-50 ">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex-1 ml-64 ">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
                    <!-- Welcome Message -->
          <div class="flex items-center gap-3 mb-2">
            <h2 class="text-xl font-semibold text-gray-700">Welcome back,</h2>
            <span class="text-xl font-bold text-blue-600">{{ username }}</span>
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
               <!-- Main Title -->
              <h1 class="text-3xl font-bold text-gray-900">Categories</h1>
              <p class="text-gray-600 mt-1">Organize your tasks by category</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="p-8">
        <CategoryGrid 
          :categories="categories"
          @view="handleViewCategory"
          @edit-category="handleEditCategory"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted , computed} from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CategoryGrid from '@/components/categories/CategoryGrid.vue'

const router = useRouter()
const categories = ref([])

const username = computed(() => {
  try {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      return user.username 
    }
  } catch (error) {
    console.error('Error parsing user data:', error)
  }
  return 'User' 
})

onMounted(() => {
  loadCategories()
})

const loadCategories = () => {
  
}

const handleViewCategory = (categoryId) => {
  router.push(`/category/${categoryId}`)
}

const handleEditCategory = (categoryId) => {
  console.log('Edit category:', categoryId)
}
</script>
