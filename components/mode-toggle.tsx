"use client"

import { Moon, Sun, Palette, BookOpen, Zap, Droplet, Layers } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case "study":
        return <BookOpen className="h-[1.2rem] w-[1.2rem]" />
      case "neon":
        return <Zap className="h-[1.2rem] w-[1.2rem]" />
      case "pastel":
        return <Droplet className="h-[1.2rem] w-[1.2rem]" />
      case "gradient":
        return <Layers className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Palette className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("study")}>
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Study Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("neon")}>
          <Zap className="mr-2 h-4 w-4" />
          <span>Neon</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("pastel")}>
          <Droplet className="mr-2 h-4 w-4" />
          <span>Pastel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("gradient")}>
          <Layers className="mr-2 h-4 w-4" />
          <span>Gradient</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Palette className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
