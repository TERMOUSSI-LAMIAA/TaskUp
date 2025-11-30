<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex-1 lg:ml-64 transition-all duration-300">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div class="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex-1 min-w-0">
              <!-- Welcome Message -->
              <div class="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-semibold text-gray-700">Welcome back,</h2>
                <span class="text-lg sm:text-xl font-bold text-blue-600 truncate">{{ username }}</span>
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <!-- Main Title -->
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Categories</h1>
              <p class="text-gray-600 mt-1 text-sm sm:text-base">Organize your tasks by category</p>
            </div>

            <!-- Search Bar -->
            <div class="relative group">
              <div class="relative flex items-center">
                <svg class="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search categories..."
                  class="pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5  border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg bg-white text-sm sm:text-base" />
                <button v-if="searchQuery" @click="clearSearch" class="absolute right-2 sm:right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Search Results Info -->
          <div v-if="searchQuery" class="mt-4 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span class="text-gray-700 font-medium">{{ filteredCategories.length }} category(s) found</span>
            <div class="flex items-center gap-2">
              <span class="bg-blue-100 text-blue-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                "{{ searchQuery }}"
              </span>
            </div>
            <button @click="clearSearch" class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear search
            </button>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="p-4 sm:p-6 lg:p-8">
        <CategoryGrid :categories="filteredCategories" @view="handleViewCategory" @delete-category="handleDeleteCategory" @add-category="handleAddCategory" @update-category="handleUpdateCategory" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import CategoryGrid from "@/components/categories/CategoryGrid.vue";
import { getCategories, updateCategory, createCategory, deleteCategory } from "@/services/categoryService.js";

const router = useRouter();
const categories = ref([]);
const searchQuery = ref("");

const username = computed(() => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      return user.username;
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  return "User";
});

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return categories.value;
  }
  
  const query = searchQuery.value.toLowerCase().trim();
  return categories.value.filter(category => 
    category.name.toLowerCase().includes(query)
  );
});

onMounted(() => {
  loadCategories();
});

const loadCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
};

const handleViewCategory = (categoryId) => {
  router.push(`/category/${categoryId}`);
};

const handleAddCategory = async (categoryData) => {
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }
    await createCategory(formData);
    await loadCategories();
  } catch (error) {
    console.error("Failed to create category:", error);
  }
};

const handleDeleteCategory = async (categoryId) => {
  try {
    await deleteCategory(categoryId);
    await loadCategories();
  } catch (error) {
    console.error("Failed to delete category:", error);
  }
};

const handleUpdateCategory = async ({ categoryId, formData }) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    await updateCategory(categoryId, formDataToSend);
    await loadCategories();
  } catch (error) {
    console.error("Failed to update category:", error);
  }
};

const clearSearch = () => {
  searchQuery.value = "";
};
</script>
