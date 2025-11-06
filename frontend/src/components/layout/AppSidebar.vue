<template>
  <aside class="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 shadow-sm">
    <!-- Logo Section -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <!-- Your PNG Logo -->
        <img src="@/assets/images/logo.png" alt="TaskUp Logo" class="w-16 h-16" />
        <!-- Text Logo -->
        <h2 class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-700 bg-clip-text text-transparent">TaskUp</h2>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-2">
        <li>
          <router-link
            to="/categories"
            class="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
            :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/categories' }">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
            Categories
          </router-link>
        </li>
        <li>
          <router-link
            to="/tasks"
            class="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
            :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/tasks' }">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Tasks
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- User Profile Section -->
    <div class="p-4 border-t border-gray-200">
      <div class="bg-emerald-50 rounded-lg p-4">
        <!-- User Info -->
        <div class="flex items-center space-x-3 mb-3">
          <!-- User Avatar -->
          <div class="relative">
            <img v-if="userPhoto" :src="userPhoto" alt="User profile" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
            <div v-else class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span class="text-white font-semibold text-sm">
                {{ getUserInitials(userName) }}
              </span>
            </div>
            <!-- Online status indicator -->
            <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 text-sm">{{ userName }}</p>
            <p class="text-xs text-gray-600">{{ userEmail }}</p>
          </div>
        </div>
        <!-- Logout Button -->
        <div class="flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LogoutButton from "@/components/auth/LogoutButton.vue";

const userName = ref("User");
const userEmail = ref("user@email.com");
const userPhoto = ref("");

const getUserInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    userName.value = userData.name || "User";
    userEmail.value = userData.email || "user@email.com";
    userPhoto.value = userData.photo || "";
  }
});
</script>
