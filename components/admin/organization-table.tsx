"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"

interface Organization {
  id: string
  name: string
  logo: string
  aiSupport: boolean
  managersCount: number
  clientsCount: number
}

const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "ABB Corporation",
    logo: "/placeholder.svg?height=40&width=40",
    aiSupport: true,
    managersCount: 8,
    clientsCount: 24,
  },
  {
    id: "2",
    name: "Tech Solutions Inc",
    logo: "/placeholder.svg?height=40&width=40",
    aiSupport: false,
    managersCount: 5,
    clientsCount: 12,
  },
  {
    id: "3",
    name: "Creative Agency",
    logo: "/placeholder.svg?height=40&width=40",
    aiSupport: true,
    managersCount: 12,
    clientsCount: 36,
  },
]

interface OrganizationTableProps {
  searchQuery: string
}

export function OrganizationTable({ searchQuery }: OrganizationTableProps) {
  const [organizations, setOrganizations] = useState(mockOrganizations)

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleAISupport = (id: string) => {
    setOrganizations((orgs) => orgs.map((org) => (org.id === id ? { ...org, aiSupport: !org.aiSupport } : org)))
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>AI Support</TableHead>
            <TableHead>Managers</TableHead>
            <TableHead>Clients</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrganizations.map((org, index) => (
            <motion.tr
              key={org.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group hover:bg-gray-50"
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={org.logo || "/placeholder.svg"} />
                    <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{org.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Switch checked={org.aiSupport} onCheckedChange={() => toggleAISupport(org.id)} />
              </TableCell>
              <TableCell>{org.managersCount}</TableCell>
              <TableCell>{org.clientsCount}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
