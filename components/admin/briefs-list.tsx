"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BadgeCheck, Download, Eye, MoreHorizontal, Share2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"

interface Brief {
  id: string
  projectName: string
  type: "General" | "Motion" | "Events" | "Web"
  status: "New" | "Shared" | "Draft"
  creator: {
    name: string
    avatar?: string
  }
  manager: {
    name: string
    avatar?: string
  }
  date: string
}

const mockBriefs: Brief[] = [
  {
    id: "1",
    projectName: "V2 – Hitachi Energy Landing Page",
    type: "General",
    status: "New",
    creator: {
      name: "Kung Fu Panda",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    manager: {
      name: "Natalia Haligowska-Rzepa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-21",
  },
  {
    id: "2",
    projectName: "ABB Robotics UX/UI Audit",
    type: "General",
    status: "New",
    creator: {
      name: "Max Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    manager: {
      name: "Martyna Florek",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-20",
  },
]

export function BriefsList() {
  const [briefs] = useState(mockBriefs)

  const getStatusPill = (status: Brief["status"]) => {
    switch (status) {
      case "New":
        return <Badge className="bg-green-100 text-green-800">New</Badge>
      case "Shared":
        return <Badge className="bg-blue-100 text-blue-800">Shared</Badge>
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/5">Project name and type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Brief creator</TableHead>
            <TableHead>Brief manager</TableHead>
            <TableHead>Date of inquiry</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {briefs.map((brief, index) => (
            <motion.tr
              key={brief.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group hover:bg-gray-50"
            >
              {/* Project name & type */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{brief.projectName}</span>
                  <span className="text-sm text-gray-500">{brief.type}</span>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>{getStatusPill(brief.status)}</TableCell>

              {/* Brief creator */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={brief.creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{brief.creator.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{brief.creator.name}</span>
                </div>
              </TableCell>

              {/* Brief manager */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={brief.manager.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{brief.manager.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{brief.manager.name}</span>
                </div>
              </TableCell>

              {/* Date */}
              <TableCell>{new Date(brief.date).toLocaleDateString("en-GB")}</TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      See summary
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BadgeCheck className="h-4 w-4 mr-2" />
                      Mark complete
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
