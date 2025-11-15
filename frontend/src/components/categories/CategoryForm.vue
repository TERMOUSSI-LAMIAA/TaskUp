<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Name -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
      <input
        v-model="formData.name"
        type="text"
        placeholder="Ex: Work"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
        required />
    </div>

    <!-- Image Upload -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">Image (Optional)</label>

      <!-- File Input -->
      <input
        type="file"
        accept="image/*"
        @change="handleImageUpload"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />

      <!-- Current Image Preview (for edit mode) -->
      <div v-if="props.category?.image && !imagePreview" class="mt-3">
        <p class="text-sm text-gray-600 mb-2">Current Image:</p>
        <img :src="`http://localhost:3000/uploads/categories/${props.category.image}`" :alt="props.category.name" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
        <p class="text-xs text-gray-500 mt-1">Select a new image to replace this one</p>
      </div>

      <!--New Image Preview -->
      <div v-if="imagePreview" class="mt-3">
        <p class="text-sm text-gray-600 mb-2">New Preview:</p>
        <img :src="imagePreview" alt="Image preview" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 pt-4">
      <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
      {{ props.category ? 'Update' : 'Create' }}
      </button>
      <button type="button" @click="$emit('cancel')" class="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  category: {
    type: Object,
    default: null,
  },
});

const formData = ref({
  name: "",
  image: null,
});

const imagePreview = ref("");

const emit = defineEmits(["cancel", "submit"]);

const initializeForm = () => {
  if (props.category) {
    formData.value.name = props.category.name;
    formData.value.image = null; 
    imagePreview.value = ""; 
  } else {
    formData.value = { name: "", image: null };
    imagePreview.value = "";
  }
};

onMounted(() => {
  initializeForm();
});

watch(
  () => props.category,
  () => {
    initializeForm();
  }
);

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    formData.value.image = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    formData.value.image = null;
    imagePreview.value = "";
  }
};

const handleSubmit = () => {
  if (formData.value.name.trim()) {
    const newCategory = {
      name: formData.value.name.trim(),
      image: formData.value.image,
    };
    emit("submit", newCategory);
    if (!props.category) {
      formData.value = { name: "", image: null };
      imagePreview.value = "";
    }
  }
};
</script>
