"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
  user: {
    id: string
    email: string
    name: string
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-lg sm:text-xl text-foreground">TicketHub</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/dashboard/tickets" className="text-foreground hover:text-primary transition-colors">
            Tickets
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="text-right flex-1 sm:flex-none">
            <p className="text-xs sm:text-sm font-medium text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="bg-transparent text-xs sm:text-sm px-2 sm:px-4">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
