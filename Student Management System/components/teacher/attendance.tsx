"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Calendar, CheckCircle, Clock, UserX, X } from "lucide-react"

export function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("10A")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const { toast } = useToast()

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "present",
      time: "08:25 AM",
    },
    {
      id: 2,
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "absent",
      time: "",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "present",
      time: "08:15 AM",
    },
    {
      id: 4,
      name: "Ethan Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "present",
      time: "08:22 AM",
    },
    {
      id: 5,
      name: "Olivia Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "absent",
      time: "",
    },
    {
      id: 6,
      name: "Noah Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "late",
      time: "08:45 AM",
    },
    {
      id: 7,
      name: "Ava Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "present",
      time: "08:20 AM",
    },
    {
      id: 8,
      name: "Liam Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "present",
      time: "08:18 AM",
    },
  ])

  const updateAttendance = (id: number, status: string) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            status,
            time: status === "present" ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
          }
        }
        return student
      }),
    )
  }

  const notifyParents = () => {
    const absentStudents = students.filter((student) => student.status === "absent")

    toast({
      title: `Notifying parents of ${absentStudents.length} absent students`,
      description: "Automated messages will be sent to parents",
      variant: "default",
    })
  }

  const getAttendanceStats = () => {
    const total = students.length
    const present = students.filter((student) => student.status === "present").length
    const absent = students.filter((student) => student.status === "absent").length
    const late = students.filter((student) => student.status === "late").length

    return {
      total,
      present,
      absent,
      late,
      presentPercentage: Math.round((present / total) * 100),
    }
  }

  const stats = getAttendanceStats()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Attendance Register</CardTitle>
              <CardDescription>Mark and manage student attendance</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10A">Class 10A</SelectItem>
                  <SelectItem value="10B">Class 10B</SelectItem>
                  <SelectItem value="10C">Class 10C</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-3 gap-4 rounded-lg border p-4">
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">{stats.presentPercentage}%</div>
              <div className="text-xs text-muted-foreground">Attendance Rate</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold">{stats.present}</span>
              </div>
              <div className="text-xs text-muted-foreground">Present</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <UserX className="h-4 w-4 text-red-500" />
                <span className="text-2xl font-bold">{stats.absent}</span>
              </div>
              <div className="text-xs text-muted-foreground">Absent</div>
            </div>
          </div>

          <div className="space-y-2">
            {students.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    {student.status === "present" && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Arrived: {student.time}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      student.status === "present" ? "outline" : student.status === "late" ? "secondary" : "destructive"
                    }
                    className={student.status === "present" ? "border-green-500 text-green-500" : ""}
                  >
                    {student.status === "present" ? "Present" : student.status === "late" ? "Late" : "Absent"}
                  </Badge>

                  <div className="flex gap-1">
                    <Button
                      variant={student.status === "present" ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => updateAttendance(student.id, "present")}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={student.status === "late" ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => updateAttendance(student.id, "late")}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={student.status === "absent" ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => updateAttendance(student.id, "absent")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View History
          </Button>
          <Button className="gap-2" onClick={notifyParents} disabled={!stats.absent}>
            <AlertCircle className="h-4 w-4" />
            Notify Parents ({stats.absent})
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
