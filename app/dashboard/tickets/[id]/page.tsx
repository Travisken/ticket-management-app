"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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

export default function TicketDetailPage() {
  const router = useRouter()
  const params = useParams()
  const ticketId = params.id as string

  const [user, setUser] = useState<User | null>(null)
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"open" | "in_progress" | "closed">("open")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(currentUser)
    setUser(userData)

    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const foundTicket = tickets.find((t: Ticket) => t.id === ticketId)

    if (!foundTicket) {
      router.push("/dashboard/tickets")
      return
    }

    setTicket(foundTicket)
    setTitle(foundTicket.title)
    setDescription(foundTicket.description)
    setStatus(foundTicket.status)
    setPriority(foundTicket.priority)
    setIsLoading(false)
  }, [router, ticketId])

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (!description.trim()) {
      setError("Description is required")
      return
    }

    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const updatedTickets = tickets.map((t: Ticket) =>
      t.id === ticketId
        ? {
            ...t,
            title,
            description,
            status,
            priority,
          }
        : t,
    )

    localStorage.setItem("tickets", JSON.stringify(updatedTickets))
    setTicket({
      ...ticket!,
      title,
      description,
      status,
      priority,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")
      const filteredTickets = tickets.filter((t: Ticket) => t.id !== ticketId)
      localStorage.setItem("tickets", JSON.stringify(filteredTickets))
      router.push("/dashboard/tickets")
    }
  }

  if (isLoading || !user || !ticket) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader user={user || { id: "", email: "", name: "" }} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading ticket...</p>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (s: string) => {
    switch (s) {
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ticket Details</h1>
            <p className="text-muted-foreground mt-1">View and manage ticket information</p>
          </div>
          <Button variant="outline" onClick={() => router.back()} className="bg-transparent">
            Back
          </Button>
        </div>

        <Card className="p-8 border border-border">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{ticket.title}</h2>
                <p className="text-muted-foreground">{ticket.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Priority</p>
                  <p className="font-medium text-foreground">
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <p className="font-medium text-foreground">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-border">
                <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90 text-white">
                  Edit Ticket
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="bg-transparent text-red-600 hover:bg-red-50"
                >
                  Delete Ticket
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={6}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "open" | "in_progress" | "closed")}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
              )}

              <div className="flex gap-4 pt-4 border-t border-border">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>
      </main>
    </div>
  )
}
