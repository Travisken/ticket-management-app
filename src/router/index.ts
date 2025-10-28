import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"
import Dashboard from "../views/Dashboard.vue"
import TicketList from "../views/TicketList.vue"
import TicketForm from "../views/TicketForm.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/dashboard", component: Dashboard },
  { path: "/tickets", component: TicketList },
  { path: "/tickets/new", component: TicketForm },
  { path: "/tickets/:id", component: TicketForm },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
