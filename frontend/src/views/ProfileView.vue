<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex-1 ml-64">
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
              <h1 class="text-3xl font-bold text-gray-900">My Profile</h1>
              <p class="text-gray-600 mt-1">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="p-8">
        <div class="max-w-2xl mx-auto">
          <div v-if="loading" class="text-center py-10 text-gray-500">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            Loading profile...
          </div>

          <div v-else class="space-y-6 bg-white p-8 shadow-sm border border-gray-200 rounded-2xl">
            <!-- Profile Photo -->
            <div class="flex items-center gap-6">
              <div class="relative">
                <!-- Show image if photo exists-->
                <img v-if="previewPhoto || user.photo" :src="previewPhoto || user.photo" class="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg" />
                <div
                  v-else
                  class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-emerald-500 to-emerald-600 text-2xl font-bold text-white shadow-lg">
                  {{ getUserInitials(user.username) }}
                </div>
                <div class="absolute -bottom-2 -right-2 h-6 w-6 rounded-full border-2 border-white bg-emerald-500"></div>
              </div>
              <div class="flex-1">
                <label class="mb-2 block text-sm font-medium text-gray-700">Profile Photo</label>
                <div class="flex items-center gap-3">
                  <input
                    type="file"
                    @change="handlePhotoChange"
                    accept="image/*"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100" />
                  <button v-if="previewPhoto" @click="cancelPhotoChange" class="px-3 py-2 text-sm text-gray-600 transition-colors hover:text-gray-800">Cancel</button>
                </div>
              </div>
            </div>

            <!-- Username -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Username</label>
              <input
                v-model="form.username"
                type="text"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter your username" />
            </div>

            <!-- Email (Read Only) -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input :value="user.email" class="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600" disabled />
              <p class="mt-1 text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <!-- Password Change -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">New Password</label>
              <input
                v-model="form.password"
                type="password"
                placeholder="Leave empty to keep current password"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500" />
              <p class="mt-1 text-xs text-gray-500">Leave blank if you don't want to change your password</p>
            </div>

            <!-- Account Info -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="mb-4 text-lg font-semibold text-gray-700">Account Information</h3>
              <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <p class="text-gray-500">Member since</p>
                  <p class="font-medium text-gray-900">{{ formatDate(user.createdAt) }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Last updated</p>
                  <p class="font-medium text-gray-900">{{ formatDate(user.updatedAt) }}</p>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="flex gap-3 border-t border-gray-200 pt-6">
              <button
                @click="updateProfile"
                :disabled="saving"
                class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50">
                <svg v-if="saving" class="-ml-1 mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ saving ? "Saving..." : "Save Changes" }}
              </button>

              <button @click="resetForm" class="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">Reset</button>
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
        photo: userObj.photo ? `http://localhost:3000/uploads/profiles/${userObj.photo}` : null,
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

    const response = await fetch("http://localhost:3000/api/user/update", {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const result = await response.json();

    const updatedUser = result.user;

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
