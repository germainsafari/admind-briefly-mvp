"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="gradient-header">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-brand-black">Admind_</span>
              <span className="text-brand-orange">Briefly</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Input placeholder="Search" className="w-80 bg-white/80 border-white/20 placeholder:text-gray-500" />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-sm">
                        <p className="font-medium">New brief submitted</p>
                        <p className="text-gray-500">Max Johnson created a new brief</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback>{user?.name?.substring(0, 2) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">{user?.name || "User"}</div>
                    <div className="text-xs text-gray-500">{user?.organization || "Organization"}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Onboarding</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logout()
                    window.location.href = "/"
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
