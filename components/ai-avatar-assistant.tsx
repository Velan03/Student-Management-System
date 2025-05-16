"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, X, Volume2, MessageSquare, Lightbulb } from "lucide-react"

type Message = {
  text: string
  type: "greeting" | "tip" | "help" | "achievement"
}

export function AIAvatarAssistant() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const messages: Record<string, Message[]> = {
    greeting: [
      { text: "Welcome back! Ready to learn something awesome today?", type: "greeting" },
      { text: "Hey there! I'm your AI study buddy. Need any help?", type: "greeting" },
      { text: "Good to see you! Your learning streak is impressive!", type: "greeting" },
    ],
    tip: [
      { text: "Try using the Pomodoro technique: 25 minutes of focus, then a 5-minute break!", type: "tip" },
      { text: "Did you know? Taking notes by hand can improve memory retention!", type: "tip" },
      { text: "Quick tip: Explaining a concept to someone else is one of the best ways to master it!", type: "tip" },
    ],
    help: [
      { text: "Need help with your assignments? I can provide step-by-step guidance!", type: "help" },
      { text: "Stuck on a problem? I can break it down for you!", type: "help" },
      { text: "I can help you create a study schedule that works for your learning style!", type: "help" },
    ],
    achievement: [
      { text: "Congratulations! You've completed 5 assignments this week! 🎉", type: "achievement" },
      { text: "Amazing! Your attendance streak is now 10 days! Keep it up! 🔥", type: "achievement" },
      { text: "You've improved your math score by 15%! That's incredible progress! 🚀", type: "achievement" },
    ],
  }

  useEffect(() => {
    // Show the assistant after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
      showRandomMessage("greeting")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const showRandomMessage = (type: string) => {
    const messageArray = messages[type]
    const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)]
    setCurrentMessage(randomMessage)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleTip = () => {
    showRandomMessage("tip")
    setIsExpanded(true)
  }

  const handleHelp = () => {
    showRandomMessage("help")
    setIsExpanded(true)
  }

  const playAudio = () => {
    // In a real implementation, this would use the Web Speech API
    // For now, we'll just show a notification
    alert("🔊 " + currentMessage?.text)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="flex flex-col items-end gap-2">
          {isExpanded && currentMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-2"
            >
              <Card className="w-64 bg-primary text-primary-foreground shadow-lg">
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <p className="text-sm">{currentMessage.text}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 rounded-full p-0 text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground"
                      onClick={playAudio}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="flex items-center gap-2">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-1"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background shadow-md"
                  onClick={handleTip}
                >
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background shadow-md"
                  onClick={handleHelp}
                >
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </Button>
              </motion.div>
            )}

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-background shadow-md"
                onClick={handleClose}
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </Button>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="default"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
                  onClick={handleExpand}
                >
                  <Bot className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
