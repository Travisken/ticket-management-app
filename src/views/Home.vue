<!-- eslint-disable vue/no-setup-props-destructure -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Navigation -->
    <nav class="border-b border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">TicketHub</h1>
        <div class="flex gap-4">
          <router-link to="/login" class="px-4 py-2 text-foreground hover:text-primary transition">
            Login
          </router-link>
          <router-link to="/signup" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-600 transition">
            Sign Up
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        <path d="M0,400 Q360,300 720,400 T1440,400 L1440,0 L0,0 Z" fill="url(#grad1)" />
      </svg>

      <!-- Decorative circles -->
      <div class="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-3xl"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div class="text-center">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Manage Your Tickets Effortlessly
          </h2>
          <p class="text-lg sm:text-xl text-secondary mb-8 max-w-2xl mx-auto text-balance">
            Track, organize, and resolve tickets with our intuitive ticket management system. Built for teams that care about efficiency.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/signup" class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition">
              Get Started
            </router-link>
            <button @click="demoLogin" class="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-blue-50 transition">
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 bg-white rounded-lg border border-border">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">📋</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Easy Tracking</h3>
          <p class="text-secondary">Create and track tickets with detailed descriptions, priorities, and status updates.</p>
        </div>
        <div class="p-6 bg-white rounded-lg border border-border">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Real-time Updates</h3>
          <p class="text-secondary">See instant updates on ticket status and priority changes across your dashboard.</p>
        </div>
        <div class="p-6 bg-white rounded-lg border border-border">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">📊</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Analytics</h3>
          <p class="text-secondary">Get insights into your ticket metrics with comprehensive statistics and reports.</p>
        </div>
      </div>
    </div>

    <!-- Updated framework switcher to include all three frameworks -->
    <FrameworkSwitcher />

    <!-- Footer -->
    <footer class="border-t border-border bg-muted">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-secondary">
        <p>Built with Vue.js | Ticket Management System</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import FrameworkSwitcher from '../components/FrameworkSwitcher.vue'

const router = useRouter()

const demoLogin = () => {
  const demoUser = {
    email: 'test@example.com',
    password: 'password123'
  }
  localStorage.setItem('ticketAppUser', JSON.stringify(demoUser))
  router.push('/dashboard')
}
</script>
