"use client"

import type React from "react"
import { Header } from "./header"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // Don't show header/nav on login page
  if (pathname === "/" || !isAuthenticated) {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  return (
    <div className="min-h-screen gradient-admin-bg">
      <Header />
      {/* Remove Navigation component entirely - no role tabs */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      </main>
    </div>
  )
}
