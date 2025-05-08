"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, TrendingUp, AlertCircle } from "lucide-react"

export function AttendanceStatus() {
  const [showDetails, setShowDetails] = useState(false)
  const { toast } = useToast()

  const attendanceData = {
    present: 18,
    absent: 2,
    total: 20,
    percentage: 90,
    streak: 5,
    lastMonth: 85,
  }

  const handleNotifyParents = () => {
    toast({
      title: "Parents Notified",
      description: "Your attendance report has been sent to your parents.",
      variant: "default",
    })
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
          <CardTitle className="text-sm font-medium">Attendance Status</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{attendanceData.percentage}%</div>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />+{attendanceData.percentage - attendanceData.lastMonth}% from
                last month
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="bg-green-500 dark:bg-green-600" style={{ width: `${attendanceData.percentage}%` }} />
              </div>
              <span className="text-xs font-medium">
                {attendanceData.present}/{attendanceData.total} days
              </span>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{ height: showDetails ? "auto" : 0 }}
            className="overflow-hidden border-t"
          >
            <div className="grid grid-cols-3 divide-x p-4">
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">Present</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{attendanceData.present}</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">Absent</span>
                <span className="text-lg font-bold text-red-600 dark:text-red-400">{attendanceData.absent}</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">Streak</span>
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {attendanceData.streak} days
                </span>
              </div>
            </div>
            <div className="flex justify-center p-2 pb-4">
              <Button size="sm" variant="outline" onClick={handleNotifyParents}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Notify Parents
              </Button>
            </div>
          </motion.div>

          <Button
            variant="ghost"
            className="flex w-full items-center justify-center rounded-none border-t py-2 text-xs font-medium"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
