"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulate signup
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      if (users.some((u: any) => u.email === email)) {
        setError("Email already registered")
        setIsLoading(false)
        return
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name }))

      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 border border-border">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-xl text-foreground">TicketHub</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create account</h1>
            <p className="text-muted-foreground">Join thousands of teams managing tickets</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-white">
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Already have an account?</span>
            </div>
          </div>

          <Link href="/login">
            <Button variant="outline" className="w-full bg-transparent">
              Sign in
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
