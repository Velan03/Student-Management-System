import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 md:gap-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-5xl md:text-6xl">
          <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            EduPulse
          </span>
        </h1>
        <p className="max-w-[42rem] text-center text-lg text-slate-700 dark:text-slate-300 sm:text-xl">
          A modern, interactive, and AI-powered Student Management System
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
