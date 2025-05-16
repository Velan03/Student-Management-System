"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

type CelebrationType = "confetti" | "stars" | "fireworks" | "achievement"

interface CelebrationProps {
  type?: CelebrationType
  duration?: number
  particleCount?: number
  trigger?: boolean
  onComplete?: () => void
}

export function CelebrationEffect({
  type = "confetti",
  duration = 3000,
  particleCount = 100,
  trigger = false,
  onComplete,
}: CelebrationProps) {
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (trigger && !hasPlayed) {
      playCelebration()
      setHasPlayed(true)

      const timer = setTimeout(() => {
        onComplete?.()
      }, duration)

      return () => clearTimeout(timer)
    }

    if (!trigger) {
      setHasPlayed(false)
    }
  }, [trigger, hasPlayed, duration, onComplete])

  const playCelebration = () => {
    switch (type) {
      case "confetti":
        confetti({
          particleCount,
          spread: 70,
          origin: { y: 0.6 },
        })
        break
      case "stars":
        confetti({
          particleCount,
          spread: 70,
          shapes: ["star"],
          colors: ["#FFD700", "#FFC0CB", "#00FFFF"],
          origin: { y: 0.6 },
        })
        break
      case "fireworks":
        const end = Date.now() + duration

        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval)
            return
          }

          confetti({
            particleCount: 20,
            angle: Math.random() * 360,
            spread: 70,
            origin: {
              x: Math.random(),
              y: Math.random() - 0.2,
            },
          })
        }, 200)
        break
      case "achievement":
        confetti({
          particleCount,
          spread: 100,
          shapes: ["circle", "square"],
          colors: ["#FFD700", "#FFA500", "#FF4500"],
          origin: { y: 0.6 },
        })
        break
    }
  }

  return null
}
