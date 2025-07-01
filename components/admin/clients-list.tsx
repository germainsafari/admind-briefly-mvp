"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Client {
  id: string
  name: string
  title: string
  avatar?: string
  organization: string
  status: "active" | "invited" | "deactivated"
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Beyonce Knowles",
    title: "Singer and Sonwriter",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Hitachi",
    status: "invited",
  },
  {
    id: "2",
    name: "Max Johnson",
    title: "Senior Lorem Ipsum Position",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "ABB",
    status: "active",
  },
  {
    id: "3",
    name: "Daniel Wellington",
    title: "Junior Watch Manufacturer",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "ABB",
    status: "active",
  },
  {
    id: "4",
    name: "Sean Paul",
    title: "Singer & Songwriter",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "ABB",
    status: "active",
  },
  {
    id: "5",
    name: "Kun Fu Panda",
    title: "Fighter",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Hitachi",
    status: "deactivated",
  },
  {
    id: "6",
    name: "Lara Croft",
    title: "Senior Archaeologist",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "UBS",
    status: "active",
  },
]

export function ClientsList() {
  const [clients] = useState(mockClients)

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "invited":
        return <Badge className="bg-pink-100 text-pink-800">Invited</Badge>
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

      {/* Clients */}
      <div className="space-y-3">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* Client Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.title}</div>
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <span className="text-sm">{client.organization}</span>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center justify-between">
                    {getStatusBadge(client.status)}
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
