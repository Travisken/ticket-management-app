<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (email.value === 'test@example.com' && password.value === 'password123') {
    localStorage.setItem('ticketAppUser', JSON.stringify({ email: email.value }))
    router.push('/dashboard')
  } else {
    error.value = 'Invalid email or password'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8 border border-border">
        <h1 class="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p class="text-secondary mb-8">Sign in to your ticket management account</p>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        <p class="text-center text-secondary mt-6">
          Don't have an account?
          <router-link to="/signup" class="text-primary font-semibold hover:underline">
            Sign up
          </router-link>
        </p>

        <div class="mt-6 p-3 bg-blue-50 rounded-lg text-sm text-secondary">
          <p class="font-semibold mb-1">Demo Credentials:</p>
          <p>Email: test@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  </div>
</template>
