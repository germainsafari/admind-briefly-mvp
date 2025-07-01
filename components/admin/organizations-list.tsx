"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Organization {
  id: string
  name: string
  logo?: string
  clientsCount: number
  members: Array<{
    id: string
    name: string
    avatar?: string
  }>
}

const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Hitachi",
    logo: "/placeholder.svg?height=40&width=40",
    clientsCount: 1,
    members: [
      {
        id: "1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
]

export function OrganizationsList() {
  const [organizations] = useState(mockOrganizations)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 px-4">
        <div>Organization name</div>
        <div>Clients amount</div>
        <div>Add member</div>
        <div></div>
      </div>

      {/* Organizations */}
      <div className="space-y-3">
        {organizations.map((org, index) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4 items-center">
                  {/* Organization Name */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={org.logo || "/placeholder.svg"} />
                      <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{org.name}</span>
                  </div>

                  {/* Clients Count */}
                  <div className="flex items-center space-x-2">
                    <span>
                      {org.clientsCount} client{org.clientsCount !== 1 ? "s" : ""}
                    </span>
                    {org.members.map((member) => (
                      <Avatar key={member.id} className="h-6 w-6">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  {/* Add Member */}
                  <div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                      See organization
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
