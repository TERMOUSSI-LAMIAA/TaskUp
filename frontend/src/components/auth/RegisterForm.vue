<template>
  <form @submit.prevent="handleRegister" class="space-y-5">
    <!-- Profile Photo Upload -->
    <div class="space-y-2">
      <label class="block text-sm font-semibold text-gray-700">Profile Photo</label>
      <div class="flex items-center gap-4">
        <!-- Photo Preview -->
        <div class="relative">
          <img v-if="form.photoPreview" :src="form.photoPreview" class="w-16 h-16 rounded-full object-cover border-2 border-emerald-200" alt="Profile preview" />
          <div v-else class="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-100 to-purple-100 border-2 border-dashed border-emerald-300 flex items-center justify-center">
            <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <!-- Upload Button -->
        <div class="flex-1">
          <input id="photo" type="file" accept="image/*" @change="handlePhotoUpload" class="hidden" />
          <label
            for="photo"
            class="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-emerald-200 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ form.photo ? "Change Photo" : "Upload Photo" }}
          </label>
          <p class="text-xs text-gray-500 mt-1">Optional - JPG, PNG up to 2MB</p>
        </div>
      </div>
      <span v-if="errors.photo" class="text-sm text-red-500">{{ errors.photo }}</span>
    </div>

    <!-- Username Input -->
    <div class="space-y-2">
      <label for="username" class="block text-sm font-semibold text-gray-700">Username</label>
      <div class="relative">
        <input
          id="username"
          v-model="form.username"
          type="text"
          placeholder="myusername"
          class="w-full px-4 py-3 bg-gradient-to-r from-emerald-50 to-purple-50 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all placeholder-gray-400"
          required />
        <svg class="absolute right-3 top-3.5 w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <span v-if="errors.username" class="text-sm text-red-500">{{ errors.username }}</span>
    </div>

    <!-- Email Input -->
    <div class="space-y-2">
      <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
      <div class="relative">
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="your@email.com"
          class="w-full px-4 py-3 bg-gradient-to-r from-emerald-50 to-purple-50 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all placeholder-gray-400"
          required />
        <svg class="absolute right-3 top-3.5 w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</span>
    </div>

    <!-- Password Input -->
    <div class="space-y-2">
      <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
      <div class="relative">
        <input
          id="password"
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="w-full px-4 py-3 bg-gradient-to-r from-emerald-50 to-purple-50 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all placeholder-gray-400"
          required />
        <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-3.5 text-gray-500 hover:text-emerald-600 transition-colors">
          <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        </button>
      </div>
      <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</span>
    </div>

    <!-- Confirm Password Input -->
    <div class="space-y-2">
      <label for="confirmPassword" class="block text-sm font-semibold text-gray-700">Confirm password</label>
      <div class="relative">
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="w-full px-4 py-3 bg-gradient-to-r from-emerald-50 to-purple-50 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all placeholder-gray-400"
          required />
        <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-3.5 text-gray-500 hover:text-emerald-600 transition-colors">
          <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        </button>
      </div>
      <span v-if="errors.confirmPassword" class="text-sm text-red-500">{{ errors.confirmPassword }}</span>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="isLoading"
      class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
      <span v-if="!isLoading">Create account</span>
      <span v-else class="flex items-center gap-2">
        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Signing up...
      </span>
    </button>

    <!-- Error Message -->
    <div v-if="errors.general" class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-sm text-red-700">{{ errors.general }}</p>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { signup } from "@/services/authService.js";

const emit = defineEmits(["register-success"]);

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  photo: null,
  photoPreview: null,
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errors = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  photo: "",
  general: "",
});

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      errors.value.photo = "Please select an image file";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      errors.value.photo = "Image must be less than 2MB";
      return;
    }

    form.value.photo = file;
    errors.value.photo = "";

    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.photoPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const validateForm = () => {
  errors.value = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    general: "",
  };

  if (!form.value.username) {
    errors.value.username = "username is required";
  } else if (form.value.username.length < 3) {
    errors.value.username = "username must be at least 3 characters long";
  }

  if (!form.value.email) {
    errors.value.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = "Invalid email address";
  }

  if (!form.value.password) {
    errors.value.password = "Password is required";
  } else if (form.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters long";
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = "Passwords do not match";
  }

  return !Object.values(errors.value).some((error) => error !== "");
};

const handleRegister = async () => {
  if (!validateForm()) return;
  isLoading.value = true;
  errors.value.general = "";

  try {
    const formData = new FormData();
    formData.append("username", form.value.username);
    formData.append("email", form.value.email);
    formData.append("password", form.value.password);

    if (form.value.photo) {
      formData.append("photo", form.value.photo);
    }
    const response = await signup(formData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    emit("register-success");
  } catch (error) {
    console.error("Registration error:", error);
    if (error.response?.status === 400) {
      errors.value.general = error.response.data.message || "Registration failed. Please check your input.";
    } else if (error.response?.status === 409) {
      errors.value.general = "Email already exists. Please use a different email.";
    } else if (error.response?.data?.message) {
      errors.value.general = error.response.data.message;
    } else {
      errors.value.general = "Registration failed. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
