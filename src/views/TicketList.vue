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

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold text-foreground">All Tickets</h2>
          <p class="text-secondary mt-1">Manage and track all your tickets</p>
        </div>
        <router-link to="/tickets/new" class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-blue-600 transition font-semibold">
          New Ticket
        </router-link>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg border border-border p-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search tickets..."
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            v-model="filterStatus"
            class="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <!-- Tickets Table -->
      <div class="bg-white rounded-lg border border-border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-muted border-b border-border">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Priority</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Created</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in filteredTickets" :key="ticket.id" class="border-b border-border hover:bg-muted transition">
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
                <td class="px-6 py-4">
                  <router-link :to="`/tickets/${ticket.id}`" class="text-primary hover:underline text-sm font-medium">
                    View
                  </router-link>
                </td>
              </tr>
              <tr v-if="filteredTickets.length === 0">
                <td colspan="5" class="px-6 py-8 text-center text-secondary">
                  No tickets found
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

const router = useRouter()
const user = ref(null)
const tickets = ref([])
const searchQuery = ref('')
const filterStatus = ref('')

const loadTickets = () => {
  const stored = localStorage.getItem('tickets')
  tickets.value = stored ? JSON.parse(stored) : []
}

const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filterStatus.value || ticket.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
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
