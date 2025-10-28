"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  userId: string
}

interface TicketListProps {
  userId: string
}

export default function TicketList({ userId }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const userTickets = allTickets.filter((t: Ticket) => t.userId === userId)
    setTickets(userTickets)
    setIsLoading(false)
  }, [userId])

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

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Loading tickets...</div>
  }

  if (tickets.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-muted-foreground mb-4">No tickets yet. Create your first ticket to get started!</p>
        <Link href="/dashboard/tickets/new">
          <Button className="bg-primary hover:bg-primary/90 text-white">Create First Ticket</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Priority</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Created</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-foreground">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                >
                  {ticket.status.replace("_", " ")}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <Link href={`/dashboard/tickets/${ticket.id}`}>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
