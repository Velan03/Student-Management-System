import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 md:gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="inline-block text-gradient">EduPulse AI</span>
          </h1>
          <p className="mt-2 animate-pulse-slow text-center text-lg text-slate-700 dark:text-slate-300 sm:text-xl">
            Next-Gen Learning for Gen-Alpha
          </p>
        </div>
        <div className="max-w-[42rem] text-center text-slate-700 dark:text-slate-300">
          <p className="text-lg sm:text-xl">A modern, interactive, and AI-powered Student Management System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
