<template>
  <!-- Mobile Menu Button -->
  <button
    @click="toggleSidebar"
    class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
    :class="{ 'left-64': isSidebarOpen }"
    style="transition: left 0.3s ease">
    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path v-if="!isSidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
  <!-- Overlay for mobile -->
  <div v-if="isSidebarOpen" @click="closeSidebar" class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>

  <!-- Sidebar -->
  <aside
    class="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 shadow-sm z-40 transform transition-transform duration-300 ease-in-out"
    :class="{
      '-translate-x-full lg:translate-x-0': !isSidebarOpen,
      'translate-x-0': isSidebarOpen,
    }">
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
            to="/dashboard"
            class="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
            :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/dashboard' }">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3v8H3m8 0h8m-8 0v8m0-8h8" />
            </svg>
            Dashboard
          </router-link>
        </li>

        <li>
          <router-link
            to="/"
            class="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
            :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/' }">
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
            to="/profile"
            class="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
            :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/profile' }">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.507 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Manage Profile
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
import { ref, onMounted, onUnmounted, watch } from "vue";
import LogoutButton from "@/components/auth/LogoutButton.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isSidebarOpen = ref(false);

const userName = ref("User");
const userEmail = ref("user@email.com");
const userPhoto = ref("");

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    closeSidebar();
  }
};

watch(
  () => route.path,
  () => {
    closeSidebarOnMobile();
  }
);

const handleEscapeKey = (event) => {
  if (event.key === "Escape" && isSidebarOpen.value) {
    closeSidebar();
  }
};

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = false;
  }
};

const getUserInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      userName.value = user.username || "User";
      userEmail.value = user.email || "user@email.com";
      // userPhoto.value = user.photo ? `http://localhost:3000/uploads/profiles/${user.photo}` : "";
      userPhoto.value = user.photo ? `${import.meta.env.VITE_API_URL}/uploads/profiles/${user.photo}` : "";
    }
  } catch (error) {
    console.error("Error loading user data:", error);
  }
};

onMounted(() => {
  loadUserFromStorage();
  window.addEventListener("userUpdated", loadUserFromStorage);
  window.addEventListener("resize", handleResize);
  window.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  window.removeEventListener("userUpdated", loadUserFromStorage);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("keydown", handleEscapeKey);
});
</script>

<style scoped>
aside {
  transition: transform 0.3s ease-in-out;
}

nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: #f1f1f1;
}

nav::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
