"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Bell,
  BookOpen,
  Calendar,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  X,
  Sparkles,
  Zap,
} from "lucide-react"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [router])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      variant: "default",
    })
    router.push("/")
  }

  const getNavItems = () => {
    if (user?.role === "student") {
      return [
        { icon: Home, label: "Dashboard", href: "/student/dashboard" },
        { icon: BookOpen, label: "Homework", href: "/student/homework" },
        { icon: Calendar, label: "Schedule", href: "/student/schedule" },
        { icon: MessageSquare, label: "Messages", href: "/student/messages" },
        { icon: User, label: "Profile", href: "/student/profile" },
        { icon: Sparkles, label: "AI Tools", href: "/student/ai-tools" },
      ]
    } else if (user?.role === "teacher") {
      return [
        { icon: Home, label: "Dashboard", href: "/teacher/dashboard" },
        { icon: Users, label: "Students", href: "/teacher/students" },
        { icon: BookOpen, label: "Assignments", href: "/teacher/assignments" },
        { icon: Calendar, label: "Schedule", href: "/teacher/schedule" },
        { icon: MessageSquare, label: "Messages", href: "/teacher/messages" },
        { icon: Zap, label: "AI Assistant", href: "/teacher/ai-assistant" },
      ]
    } else {
      return [
        { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: Calendar, label: "Calendar", href: "/admin/calendar" },
        { icon: Bell, label: "Notifications", href: "/admin/notifications" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
        { icon: Sparkles, label: "AI Analytics", href: "/admin/ai-analytics" },
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-semibold text-gradient">EduPulse AI</span>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-background p-6 shadow-lg transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-gradient">EduPulse AI</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close Menu</span>
          </Button>
        </div>

        <nav className="mt-8 flex flex-col gap-6">
          {navItems.map((item, index) => (
            <Button key={index} variant="ghost" className="justify-start gap-2" onClick={() => router.push(item.href)}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}

          <Button
            variant="ghost"
            className="justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 border-r bg-background lg:block">
          <div className="flex h-14 items-center border-b px-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-semibold text-gradient">EduPulse AI</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="mt-auto border-t p-4">
            <div className="flex items-center justify-between">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
