import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-amber-100 p-3">
              <WifiOff className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-center text-xl">You're Offline</CardTitle>
          <CardDescription className="text-center">
            Don't worry, you can still access your downloaded content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            EduPWA works offline, so you can continue learning without an internet connection. Your progress will sync
            when you're back online.
          </p>
          <div className="flex justify-center">
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
