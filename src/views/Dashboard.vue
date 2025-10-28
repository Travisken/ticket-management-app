<!-- eslint-disable vue/no-setup-props-destructure -->
<template>
  <div class="min-h-screen bg-muted">
    <!-- Header -->
    <header class="bg-white border-b border-border sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">TicketHub</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-secondary">{{ user?.email }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 text-foreground border border-border rounded-lg hover:bg-muted transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white border-b border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
        <router-link
          to="/dashboard"
          class="py-4 px-2 border-b-2 font-medium transition"
          :class="$route.path === '/dashboard' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-foreground'"
        >
          Overview
        </router-link>
        <router-link
          to="/tickets"
          class="py-4 px-2 border-b-2 font-medium transition"
          :class="$route.path.includes('/tickets') ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-foreground'"
        >
          Tickets
        </router-link>
      </div>
    </nav>

    <!-- Framework Switcher -->
    <FrameworkSwitcher />

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-foreground mb-2">Welcome, {{ user?.name || user?.email }}</h2>
        <p class="text-secondary">Here's an overview of your ticket management system</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-secondary text-sm font-medium">Total Tickets</p>
              <p class="text-3xl font-bold text-foreground mt-2">{{ stats.total }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">📋</div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-secondary text-sm font-medium">Open</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.open }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-xl">✓</div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-secondary text-sm font-medium">In Progress</p>
              <p class="text-3xl font-bold text-amber-600 mt-2">{{ stats.inProgress }}</p>
            </div>
            <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xl">⚡</div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-secondary text-sm font-medium">Closed</p>
              <p class="text-3xl font-bold text-gray-600 mt-2">{{ stats.closed }}</p>
            </div>
            <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">✔</div>
          </div>
        </div>
      </div>

      <!-- Recent Tickets -->
      <div class="bg-white rounded-lg border border-border overflow-hidden">
        <div class="p-6 border-b border-border flex justify-between items-center">
          <h3 class="text-lg font-semibold text-foreground">Recent Tickets</h3>
          <router-link to="/tickets/new" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-600 transition">
            New Ticket
          </router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-muted border-b border-border">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Priority</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Created</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in recentTickets" :key="ticket.id" class="border-b border-border hover:bg-muted transition">
                <td class="px-6 py-4">
                  <router-link :to="`/tickets/${ticket.id}`" class="text-primary hover:underline font-medium">
                    {{ ticket.title }}
                  </router-link>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(ticket.status)"
                  >
                    {{ ticket.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-foreground">{{ ticket.priority }}</span>
                </td>
                <td class="px-6 py-4 text-sm text-secondary">{{ formatDate(ticket.createdAt) }}</td>
              </tr>
              <tr v-if="recentTickets.length === 0">
                <td colspan="4" class="px-6 py-8 text-center text-secondary">
                  No tickets yet. <router-link to="/tickets/new" class="text-primary hover:underline">Create one</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FrameworkSwitcher from '../components/FrameworkSwitcher.vue'

const router = useRouter()
const user = ref(null)
const tickets = ref([])

const loadTickets = () => {
  const stored = localStorage.getItem('tickets')
  tickets.value = stored ? JSON.parse(stored) : []
}

const stats = computed(() => ({
  total: tickets.value.length,
  open: tickets.value.filter(t => t.status === 'open').length,
  inProgress: tickets.value.filter(t => t.status === 'in_progress').length,
  closed: tickets.value.filter(t => t.status === 'closed').length
}))

const recentTickets = computed(() => {
  return tickets.value.slice(0, 5)
})

const getStatusClass = (status) => {
  const classes = {
    open: 'bg-green-100 text-green-700',
    in_progress: 'bg-amber-100 text-amber-700',
    closed: 'bg-gray-100 text-gray-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const handleLogout = () => {
  localStorage.removeItem('ticketAppUser')
  router.push('/')
}

onMounted(() => {
  const userData = localStorage.getItem('ticketAppUser')
  if (!userData) {
    router.push('/login')
    return
  }
  user.value = JSON.parse(userData)
  loadTickets()
})
</script>
