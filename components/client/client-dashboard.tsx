"use client"
import { motion } from "framer-motion"
import { Download, MessageCircle, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ClientBrief {
  id: string
  projectName: string
  type: "General" | "Motion" | "Events" | "Web"
  status: "New" | "In Review" | "Approved" | "Completed"
  creator: {
    name: string
    avatar: string
    organization: string
  }
  date: string
  editable: boolean
}

const mockClientBriefs: ClientBrief[] = [
  {
    id: "1",
    projectName: "Q1 Marketing Campaign",
    type: "General",
    status: "New",
    creator: {
      name: "John Manager",
      avatar: "/placeholder.svg?height=32&width=32",
      organization: "ABB Corp",
    },
    date: "2024-01-15",
    editable: true,
  },
  {
    id: "2",
    projectName: "Product Demo Video",
    type: "Motion",
    status: "In Review",
    creator: {
      name: "Sarah Director",
      avatar: "/placeholder.svg?height=32&width=32",
      organization: "ABB Corp",
    },
    date: "2024-01-14",
    editable: false,
  },
]

export function ClientDashboard() {
  const getStatusColor = (status: ClientBrief["status"]) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "In Review":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-gray-900">Hello Client!</h1>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="created">Created by you</TabsTrigger>
          <TabsTrigger value="shared">Shared with you</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {mockClientBriefs.map((brief, index) => (
            <motion.div
              key={brief.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{brief.projectName}</h3>
                        <Badge variant="secondary">{brief.type}</Badge>
                        <Badge className={getStatusColor(brief.status)}>{brief.status}</Badge>
                        {brief.editable && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Editable
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={brief.creator.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{brief.creator.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span>{brief.creator.name}</span>
                          <span>•</span>
                          <span>{brief.creator.organization}</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(brief.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="Download PDF">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Comments">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      {brief.editable && (
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        {/* Other tab contents would be similar but filtered */}
        <TabsContent value="new">
          <div className="text-center py-12 text-gray-500">No new briefs at the moment.</div>
        </TabsContent>
        <TabsContent value="created">
          <div className="text-center py-12 text-gray-500">You haven't created any briefs yet.</div>
        </TabsContent>
        <TabsContent value="shared">
          <div className="text-center py-12 text-gray-500">No briefs shared with you.</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
