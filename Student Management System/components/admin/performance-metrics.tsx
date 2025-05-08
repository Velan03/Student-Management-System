"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, Download, LineChart, PieChart, Send } from "lucide-react"

export function AdminPerformanceMetrics() {
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: "Exporting performance data",
      description: "Your report is being generated and will be available for download shortly.",
      variant: "default",
    })
  }

  const handleSendReport = () => {
    toast({
      title: "Sending performance report",
      description: "The report will be emailed to all department heads.",
      variant: "default",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Analyze student performance across subjects</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bar" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Bar Chart
            </TabsTrigger>
            <TabsTrigger value="line" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Line Chart
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bar">
            <div className="aspect-[2/1] w-full rounded-lg border bg-gradient-to-br from-purple-50 to-indigo-50 p-4 dark:from-purple-950/50 dark:to-indigo-950/50">
              <div className="flex h-full flex-col items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Bar chart visualization of performance metrics
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  (Visualization would be rendered here in a production environment)
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">76.3%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Highest Class</p>
                <p className="text-2xl font-bold">10A</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Lowest Class</p>
                <p className="text-2xl font-bold">11C</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Improvement</p>
                <p className="text-2xl font-bold">+4.2%</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="line">
            <div className="aspect-[2/1] w-full rounded-lg border bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-blue-950/50 dark:to-cyan-950/50">
              <div className="flex h-full flex-col items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Line chart showing performance trends over time
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  (Visualization would be rendered here in a production environment)
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Trend</p>
                <p className="text-2xl font-bold">Upward</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold">2.7%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Peak Month</p>
                <p className="text-2xl font-bold">March</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">Consistency</p>
                <p className="text-2xl font-bold">Medium</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pie">
            <div className="aspect-[2/1] w-full rounded-lg border bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950/50 dark:to-emerald-950/50">
              <div className="flex h-full flex-col items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-center text-sm text-muted-foreground">Pie chart showing grade distribution</p>
                <p className="text-center text-xs text-muted-foreground">
                  (Visualization would be rendered here in a production environment)
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">A Grade</p>
                <p className="text-2xl font-bold">22%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">B Grade</p>
                <p className="text-2xl font-bold">35%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">C Grade</p>
                <p className="text-2xl font-bold">28%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">D Grade</p>
                <p className="text-2xl font-bold">12%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground">F Grade</p>
                <p className="text-2xl font-bold">3%</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export Data
        </Button>
        <Button className="gap-2" onClick={handleSendReport}>
          <Send className="h-4 w-4" />
          Send Report
        </Button>
      </CardFooter>
    </Card>
  )
}
