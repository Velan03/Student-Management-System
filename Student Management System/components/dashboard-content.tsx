"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Download, BookOpen, Award, Users, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export function DashboardContent() {
  const [progress, setProgress] = useState(68)

  const courses = [
    { id: 1, name: "Advanced Mathematics", progress: 75, lessons: 12, completed: 9 },
    { id: 2, name: "Physics 101", progress: 45, lessons: 10, completed: 4 },
    { id: 3, name: "World History", progress: 90, lessons: 8, completed: 7 },
  ]

  const assignments = [
    { id: 1, title: "Calculus Problem Set", course: "Advanced Mathematics", due: "Today, 11:59 PM", status: "urgent" },
    { id: 2, title: "Physics Lab Report", course: "Physics 101", due: "Tomorrow, 5:00 PM", status: "upcoming" },
    { id: 3, title: "Historical Essay", course: "World History", due: "Next Week", status: "upcoming" },
  ]

  const achievements = [
    { id: 1, title: "Perfect Attendance", description: "Attended all classes for a month", icon: Users },
    { id: 2, title: "Math Wizard", description: "Scored 100% on 3 consecutive quizzes", icon: Award },
    { id: 3, title: "Bookworm", description: "Completed all assigned readings", icon: BookOpen },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress}%</div>
              <Progress value={progress} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">+2.5% from last week</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="mt-2 text-xs text-muted-foreground">Next: Physics 101 in 45 minutes</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="mt-2 text-xs text-muted-foreground">1 due today, 4 upcoming</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="mt-2 text-xs text-muted-foreground">3 new this month</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>
                      {course.completed} of {course.lessons} lessons completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={course.progress} className="h-2" />
                    <p className="mt-2 text-sm text-muted-foreground">{course.progress}% complete</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm">
                      Continue
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <motion.div
                key={assignment.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{assignment.title}</CardTitle>
                      {assignment.status === "urgent" ? (
                        <Badge variant="destructive">Due Soon</Badge>
                      ) : (
                        <Badge variant="outline">Upcoming</Badge>
                      )}
                    </div>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Due: {assignment.due}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm">Start Assignment</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Share Achievement
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
