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
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
              <p class="text-gray-600 mt-1 text-sm sm:text-base">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="p-4 sm:p-6 lg:p-8">
        <div class="max-w-2xl mx-auto">
          <div v-if="loading" class="text-center py-8 sm:py-10 text-gray-500">
            <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-emerald-500 mx-auto mb-3 sm:mb-4"></div>
            Loading profile...
          </div>

          <div v-else class="space-y-6 bg-white p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 rounded-xl sm:rounded-2xl">
            <!-- Profile Photo -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div class="flex justify-center sm:justify-start">
                <div class="relative">
                  <!-- Show image if photo exists-->
                  <img v-if="previewPhoto || user.photo" :src="previewPhoto || user.photo" class="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg" />
                  <div
                    v-else
                    class="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-emerald-500 to-emerald-600 text-xl sm:text-2xl font-bold text-white shadow-lg">
                    {{ getUserInitials(user.username) }}
                  </div>
                  <div class="absolute -bottom-2 -right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white bg-emerald-500"></div>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <label class="mb-2 block text-sm font-medium text-gray-700">Profile Photo</label>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                  <input
                    type="file"
                    @change="handlePhotoChange"
                    accept="image/*"
                    class="block w-fulltext-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 sm:file:px-4 file:py-2 file:text-xs sm:file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100" />
                  <button v-if="previewPhoto" @click="cancelPhotoChange" class="px-3 py-2 text-xs sm:text-sm text-gray-600 transition-colors hover:text-gray-800 whitespace-nowrap">Cancel</button>
                </div>
              </div>
            </div>

            <!-- Username -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Username</label>
              <input
                v-model="form.username"
                type="text"
                class="w-full rounded-lg sm:rounded-xl border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                placeholder="Enter your username" />
            </div>

            <!-- Email (Read Only) -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input
                :value="user.email"
                class="w-full cursor-not-allowed rounded-lg sm:rounded-xl border border-gray-300 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-600 text-sm sm:text-base"
                disabled />
              <p class="mt-1 text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <!-- Password Change -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">New Password</label>
              <input
                v-model="form.password"
                type="password"
                placeholder="Leave empty to keep current password"
                class="w-full rounded-lg sm:rounded-xl border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base" />
              <p class="mt-1 text-xs text-gray-500">Leave blank if you don't want to change your password</p>
            </div>

            <!-- Account Info -->
            <div class="border-t border-gray-200 pt-4 sm:pt-6">
              <h3 class="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-gray-700">Account Information</h3>
              <div class="grid grid-cols-1 gap-3 sm:gap-4 text-sm">
                <div>
                  <p class="text-gray-500 text-xs sm:text-sm">Member since</p>
                  <p class="font-medium text-gray-900 text-sm sm:text-base">{{ formatDate(user.createdAt) }}</p>
                </div>
                <div>
                  <p class="text-gray-500 text-xs sm:text-sm">Last updated</p>
                  <p class="font-medium text-gray-900 text-sm sm:text-base">{{ formatDate(user.updatedAt) }}</p>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="flex flex-col sm:flex-row gap-3 border-t border-gray-200 pt-4 sm:pt-6">
              <button
                @click="updateProfile"
                :disabled="saving"
                class="flex items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 text-sm sm:text-base">
                <svg v-if="saving" class="-ml-1 mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ saving ? "Saving..." : "Save Changes" }}
              </button>

              <button
                @click="resetForm"
                class="rounded-lg sm:rounded-xl border border-gray-300 px-4 sm:px-6 py-2.5 sm:py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 text-sm sm:text-base">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import { updateUserProfile } from '@/services/authService.js';

const loading = ref(true);
const saving = ref(false);
const previewPhoto = ref(null);

const username = ref("User");
const user = ref({
  username: "",
  email: "",
  photo: null,
  createdAt: "",
  updatedAt: "",
});

const form = reactive({
  username: "",
  password: "",
  photo: null,
});

const getUserInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const loadUserData = () => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      user.value = {
        username: userObj.username || "",
        email: userObj.email || "",
        // photo: userObj.photo ? `http://localhost:3000/uploads/profiles/${userObj.photo}` : null,
        photo: userObj.photo ? `${import.meta.env.VITE_API_URL}/uploads/profiles/${userObj.photo}` : null,
        createdAt: userObj.createdAt || "",
        updatedAt: userObj.updatedAt || "",
      };
      username.value = userObj.username || "User";
      form.username = userObj.username || "";
    }
  } catch (error) {
    console.error("Error loading user data:", error);
  }
};

onMounted(() => {
  loadUserData();
  loading.value = false;
});

const handlePhotoChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewPhoto.value = e.target.result;
      form.photo = file;
    };
    reader.readAsDataURL(file);
  }
};

const cancelPhotoChange = () => {
  previewPhoto.value = null;
  form.photo = null;
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) fileInput.value = "";
};

const resetForm = () => {
  form.username = user.value.username;
  form.password = "";
  form.photo = null;
  previewPhoto.value = null;
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) fileInput.value = "";
};

const updateProfile = async () => {
  saving.value = true;

  try {
    const formData = new FormData();
    formData.append("username", form.username);
    if (form.password) {
      formData.append("password", form.password);
    }
    if (form.photo) {
      formData.append("photo", form.photo);
    }

   const response = await updateUserProfile(formData);
    const updatedUser = response.data.user;


    const currentUser = JSON.parse(localStorage.getItem("user"));
    const updatedUserData = {
      ...currentUser,
      username: updatedUser.username,
      photo: updatedUser.photo,
      updatedAt: updatedUser.updatedAt,
    };
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    loadUserData();

    previewPhoto.value = null;
    form.photo = null;
    form.password = "";

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";

    window.dispatchEvent(new CustomEvent("userUpdated"));
  } catch (error) {
    console.error("Error updating profile:", error);
  } finally {
    saving.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
