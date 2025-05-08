"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Download, Send } from "lucide-react"

export function AdminAttendanceHeatmap() {
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("current")
  const { toast } = useToast()

  // Generate mock data for the heatmap
  const generateHeatmapData = () => {
    const days = 30
    const classes = 10
    const data = []

    for (let i = 0; i < classes; i++) {
      const classData = []
      for (let j = 0; j < days; j++) {
        // Generate a random attendance percentage between 70 and 100
        const attendance = Math.floor(Math.random() * 30) + 70
        classData.push(attendance)
      }
      data.push(classData)
    }

    return data
  }

  const heatmapData = generateHeatmapData()

  const getColorForValue = (value: number) => {
    if (value >= 95) return "bg-green-500"
    if (value >= 90) return "bg-green-400"
    if (value >= 85) return "bg-green-300"
    if (value >= 80) return "bg-yellow-300"
    if (value >= 75) return "bg-yellow-400"
    return "bg-red-400"
  }

  const handleExport = () => {
    toast({
      title: "Exporting attendance data",
      description: "Your report is being generated and will be available for download shortly.",
      variant: "default",
    })
  }

  const handleSendReport = () => {
    toast({
      title: "Sending attendance report",
      description: "The report will be emailed to all department heads.",
      variant: "default",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Attendance Heatmap</CardTitle>
            <CardDescription>Visualize attendance patterns across classes</CardDescription>
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
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="previous">Previous Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="mb-2 flex">
              <div className="w-20 shrink-0 text-sm font-medium">Class</div>
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="w-6 shrink-0 text-center text-xs font-medium">
                  {i + 1}
                </div>
              ))}
            </div>

            {heatmapData.map((classData, classIndex) => (
              <div key={classIndex} className="mb-1 flex">
                <div className="w-20 shrink-0 text-sm font-medium">
                  {selectedGrade === "all"
                    ? `Class ${classIndex + 1}`
                    : `${selectedGrade}-${String.fromCharCode(65 + classIndex)}`}
                </div>
                {classData.map((value, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-6 h-6 shrink-0 m-px rounded-sm ${getColorForValue(value)} flex items-center justify-center`}
                    title={`Day ${dayIndex + 1}: ${value}% attendance`}
                  >
                    <span className="text-xs font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="mt-4 flex items-center gap-4">
              <div className="text-sm font-medium">Legend:</div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                <span className="text-xs">95%+</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-green-400"></div>
                <span className="text-xs">90-94%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-green-300"></div>
                <span className="text-xs">85-89%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-yellow-300"></div>
                <span className="text-xs">80-84%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-yellow-400"></div>
                <span className="text-xs">75-79%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-red-400"></div>
                <span className="text-xs">&lt;75%</span>
              </div>
            </div>
          </div>
        </div>
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
