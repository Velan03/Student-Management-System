"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Calendar, FileText, Plus, Settings, Users } from "lucide-react"

export function AdminQuickActions() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: `${action} action initiated`,
      description: `You've started the ${action.toLowerCase()} process`,
      variant: "default",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used administrative functions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              variant="outline"
              className="h-24 w-full flex-col gap-2 border-dashed"
              onClick={() => handleAction("Create Class")}
            >
              <Plus className="h-5 w-5" />
              <span>Create Class</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              variant="outline"
              className="h-24 w-full flex-col gap-2"
              onClick={() => handleAction("Add Student")}
            >
              <Users className="h-5 w-5" />
              <span>Add Student</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              variant="outline"
              className="h-24 w-full flex-col gap-2"
              onClick={() => handleAction("Send Broadcast")}
            >
              <Bell className="h-5 w-5" />
              <span>Send Broadcast</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              variant="outline"
              className="h-24 w-full flex-col gap-2"
              onClick={() => handleAction("View Reports")}
            >
              <FileText className="h-5 w-5" />
              <span>View Reports</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              variant="outline"
              className="h-24 w-full flex-col gap-2"
              onClick={() => handleAction("Schedule Event")}
            >
              <Calendar className="h-5 w-5" />
              <span>Schedule Event</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              variant="outline"
              className="h-24 w-full flex-col gap-2"
              onClick={() => handleAction("System Settings")}
            >
              <Settings className="h-5 w-5" />
              <span>System Settings</span>
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
