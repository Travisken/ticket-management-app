"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"

interface User {
  id: string
  email: string
  name: string
}

export default function NewTicketPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check auth on mount
  React.useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(currentUser))
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!title.trim()) {
      setError("Title is required")
      setIsLoading(false)
      return
    }

    if (!description.trim()) {
      setError("Description is required")
      setIsLoading(false)
      return
    }

    if (user) {
      const newTicket = {
        id: Date.now().toString(),
        title,
        description,
        status: "open",
        priority,
        createdAt: new Date().toISOString(),
        userId: user.id,
      }

      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")
      tickets.push(newTicket)
      localStorage.setItem("tickets", JSON.stringify(tickets))

      router.push("/dashboard/tickets")
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader user={{ id: "", email: "", name: "" }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create New Ticket</h1>
          <p className="text-muted-foreground mt-1">Add a new ticket to track your work</p>
        </div>

        <Card className="p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                type="text"
                placeholder="Enter ticket title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                placeholder="Enter ticket description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={6}
              />
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

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-white">
                {isLoading ? "Creating..." : "Create Ticket"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} className="bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
