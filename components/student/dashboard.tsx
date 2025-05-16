"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, Calendar, CheckCircle2, Clock, MessageSquare, Star, TrendingUp } from "lucide-react"
import { AIStudyBuddy } from "@/components/student/ai-study-buddy"
import { ClassTimer } from "@/components/student/class-timer"
import { AttendanceStatus } from "@/components/student/attendance-status"
import { HomeworkTracker } from "@/components/student/homework-tracker"
import { CelebrationEffect } from "@/components/celebration-effects"
import { AIAvatarAssistant } from "@/components/ai-avatar-assistant"

export function StudentDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationType, setCelebrationType] = useState<"confetti" | "stars" | "fireworks" | "achievement">("confetti")

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "student") {
      router.push("/")
    } else {
      // Show celebration after a delay
      const timer = setTimeout(() => {
        setShowCelebration(true)
        setCelebrationType("achievement")

        toast({
          title: "Achievement Unlocked! 🏆",
          description: "You've maintained a 5-day study streak!",
          variant: "default",
        })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, user, router, toast])

  const handleCelebrationComplete = () => {
    setShowCelebration(false)
  }

  if (!isAuthenticated || user?.role !== "student") {
    return null
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 border-green-500 text-green-500">
            <CheckCircle2 size={12} /> Present Today
          </Badge>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AttendanceStatus />
        <ClassTimer />
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <Progress value={78} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="mt-2 text-xs text-muted-foreground">3 new this month</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="homework" className="space-y-4">
        <TabsList>
          <TabsTrigger value="homework" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Homework
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="ai-buddy" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Study Buddy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="homework" className="space-y-4">
          <HomeworkTracker />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "08:30 - 09:30", subject: "Mathematics", teacher: "Mrs. Johnson", room: "Room 101" },
                  { time: "09:45 - 10:45", subject: "Science", teacher: "Mr. Davis", room: "Lab 3" },
                  { time: "11:00 - 12:00", subject: "English", teacher: "Ms. Williams", room: "Room 205" },
                  { time: "12:00 - 13:00", subject: "Lunch Break", teacher: "", room: "Cafeteria" },
                  { time: "13:15 - 14:15", subject: "History", teacher: "Mr. Brown", room: "Room 302" },
                  { time: "14:30 - 15:30", subject: "Physical Education", teacher: "Coach Smith", room: "Gymnasium" },
                ].map((period, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{period.subject}</p>
                        <p className="text-sm text-muted-foreground">{period.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{period.time}</p>
                      <p className="text-sm text-muted-foreground">{period.room}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-buddy" className="space-y-4">
          <AIStudyBuddy />
        </TabsContent>
      </Tabs>

      <CelebrationEffect type={celebrationType} trigger={showCelebration} onComplete={handleCelebrationComplete} />

      <AIAvatarAssistant />
    </DashboardShell>
  )
}
