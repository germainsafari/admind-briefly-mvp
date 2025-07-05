"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "manager" | "client"

interface User {
  id: number
  name: string
  email: string
  avatar?: string
  organization: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (role: UserRole) => void
  logout: () => void
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("admind_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (role: UserRole) => {
    // Simulate Microsoft login with role-based user data
    const mockUsers = {
      admin: {
        id: 1,
        name: "Natalia Haligowska-Rzepa",
        email: "natalia@admind.com",
        avatar: "/placeholder.svg?height=32&width=32",
        organization: "Admind Agency",
        role: "admin" as UserRole,
      },
      manager: {
        id: 3,
        name: "Max Johnson",
        email: "max@abb.com",
        avatar: "/placeholder.svg?height=32&width=32",
        organization: "ABB Corporation",
        role: "manager" as UserRole,
      },
      client: {
        id: 2,
        name: "Joanna Trela",
        email: "joanna.trela@admind.com",
        avatar: "/placeholder.svg?height=32&width=32",
        organization: "Client Corp",
        role: "client" as UserRole,
      },
    }

    const userData = mockUsers[role]
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("admind_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("admind_user")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setUser }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
