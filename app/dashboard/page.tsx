"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import StatCard from "@/components/stat-card"
import TicketList from "@/components/ticket-list"
import { FrameworkSwitcher } from "@/components/framework-switcher"

interface User {
  id: string
  email: string
  name: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  })

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(currentUser)
    setUser(userData)

    // Calculate stats from tickets
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const userTickets = tickets.filter((t: any) => t.userId === userData.id)

    setStats({
      total: userTickets.length,
      open: userTickets.filter((t: any) => t.status === "open").length,
      inProgress: userTickets.filter((t: any) => t.status === "in_progress").length,
      closed: userTickets.filter((t: any) => t.status === "closed").length,
    })

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <FrameworkSwitcher />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Here's an overview of your tickets</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Tickets" value={stats.total} color="bg-blue-50" textColor="text-blue-600" />
          <StatCard label="Open" value={stats.open} color="bg-green-50" textColor="text-green-600" />
          <StatCard label="In Progress" value={stats.inProgress} color="bg-amber-50" textColor="text-amber-600" />
          <StatCard label="Closed" value={stats.closed} color="bg-gray-50" textColor="text-gray-600" />
        </div>

        {/* Tickets Section */}
        <Card className="border border-border">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Your Tickets</h2>
              <p className="text-sm text-muted-foreground mt-1">Manage and track all your tickets</p>
            </div>
            <Link href="/dashboard/tickets/new">
              <Button className="bg-primary hover:bg-primary/90 text-white">Create Ticket</Button>
            </Link>
          </div>

          <TicketList userId={user.id} />
        </Card>
      </main>
    </div>
  )
}
