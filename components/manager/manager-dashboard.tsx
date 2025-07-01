"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Brief {
  id: string
  projectName: string
  type: "General" | "Motion" | "Events" | "Web"
  status: "New" | "Shared" | "Draft"
  creator: {
    name: string
    avatar: string
    organization: string
  }
  date: string
}

const mockBriefs: Brief[] = [
  {
    id: "1",
    projectName: "Brand Campaign 2024",
    type: "General",
    status: "New",
    creator: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      organization: "ABB Corp",
    },
    date: "2024-01-15",
  },
  {
    id: "2",
    projectName: "Product Launch Video",
    type: "Motion",
    status: "Shared",
    creator: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      organization: "Tech Solutions",
    },
    date: "2024-01-14",
  },
  {
    id: "3",
    projectName: "Conference Website",
    type: "Web",
    status: "Draft",
    creator: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      organization: "Creative Agency",
    },
    date: "2024-01-13",
  },
]

export function ManagerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date")

  const briefCounts = {
    all: mockBriefs.length,
    new: mockBriefs.filter((b) => b.status === "New").length,
    drafts: mockBriefs.filter((b) => b.status === "Draft").length,
    shared: mockBriefs.filter((b) => b.status === "Shared").length,
  }

  const getStatusColor = (status: Brief["status"]) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Shared":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-gray-900">Hello Manager!</h1>
        <Button className="bg-brand-orange hover:bg-orange-600">Create New Brief</Button>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <div className="w-64 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <Label className="text-sm font-medium">Search</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search briefs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <Label className="text-sm font-medium">Type</Label>
                <div className="space-y-2 mt-2">
                  {["General", "Motion", "Events", "Web"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTypes([...selectedTypes, type])
                          } else {
                            setSelectedTypes(selectedTypes.filter((t) => t !== type))
                          }
                        }}
                      />
                      <Label htmlFor={type} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <Label className="text-sm font-medium">Sort by</Label>
                <RadioGroup value={sortBy} onValueChange={setSortBy} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="date" id="date" />
                    <Label htmlFor="date" className="text-sm">
                      Date
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name" id="name" />
                    <Label htmlFor="name" className="text-sm">
                      Name
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="status" id="status" />
                    <Label htmlFor="status" className="text-sm">
                      Status
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({briefCounts.all})</TabsTrigger>
              <TabsTrigger value="new">New ({briefCounts.new})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({briefCounts.drafts})</TabsTrigger>
              <TabsTrigger value="shared">Shared with you ({briefCounts.shared})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {mockBriefs.map((brief, index) => (
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
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            See summary
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Other tab contents would be similar but filtered */}
            <TabsContent value="new">{/* Filtered content for new briefs */}</TabsContent>
            <TabsContent value="drafts">{/* Filtered content for draft briefs */}</TabsContent>
            <TabsContent value="shared">{/* Filtered content for shared briefs */}</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
