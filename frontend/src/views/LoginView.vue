<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 animate-gradient-x"></div>

    <!-- Content -->
    <div class="relative w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
           <img src="@/assets/images/logo.png" alt="TaskUp Logo" class="w-18 h-18">
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent mb-3 drop-shadow-sm">TaskUp</h1>
        <p class="text-white/80 text-lg font-medium">Organize your tasks effectively</p>
      </div>

      <!-- Login Form Card -->
      <div class="bg-white/95 rounded-3xl shadow-2xl backdrop-blur-lg p-8 border border-white/30 transform transition-all duration-300 hover:shadow-3xl">
        <LoginForm @login-success="handleLoginSuccess" />
      </div>

      <!-- Sign Up Link -->
      <div class="text-center mt-8">
        <p class="text-white/90 font-medium">
          Don't have an account yet?
          <router-link 
            to="/register" 
            class="text-white font-semibold hover:text-emerald-200 transition-all duration-300 hover:underline underline-offset-4 ml-1">
            Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import LoginForm from "@/components/auth/LoginForm.vue";

const router = useRouter();

const handleLoginSuccess = () => {
  router.push("/");
};
</script>
