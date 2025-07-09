"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ComputerIcon as Microsoft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RoleSelectionModal } from "@/components/auth/role-selection-modal"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "next-auth/react"

export default function HomePage() {
  const [showRoleModal, setShowRoleModal] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(`/${user.role}`)
    }
  }, [isAuthenticated, user, router])

  const handleMicrosoftLogin = () => {
    signIn("azure-ad")
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="text-brand-black">Admind_</span>
            <span className="text-brand-orange">Briefly</span>
          </div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-header flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="text-2xl font-bold">
          <span className="text-brand-black">Admind_</span>
          <span className="text-brand-orange">Briefly</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Get started with Admind Briefly</h1>
              <p className="text-lg text-gray-600">Sign in with your Microsoft account to continue</p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleMicrosoftLogin}
                className="w-full bg-brand-black hover:bg-gray-800 text-white py-4 text-base font-medium"
                size="lg"
              >
                <Microsoft className="mr-3 h-5 w-5" />
                Continue with Microsoft
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-black text-white p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="mb-4 sm:mb-0">
            <p>Copyright © 2025 Admind. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 underline">
              Privacy policy
            </a>
            <a href="#" className="hover:text-gray-300 underline">
              Terms and conditions
            </a>
            <a href="#" className="hover:text-gray-300 underline flex items-center">
              Contact support →
            </a>
          </div>
        </div>
      </footer>

      {/* Role Selection Modal */}
      <RoleSelectionModal open={showRoleModal} onOpenChange={setShowRoleModal} />
    </div>
  )
}
