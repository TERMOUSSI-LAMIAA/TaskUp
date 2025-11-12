<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Page not found</p>
      
      <button 
        @click="goToAppropriatePage"
        class="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  computed: {
    buttonText() {
      return this.isAuthenticated ? 'Back to dashboard' : 'Go to login'
    }
  },
  methods: {
    goToAppropriatePage() {
      if (this.isAuthenticated) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>