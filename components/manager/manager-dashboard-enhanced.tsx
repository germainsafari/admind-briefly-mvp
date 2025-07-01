"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Share2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShareBriefModal } from "./share-brief-modal"
import { DownloadBriefModal } from "./download-brief-modal"
import { BriefSummaryPanel } from "./brief-summary-panel"

interface Brief {
  id: string
  projectName: string
  type: "General" | "UX/UI Website" | "Event/Tradeshow" | "Video/Animation" | "Digital Paid Campaign"
  status: "New" | "Shared" | "Draft"
  creator: {
    name: string
    avatar: string
  }
  date: string
}

const mockBriefs: Brief[] = [
  {
    id: "1",
    projectName: "V2 - ABB Robotics website UX/UI Audit",
    type: "UX/UI Website",
    status: "New",
    creator: {
      name: "Max Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-28",
  },
  {
    id: "2",
    projectName: "V1- ABB Robotics website UX/UI Audit",
    type: "UX/UI Website",
    status: "Draft",
    creator: {
      name: "Max Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-22",
  },
  {
    id: "3",
    projectName: "ABB Internal Campaign",
    type: "General",
    status: "New",
    creator: {
      name: "Daniel Wellington",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-16",
  },
  {
    id: "4",
    projectName: "GLF 2025",
    type: "Event/Tradeshow",
    status: "New",
    creator: {
      name: "Sean Paul",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-10",
  },
  {
    id: "5",
    projectName: "Hitachi Energy Landing Page",
    type: "General",
    status: "New",
    creator: {
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-05-20",
  },
  {
    id: "6",
    projectName: "ABB Bauma WebApp",
    type: "General",
    status: "New",
    creator: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-04-02",
  },
]

const briefTypes = ["General", "UX/UI Website", "Event/Tradeshow", "Video/Animation", "Digital Paid Campaign"]

export function ManagerDashboardEnhanced() {
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [summaryPanelOpen, setSummaryPanelOpen] = useState(false)
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null)

  const briefCounts = {
    all: mockBriefs.length,
    new: mockBriefs.filter((b) => b.status === "New").length,
    created: mockBriefs.filter((b) => b.creator.name === "Martyna Florek").length,
  }

  const filteredBriefs = mockBriefs.filter((brief) => {
    if (activeTab === "new" && brief.status !== "New") return false
    if (activeTab === "created" && brief.creator.name !== "Martyna Florek") return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(brief.type)) return false
    return true
  })

  const getStatusBadge = (status: Brief["status"]) => {
    switch (status) {
      case "New":
        return <Badge className="bg-green-100 text-green-800 border-green-200">New</Badge>
      case "Shared":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Shared</Badge>
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>
      default:
        return null
    }
  }

  const handleShare = (brief: Brief) => {
    setSelectedBrief(brief)
    setShareModalOpen(true)
  }

  const handleDownload = (brief: Brief) => {
    setSelectedBrief(brief)
    setDownloadModalOpen(true)
  }

  const handleSummary = (brief: Brief) => {
    setSelectedBrief(brief)
    setSummaryPanelOpen(true)
  }

  const clearFilters = () => {
    setSelectedTypes([])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">Hello Martyna!</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Here, you're in charge of managing briefs — reviewing, organizing, and keeping everything on track. Stay on
          top of submissions, collaborate with your team, and ensure every brief gets the attention it deserves.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 space-y-6">
          {/* Sort Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Sort by:</Label>
            <RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="newest" />
                <Label htmlFor="newest" className="text-sm">
                  Newest first
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest" className="text-sm">
                  Oldest first
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Filter by Type */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Filter by type:</Label>
              {selectedTypes.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-auto p-1">
                  Clear all <X className="ml-1 h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {briefTypes.map((type) => (
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
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Briefs Section */}
          <div className="space-y-6">
            {/* Header with Tabs and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h2 className="text-2xl font-bold">Briefs</h2>
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "all"
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    All ({briefCounts.all})
                  </button>
                  <button
                    onClick={() => setActiveTab("new")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "new"
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    New ({briefCounts.new})
                  </button>
                  <button
                    onClick={() => setActiveTab("created")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "created"
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Created by you ({briefCounts.created})
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add new client
                </Button>
                <Button className="bg-brand-black hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create new brief
                </Button>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 px-4 py-2">
              <div className="col-span-4">Project name and type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Brief creator</div>
              <div className="col-span-2">Date of inquiry</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Briefs List */}
            <div className="space-y-2">
              {filteredBriefs.map((brief, index) => (
                <motion.div
                  key={brief.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Project Name & Type */}
                        <div className="col-span-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{brief.projectName}</div>
                            <div className="text-sm text-gray-500">{brief.type}</div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">{getStatusBadge(brief.status)}</div>

                        {/* Creator */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={brief.creator.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{brief.creator.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{brief.creator.name}</span>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="col-span-2">
                          <span className="text-sm">{new Date(brief.date).toLocaleDateString("en-GB")}</span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleShare(brief)} className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(brief)} className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSummary(brief)}>
                            See Summary
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" className="text-gray-500">
                ← Back
              </Button>
              <div className="flex space-x-2">
                {[1, 2, 3, "...", 8, 9].map((page, index) => (
                  <Button
                    key={index}
                    variant={page === 1 ? "default" : "ghost"}
                    size="sm"
                    className={page === 1 ? "bg-gray-900" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" className="text-gray-500">
                Next →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShareBriefModal open={shareModalOpen} onOpenChange={setShareModalOpen} brief={selectedBrief} />
      <DownloadBriefModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} brief={selectedBrief} />
      <BriefSummaryPanel open={summaryPanelOpen} onOpenChange={setSummaryPanelOpen} brief={selectedBrief} />
    </div>
  )
}
