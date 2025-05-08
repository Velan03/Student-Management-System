"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Bell, BookOpen, Calendar, CheckCircle2, FileText, Mic, Search, Users } from "lucide-react"
import { TeacherStudentCards } from "@/components/teacher/student-cards"
import { TeacherHomeworkManager } from "@/components/teacher/homework-manager"
import { TeacherAttendance } from "@/components/teacher/attendance"

export function TeacherDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "teacher") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "teacher") {
    return null
  }

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      toast({
        title: "Voice input started",
        description: "Speak clearly to input homework details...",
        variant: "default",
      })

      // Simulate voice recognition
      setTimeout(() => {
        setIsRecording(false)
        toast({
          title: "Voice input processed",
          description: '"Assign math homework on quadratic equations due Friday"',
          variant: "default",
        })
      }, 3000)
    }
  }

  const handleNotifyAbsentees = () => {
    toast({
      title: "Smart Action",
      description: "Notifications sent to parents of 3 absent students",
      variant: "default",
    })
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students, classes..."
              className="w-[200px] pl-8 md:w-[260px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="mt-2 text-xs text-muted-foreground">Next: Science 101 in 30 minutes</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">92%</div>
                <Button variant="outline" size="sm" onClick={handleNotifyAbsentees}>
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />3 Absent
                </Button>
              </div>
              <Progress value={92} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="mt-2 text-xs text-muted-foreground">3 pending review, 5 upcoming</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Voice Input</CardTitle>
              <Mic className={`h-4 w-4 ${isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
              <Button variant={isRecording ? "destructive" : "outline"} className="w-full" onClick={handleVoiceInput}>
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? "Recording..." : "Speak to Input"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="homework" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Homework
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Attendance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <TeacherStudentCards />
        </TabsContent>

        <TabsContent value="homework" className="space-y-4">
          <TeacherHomeworkManager />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <TeacherAttendance />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
