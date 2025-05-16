"use client"

import { Progress } from "@/components/ui/progress"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, Checkbox } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, CheckCircle, Clock, Download, ThumbsUp } from "lucide-react"

export function HomeworkTracker() {
  const [homeworks, setHomeworks] = useState([
    {
      id: 1,
      subject: "Mathematics",
      title: "Algebra Equations",
      dueDate: "Today, 11:59 PM",
      completed: false,
      progress: 75,
      urgent: true,
    },
    {
      id: 2,
      subject: "Science",
      title: "Lab Report: Chemical Reactions",
      dueDate: "Tomorrow, 5:00 PM",
      completed: false,
      progress: 30,
      urgent: false,
    },
    {
      id: 3,
      subject: "English",
      title: "Essay: Modern Literature",
      dueDate: "Friday, 3:00 PM",
      completed: false,
      progress: 50,
      urgent: false,
    },
    {
      id: 4,
      subject: "History",
      title: "Research: Ancient Civilizations",
      dueDate: "Next Monday",
      completed: false,
      progress: 10,
      urgent: false,
    },
  ])

  const { toast } = useToast()

  const toggleComplete = (id: number) => {
    setHomeworks((prev) =>
      prev.map((hw) =>
        hw.id === id ? { ...hw, completed: !hw.completed, progress: hw.completed ? hw.progress : 100 } : hw,
      ),
    )

    const homework = homeworks.find((hw) => hw.id === id)

    if (homework && !homework.completed) {
      toast({
        title: "Homework Completed! 🎉",
        description: `You've completed "${homework.title}". Great job!`,
        variant: "default",
      })
    }
  }

  const updateProgress = (id: number, newProgress: number) => {
    setHomeworks((prev) =>
      prev.map((hw) => (hw.id === id ? { ...hw, progress: newProgress, completed: newProgress === 100 } : hw)),
    )

    if (newProgress === 100) {
      const homework = homeworks.find((hw) => hw.id === id)
      if (homework) {
        toast({
          title: "Homework Completed! 🎉",
          description: `You've completed "${homework.title}". Great job!`,
          variant: "default",
        })
      }
    }
  }

  const addEmoji = (id: number, emoji: string) => {
    toast({
      title: `You reacted with ${emoji}`,
      description: "Your teacher will see your reaction.",
      variant: "default",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Homework Tracker</CardTitle>
        <CardDescription>Track and manage your assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatePresence>
            {homeworks.map((homework) => (
              <motion.div
                key={homework.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-lg border p-4 ${
                  homework.completed ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={homework.completed}
                      onClick={() => toggleComplete(homework.id)}
                      className={`mt-1 h-5 w-5 ${homework.completed ? "bg-green-500 text-primary-foreground" : ""}`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium ${homework.completed ? "line-through text-muted-foreground" : ""}`}>
                          {homework.title}
                        </h3>
                        {homework.urgent && !homework.completed && (
                          <Badge variant="destructive" className="text-xs">
                            Due Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{homework.subject}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due: {homework.dueDate}</span>
                      </div>

                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">Progress</span>
                          <span className="text-xs font-medium">{homework.progress}%</span>
                        </div>
                        <Progress value={homework.progress} className="h-2" />
                      </div>

                      <div className="mt-3 flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 rounded-full px-2 text-xs"
                          onClick={() => addEmoji(homework.id, "🎯")}
                        >
                          🎯
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 rounded-full px-2 text-xs"
                          onClick={() => addEmoji(homework.id, "😅")}
                        >
                          😅
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 rounded-full px-2 text-xs"
                          onClick={() => addEmoji(homework.id, "❤️")}
                        >
                          ❤️
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                    {!homework.completed && (
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateProgress(homework.id, Math.min(100, homework.progress + 25))}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {homework.completed && (
                  <div className="absolute right-3 top-3 rounded-full bg-green-500 p-1 text-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Clock className="mr-2 h-4 w-4" />
          View Past Assignments
        </Button>
        <Button size="sm">
          <BookOpen className="mr-2 h-4 w-4" />
          Start Homework
        </Button>
      </CardFooter>
    </Card>
  )
}
