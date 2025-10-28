"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"

interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  userId: string
}

interface User {
  id: string
  email: string
  name: string
}

export default function TicketsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(currentUser)
    setUser(userData)

    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const userTickets = allTickets.filter((t: Ticket) => t.userId === userData.id)
    setTickets(userTickets)
    setIsLoading(false)
  }, [router])

  const filteredTickets = filterStatus === "all" ? tickets : tickets.filter((t) => t.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-amber-100 text-amber-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-amber-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader user={user || { id: "", email: "", name: "" }} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading tickets...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">All Tickets</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage and organize your tickets</p>
          </div>
          <Link href="/dashboard/tickets/new" className="w-full sm:w-auto">
            <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">Create Ticket</Button>
          </Link>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className={`text-xs sm:text-sm ${filterStatus === "all" ? "bg-primary text-white" : "bg-transparent"}`}
          >
            All ({tickets.length})
          </Button>
          <Button
            variant={filterStatus === "open" ? "default" : "outline"}
            onClick={() => setFilterStatus("open")}
            className={`text-xs sm:text-sm ${filterStatus === "open" ? "bg-green-600 text-white" : "bg-transparent"}`}
          >
            Open ({tickets.filter((t) => t.status === "open").length})
          </Button>
          <Button
            variant={filterStatus === "in_progress" ? "default" : "outline"}
            onClick={() => setFilterStatus("in_progress")}
            className={`text-xs sm:text-sm ${filterStatus === "in_progress" ? "bg-amber-600 text-white" : "bg-transparent"}`}
          >
            In Progress ({tickets.filter((t) => t.status === "in_progress").length})
          </Button>
          <Button
            variant={filterStatus === "closed" ? "default" : "outline"}
            onClick={() => setFilterStatus("closed")}
            className={`text-xs sm:text-sm ${filterStatus === "closed" ? "bg-gray-600 text-white" : "bg-transparent"}`}
          >
            Closed ({tickets.filter((t) => t.status === "closed").length})
          </Button>
        </div>

        {filteredTickets.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center border border-border">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">No tickets found in this category</p>
            <Link href="/dashboard/tickets/new">
              <Button className="bg-primary hover:bg-primary/90 text-white">Create First Ticket</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredTickets.map((ticket) => (
              <Link key={ticket.id} href={`/dashboard/tickets/${ticket.id}`}>
                <Card className="p-4 sm:p-6 border border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 break-words">
                        {ticket.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">{ticket.description}</p>
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                        <span className={`text-xs sm:text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent whitespace-nowrap">
                      View
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
