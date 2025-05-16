"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Mail, MessageSquare, Phone } from "lucide-react"

export function TeacherStudentCards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const students = [
    {
      id: 1,
      name: "Emma Thompson",
      grade: "10th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: 95,
      performance: 88,
      lastAssignment: "A-",
      notes: "Excellent participation in class discussions",
      status: "active",
    },
    {
      id: 2,
      name: "James Wilson",
      grade: "10th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: 78,
      performance: 72,
      lastAssignment: "C+",
      notes: "Needs help with algebra concepts",
      status: "at-risk",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      grade: "10th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: 92,
      performance: 94,
      lastAssignment: "A",
      notes: "Excellent work on science project",
      status: "active",
    },
    {
      id: 4,
      name: "Ethan Johnson",
      grade: "10th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: 85,
      performance: 79,
      lastAssignment: "B",
      notes: "Improving steadily in writing skills",
      status: "active",
    },
    {
      id: 5,
      name: "Olivia Brown",
      grade: "10th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: 65,
      performance: 68,
      lastAssignment: "C",
      notes: "Frequently late to class",
      status: "at-risk",
    },
  ]

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < students.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleContactParent = (method: string) => {
    toast({
      title: `Contacting parent via ${method}`,
      description: `Preparing to contact ${students[currentIndex].name}'s parents`,
      variant: "default",
    })
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={cardsContainerRef}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {students.map((student) => (
            <motion.div
              key={student.id}
              className="w-full flex-shrink-0 px-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{student.name}</CardTitle>
                        <CardDescription>{student.grade}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={student.status === "active" ? "outline" : "destructive"}
                      className={student.status === "active" ? "border-green-500 text-green-500" : ""}
                    >
                      {student.status === "active" ? "Active" : "At Risk"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Attendance</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{student.attendance}%</p>
                        <Badge
                          variant={
                            student.attendance >= 90
                              ? "outline"
                              : student.attendance >= 75
                                ? "secondary"
                                : "destructive"
                          }
                          className={student.attendance >= 90 ? "border-green-500 text-green-500" : ""}
                        >
                          {student.attendance >= 90 ? "Excellent" : student.attendance >= 75 ? "Good" : "Poor"}
                        </Badge>
                      </div>
                      <Progress value={student.attendance} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Performance</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{student.performance}%</p>
                        <Badge
                          variant={
                            student.performance >= 90
                              ? "outline"
                              : student.performance >= 75
                                ? "secondary"
                                : "destructive"
                          }
                          className={student.performance >= 90 ? "border-green-500 text-green-500" : ""}
                        >
                          {student.performance >= 90 ? "Excellent" : student.performance >= 75 ? "Good" : "Poor"}
                        </Badge>
                      </div>
                      <Progress value={student.performance} className="h-2" />
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Last Assignment</p>
                      <Badge>{student.lastAssignment}</Badge>
                    </div>
                    <p className="mt-2 text-sm">{student.notes}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleContactParent("email")}>
                      <Mail className="mr-1 h-3 w-3" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleContactParent("phone")}>
                      <Phone className="mr-1 h-3 w-3" />
                      Call
                    </Button>
                  </div>
                  <Button size="sm">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Message
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous Student
        </Button>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} of {students.length}
        </div>
        <Button variant="outline" size="sm" onClick={handleNext} disabled={currentIndex === students.length - 1}>
          Next Student
        </Button>
      </div>
    </div>
  )
}
