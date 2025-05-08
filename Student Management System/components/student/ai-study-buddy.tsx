"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Bot, Lightbulb, Mic, Send, Sparkles, Volume2 } from "lucide-react"

export function AIStudyBuddy() {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I'm your AI Study Buddy. How can I help you today?" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Clear input
    setInput("")

    // Simulate AI response
    setIsLoading(true)

    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("math") || input.toLowerCase().includes("equation")) {
        response =
          "For math problems, remember to identify what's being asked, write down the relevant formulas, and solve step by step. Would you like me to explain a specific math concept?"
      } else if (input.toLowerCase().includes("history") || input.toLowerCase().includes("dates")) {
        response =
          "When studying history, create a timeline of events to visualize the sequence. Focus on understanding causes and effects rather than just memorizing dates."
      } else if (input.toLowerCase().includes("science") || input.toLowerCase().includes("chemistry")) {
        response =
          "For science topics, try to connect concepts to real-world examples. Visual aids like diagrams can help understand complex processes. Would you like a specific science topic explained?"
      } else if (input.toLowerCase().includes("english") || input.toLowerCase().includes("essay")) {
        response =
          "When writing essays, start with a clear thesis statement, support with evidence, and ensure your conclusion ties back to your main argument. Would you like tips on a specific writing aspect?"
      } else if (input.toLowerCase().includes("test") || input.toLowerCase().includes("exam")) {
        response =
          "For exam preparation, space out your studying over several days, use active recall techniques, and take practice tests. Getting good sleep before the exam is also crucial for memory consolidation."
      } else {
        response =
          "That's an interesting question! To study effectively, try breaking down the material into smaller chunks, use active recall techniques, and teach the concept to someone else. Would you like more specific study tips?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      toast({
        title: "Voice recording stopped",
        description: "Processing your question...",
        variant: "default",
      })

      // Simulate processing voice
      setTimeout(() => {
        setInput("Can you help me understand photosynthesis?")

        // Auto-send after a delay
        setTimeout(() => {
          handleSend()
        }, 800)
      }, 1500)
    } else {
      setIsRecording(true)
      toast({
        title: "Voice recording started",
        description: "Speak clearly into your microphone...",
        variant: "default",
      })
    }
  }

  const speakMessage = (message: string) => {
    toast({
      title: "Text-to-Speech",
      description: "Reading the message aloud...",
      variant: "default",
    })
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>AI Study Buddy</CardTitle>
            <CardDescription>Your personal learning assistant</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Tabs defaultValue="chat" className="flex-1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="summaries" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Summaries
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Study Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex flex-1 flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.role === "assistant" && (
                          <Avatar className="mt-1 h-6 w-6">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-muted-foreground"
                            onClick={() => speakMessage(message.content)}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center gap-2">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className={`h-9 w-9 shrink-0 ${isRecording ? "animate-pulse" : ""}`}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Ask anything about your studies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-9"
              />
              <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="summaries">
          <CardContent className="p-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Photosynthesis Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Photosynthesis is the process where plants convert light energy into chemical energy. Key
                    components: chlorophyll, carbon dioxide, water, and sunlight. The process produces glucose and
                    oxygen as byproducts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">World War II Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    1939: Germany invades Poland, war begins
                    <br />
                    1941: Pearl Harbor, US enters war
                    <br />
                    1944: D-Day invasion
                    <br />
                    1945: Germany surrenders, atomic bombs dropped, Japan surrenders
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Algebra Equations</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Linear equations: y = mx + b (m is slope, b is y-intercept)
                    <br />
                    Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a
                    <br />
                    Pythagorean theorem: a² + b² = c²
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="tips">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Spaced Repetition</h3>
                <p className="text-sm text-muted-foreground">
                  Review material at increasing intervals to improve long-term retention. Start with daily reviews, then
                  every few days, then weekly.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Active Recall</h3>
                <p className="text-sm text-muted-foreground">
                  Test yourself instead of passively re-reading. Create flashcards or practice questions to actively
                  retrieve information from memory.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Pomodoro Technique</h3>
                <p className="text-sm text-muted-foreground">
                  Study in focused 25-minute intervals with 5-minute breaks. After 4 intervals, take a longer 15-30
                  minute break to maintain productivity.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Feynman Technique</h3>
                <p className="text-sm text-muted-foreground">
                  Explain concepts in simple terms as if teaching someone else. This helps identify gaps in your
                  understanding and reinforces learning.
                </p>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
