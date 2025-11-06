<template>
  <div>
    <!-- Logout Button -->
    <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();


const handleLogout = async () => {

    router.push("/login");

};
</script>
