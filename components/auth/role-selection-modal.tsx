"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Users, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface RoleSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const roles = [
  {
    id: "admin" as UserRole,
    title: "Admin",
    description: "Manage organizations, users, and system settings",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "manager" as UserRole,
    title: "Manager",
    description: "Create and manage briefs, oversee projects",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "client" as UserRole,
    title: "Client",
    description: "View briefs, provide feedback, and collaborate",
    icon: User,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

export function RoleSelectionModal({ open, onOpenChange }: RoleSelectionModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleContinue = async () => {
    if (!selectedRole) return

    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    login(selectedRole)
    onOpenChange(false)
    router.push(`/${selectedRole}`)

    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Select Your Role</DialogTitle>
          <p className="text-center text-gray-600 mt-2">Choose your role to access the appropriate dashboard</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {roles.map((role) => (
            <motion.div key={role.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`cursor-pointer transition-all ${
                  selectedRole === role.id ? "ring-2 ring-brand-orange border-brand-orange" : "hover:shadow-lg"
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full ${role.bgColor} flex items-center justify-center`}>
                    <role.icon className={`h-8 w-8 ${role.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{role.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{role.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            className="bg-brand-orange hover:bg-orange-600 px-8"
            size="lg"
          >
            {isLoading ? "Signing in..." : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
