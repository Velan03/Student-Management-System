"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, FileText, Lightbulb, Plus, Sparkles, Trash2 } from "lucide-react"

export function TeacherHomeworkManager() {
  const [homeworks, setHomeworks] = useState([
    {
      id: 1,
      title: "Algebra Equations",
      subject: "Mathematics",
      description: "Complete problems 1-20 on page 45 of the textbook",
      dueDate: "2023-05-15",
      status: "active",
    },
    {
      id: 2,
      title: "Lab Report: Chemical Reactions",
      subject: "Science",
      description: "Write a lab report on the chemical reaction experiment conducted in class",
      dueDate: "2023-05-18",
      status: "active",
    },
    {
      id: 3,
      title: "Essay: Modern Literature",
      subject: "English",
      description: "Write a 500-word essay analyzing the themes in the assigned short story",
      dueDate: "2023-05-20",
      status: "active",
    },
  ])

  const [newHomework, setNewHomework] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
  })

  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewHomework({ ...newHomework, [name]: value })
  }

  const handleSubjectChange = (value: string) => {
    setNewHomework({ ...newHomework, subject: value })
  }

  const handleAddHomework = () => {
    if (!newHomework.title || !newHomework.subject || !newHomework.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newId = homeworks.length > 0 ? Math.max(...homeworks.map((hw) => hw.id)) + 1 : 1

    setHomeworks([
      ...homeworks,
      {
        id: newId,
        ...newHomework,
        status: "active",
      },
    ])

    setNewHomework({
      title: "",
      subject: "",
      description: "",
      dueDate: "",
    })

    toast({
      title: "Homework added",
      description: `"${newHomework.title}" has been assigned to students`,
      variant: "default",
    })
  }

  const handleDeleteHomework = (id: number) => {
    setHomeworks(homeworks.filter((hw) => hw.id !== id))

    toast({
      title: "Homework deleted",
      description: "The assignment has been removed",
      variant: "default",
    })
  }

  const handleAISuggestion = () => {
    const suggestions = [
      {
        title: "Quadratic Equations Practice",
        subject: "Mathematics",
        description: "Solve the quadratic equations on worksheet 3B. Show all steps of your work.",
        dueDate: "2023-05-22",
      },
      {
        title: "Periodic Table Quiz Preparation",
        subject: "Science",
        description:
          "Study the first 20 elements of the periodic table, including their symbols, atomic numbers, and key properties.",
        dueDate: "2023-05-19",
      },
      {
        title: "Character Analysis",
        subject: "English",
        description: "Write a 2-page analysis of the protagonist's development throughout the novel.",
        dueDate: "2023-05-25",
      },
    ]

    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

    setNewHomework(suggestion)

    toast({
      title: "AI Suggestion",
      description: "Based on your curriculum, here's a suggested assignment",
      variant: "default",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Assign New Homework
            </CardTitle>
            <CardDescription>Create and assign homework to your students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Algebra Equations"
                value={newHomework.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Select value={newHomework.subject} onValueChange={handleSubjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Physical Education">Physical Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide detailed instructions for the assignment"
                value={newHomework.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </label>
              <Input id="dueDate" name="dueDate" type="date" value={newHomework.dueDate} onChange={handleInputChange} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleAISuggestion}>
              <Sparkles className="mr-2 h-4 w-4" />
              AI Suggestion
            </Button>
            <Button onClick={handleAddHomework}>
              <Plus className="mr-2 h-4 w-4" />
              Assign Homework
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Current Assignments
            </CardTitle>
            <CardDescription>Manage your active homework assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {homeworks.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                  <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No assignments yet</p>
                  <p className="text-xs text-muted-foreground">Create your first assignment</p>
                </div>
              ) : (
                homeworks.map((homework) => (
                  <motion.div
                    key={homework.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{homework.title}</h3>
                          <Badge>{homework.subject}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{homework.description}</p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Due: {new Date(homework.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteHomework(homework.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-between rounded-lg bg-muted p-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span className="text-xs">AI Tip</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Assign homework at least 3 days before due date for better completion rates
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
