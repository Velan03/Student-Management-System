"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer } from "lucide-react"

export function ClassTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [quote, setQuote] = useState("")

  // Mock next class data
  const nextClass = {
    subject: "Science",
    time: "11:00 AM",
    teacher: "Mr. Davis",
    room: "Lab 3",
  }

  // Motivational quotes
  const quotes = [
    "The expert in anything was once a beginner.",
    "Education is the passport to the future.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "The more that you read, the more things you will know.",
    "Learning is a treasure that will follow its owner everywhere.",
  ]

  useEffect(() => {
    // Set a random quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])

    // Set a mock time for demo purposes
    setTimeLeft({
      hours: 0,
      minutes: 45,
      seconds: 0,
    })

    // Update timer every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer)
          return prev
        }

        let newHours = prev.hours
        let newMinutes = prev.minutes
        let newSeconds = prev.seconds - 1

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time with leading zeros
  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
          <CardTitle className="text-sm font-medium">Next Class</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">{nextClass.subject}</h3>
              <p className="text-xs text-muted-foreground">
                {nextClass.teacher} • {nextClass.room}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{nextClass.time}</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">{formatTime(timeLeft.hours)}</span>
              <span className="text-xs text-muted-foreground">hrs</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">{formatTime(timeLeft.minutes)}</span>
              <span className="text-xs text-muted-foreground">min</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">{formatTime(timeLeft.seconds)}</span>
              <span className="text-xs text-muted-foreground">sec</span>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-muted p-2 text-center">
            <p className="text-xs italic text-muted-foreground">"{quote}"</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
