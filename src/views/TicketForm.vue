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

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <router-link to="/tickets" class="text-primary hover:underline mb-4 inline-block">
          ← Back to Tickets
        </router-link>
        <h2 class="text-3xl font-bold text-foreground">{{ isEditing ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg border border-border p-8 space-y-6">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">Title</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter ticket title"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            v-model="form.description"
            required
            rows="6"
            class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter ticket description"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Priority</label>
            <select
              v-model="form.priority"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ error }}
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            class="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            {{ isEditing ? 'Update Ticket' : 'Create Ticket' }}
          </button>
          <router-link to="/tickets" class="flex-1 border border-border text-foreground py-2 rounded-lg font-semibold hover:bg-muted transition text-center">
            Cancel
          </router-link>
        </div>

        <button
          v-if="isEditing"
          type="button"
          @click="handleDelete"
          class="w-full bg-red-50 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-100 transition border border-red-200"
        >
          Delete Ticket
        </button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const user = ref(null)
const isEditing = ref(false)
const error = ref('')
const form = reactive({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const loadTicket = () => {
  const stored = localStorage.getItem('tickets')
  const tickets = stored ? JSON.parse(stored) : []
  const ticket = tickets.find(t => t.id === route.params.id)
  if (ticket) {
    form.title = ticket.title
    form.description = ticket.description
    form.status = ticket.status
    form.priority = ticket.priority
  }
}

const handleSubmit = () => {
  if (!form.title || !form.description) {
    error.value = 'Please fill in all fields'
    return
  }

  const stored = localStorage.getItem('tickets')
  let tickets = stored ? JSON.parse(stored) : []

  if (isEditing.value) {
    const index = tickets.findIndex(t => t.id === route.params.id)
    if (index !== -1) {
      tickets[index] = {
        ...tickets[index],
        title: form.title,
        description: form.description,
        status: form.status,
        priority: form.priority
      }
    }
  } else {
    const newTicket = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      createdAt: new Date().toISOString()
    }
    tickets.push(newTicket)
  }

  localStorage.setItem('tickets', JSON.stringify(tickets))
  router.push('/tickets')
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    const stored = localStorage.getItem('tickets')
    let tickets = stored ? JSON.parse(stored) : []
    tickets = tickets.filter(t => t.id !== route.params.id)
    localStorage.setItem('tickets', JSON.stringify(tickets))
    router.push('/tickets')
  }
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

  if (route.params.id) {
    isEditing.value = true
    loadTicket()
  }
})
</script>
