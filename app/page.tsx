"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { FrameworkSwitcher } from "@/components/framework-switcher"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-foreground">TicketHub</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm sm:text-base">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm px-3 sm:px-4">Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Wavy Background */}
        <div className="absolute inset-0 -z-10">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d="M0,300 Q360,200 720,300 T1440,300 L1440,800 L0,800 Z" fill="url(#waveGradient)" />
            <path d="M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z" fill="rgb(59, 130, 246)" opacity="0.03" />
          </svg>

          {/* Decorative Circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-block px-3 sm:px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-xs sm:text-sm font-medium text-primary">Manage tickets effortlessly</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
              Streamline Your Workflow
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              TicketHub helps teams organize, track, and resolve issues faster. Built for modern teams that value
              efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto px-6 sm:px-8">
                  Get Started Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-6 sm:px-8 bg-transparent w-full sm:w-auto">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="p-6 sm:p-8 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Organize</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create, categorize, and prioritize tickets with ease. Keep your team aligned on what matters most.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Track</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monitor progress in real-time. See status updates, assignments, and deadlines at a glance.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Resolve</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Close tickets faster with clear workflows. Celebrate wins and learn from completed work.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Card className="p-8 sm:p-12 bg-primary/5 border border-primary/20">
          <div className="text-center space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Ready to get started?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Join teams worldwide using TicketHub to manage their work more effectively.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 sm:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-foreground">TicketHub</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
              © 2025 TicketHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <FrameworkSwitcher />
    </div>
  )
}
