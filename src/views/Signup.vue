<!-- eslint-disable vue/no-setup-props-destructure -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8 border border-border">
        <h1 class="text-3xl font-bold text-foreground mb-2">Create Account</h1>
        <p class="text-secondary mb-8">Join us to start managing your tickets</p>

        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
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

          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <input
              v-model="confirmPassword"
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
            Create Account
          </button>
        </form>

        <p class="text-center text-secondary mt-6">
          Already have an account?
          <router-link to="/login" class="text-primary font-semibold hover:underline">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSignup = () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  const user = { name: name.value, email: email.value }
  localStorage.setItem('ticketAppUser', JSON.stringify(user))
  localStorage.setItem('ticketAppPassword', password.value)
  router.push('/dashboard')
}
</script>
