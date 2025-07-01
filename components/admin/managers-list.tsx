"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Manager {
  id: string
  name: string
  title: string
  avatar?: string
  organization: string
  status: "active" | "invited" | "deactivated"
}

const mockManagers: Manager[] = [
  {
    id: "1",
    name: "Dawid Janas",
    title: "Project manager",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Admind Agency",
    status: "active",
  },
  {
    id: "2",
    name: "Natalia Haligowska-Rzepa",
    title: "Account Director",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Admind Agency",
    status: "active",
  },
  {
    id: "3",
    name: "Martyna Florej",
    title: "Senior Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Admind Agency",
    status: "active",
  },
  {
    id: "4",
    name: "Jane Doe",
    title: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Admind Agency",
    status: "deactivated",
  },
]

export function ManagersList() {
  const [managers] = useState(mockManagers)

  const getStatusBadge = (status: Manager["status"]) => {
    switch (status) {
      case "invited":
        return <Badge className="bg-blue-100 text-blue-800">Invited</Badge>
      case "deactivated":
        return <Badge variant="secondary">Deactivated</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 px-4">
        <div>Manager name</div>
        <div>Organization</div>
        <div>Status</div>
      </div>

      {/* Managers */}
      <div className="space-y-3">
        {managers.map((manager, index) => (
          <motion.div
            key={manager.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* Manager Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={manager.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{manager.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{manager.name}</div>
                      <div className="text-sm text-gray-500">{manager.title}</div>
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <span className="text-sm">{manager.organization}</span>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center justify-between">
                    {getStatusBadge(manager.status)}
                    <Button variant="outline" size="sm">
                      See profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
