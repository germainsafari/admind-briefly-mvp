"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react";

interface NavigationProps {
  activeRole: "admin" | "manager" | "client"
  onRoleChange: (role: "admin" | "manager" | "client") => void
}

export function Navigation({ activeRole, onRoleChange }: NavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession();

  // If user is admin, only show admin interface
  if (session?.user?.role === "admin") {
    return null // No navigation tabs for admin
  }

  const tabs = [
    { id: "admin", label: "Admin", path: "/admin" },
    { id: "manager", label: "Manager", path: "/manager" },
    { id: "client", label: "Client", path: "/client" },
  ] as const

  // Filter tabs based on user role
  const visibleTabs = tabs.filter((tab) => {
    if (session?.user?.role === "manager") return tab.id === "manager"
    if (session?.user?.role === "client") return tab.id === "client"
    return true
  })

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-8">
          {visibleTabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "px-4 py-6 text-sm font-medium border-b-2 border-transparent rounded-none",
                pathname.startsWith(tab.path)
                  ? "border-brand-orange text-brand-orange"
                  : "text-gray-500 hover:text-gray-700",
              )}
              onClick={() => handleRoleChange(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}
