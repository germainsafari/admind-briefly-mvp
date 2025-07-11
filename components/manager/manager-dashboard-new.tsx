"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, Share2, Plus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ShareBriefModal } from "./share-brief-modal"
import { DownloadBriefModal } from "./download-brief-modal"
import { BriefSummaryPanel } from "./brief-summary-panel"
import { AddClientModal } from "./add-client-modal"
import { ClientsList } from "@/components/admin/clients-list"
import { useAuth } from "@/lib/auth-context"

interface Brief {
  id: string
  projectName: string
  type: "General" | "UX/UI Website" | "Event/Tradeshow" | "Video/Animation" | "Digital Paid Campaign"
  status: "New" | "Shared" | "Draft" | "Sent"
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

export function ManagerDashboardNew() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [summaryPanelOpen, setSummaryPanelOpen] = useState(false)
  const [addClientModalOpen, setAddClientModalOpen] = useState(false)
  const [selectedBrief, setSelectedBrief] = useState<any | null>(null)
  const [briefs, setBriefs] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch('/api/briefs').then(res => res.json()),
      fetch('/api/clients').then(res => res.json()),
    ]).then(([briefsData, clientsData]) => {
      setBriefs(briefsData.data)
      setClients(clientsData)
      setLoading(false)
    })
  }, [])

  // Filtering
  const filteredBriefs = briefs.filter((brief: any) => {
    if (activeTab === "new" && brief.status !== "New") return false;
    // Support both 'type' and 'project_type' fields
    const briefType = brief.type || brief.project_type;
    if (selectedTypes.length > 0 && !selectedTypes.includes(briefType)) return false;
    return true;
  });

  // Sorting
  const sortedBriefs = [...filteredBriefs].sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt || 0).getTime();
    const dateB = new Date(b.date || b.createdAt || 0).getTime();
    if (sortBy === "newest") return dateB - dateA;
    if (sortBy === "oldest") return dateA - dateB;
    return 0;
  });

  const briefsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(sortedBriefs.length / briefsPerPage));
  const paginatedBriefs = sortedBriefs.slice((currentPage - 1) * briefsPerPage, currentPage * briefsPerPage);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedTypes, activeTab]);

  const briefCounts = {
    all: briefs.length,
    new: briefs.filter((b: any) => b.status === "New").length,
  }

  const getStatusBadge = (status: Brief["status"], date?: string) => {
    if (status === "New" && date) {
      const created = new Date(date);
      const now = new Date();
      const daysDiff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff > 3) {
        return <Badge className="bg-yellow-100 text-yellow-800 border-0 font-medium text-xs px-2 py-1">Stale</Badge>;
      }
    }
    switch (status) {
      case "New":
        return <Badge className="status-new border-0 font-medium text-xs px-2 py-1">New</Badge>
      case "Draft":
        return <Badge className="status-draft border-0 font-medium text-xs px-2 py-1">Draft</Badge>
      case "Shared":
        return <Badge className="bg-blue-100 text-blue-800 border-0 font-medium text-xs px-2 py-1">Shared</Badge>
      case "Sent":
        return <Badge className="bg-green-100 text-green-800 border-0 font-medium text-xs px-2 py-1">Sent</Badge>
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      {/* Header with Avatar */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-5xl font-bold text-text">Hello {user?.name?.split(" ")[0] || "Manager"}!</h1>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} />
            <AvatarFallback>{user?.name?.split(" ").map(n => n[0]).join("") || "M"}</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-lg text-text-muted max-w-3xl">
          Here, you're in charge of managing briefs — reviewing, organizing, and keeping everything on track. Stay on
          top of submissions, collaborate with your team, and ensure every brief gets the attention it deserves.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 space-y-6">
          {/* Sort Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-text">Sort by:</Label>
            <RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="newest" />
                <Label htmlFor="newest" className="text-sm text-text">
                  Newest first
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest" className="text-sm text-text">
                  Oldest first
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Filter by Type */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-text">Filter by type:</Label>
              {selectedTypes.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-auto p-1 text-text-muted">
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
                  <Label htmlFor={type} className="text-sm text-text">
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
                <h2 className="text-2xl font-bold text-text">Briefs</h2>
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "all"
                        ? "border-text text-text"
                        : "border-transparent text-text-muted hover:text-text"
                    }`}
                  >
                    All ({briefCounts.all})
                  </button>
                  <button
                    onClick={() => setActiveTab("new")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "new"
                        ? "border-text text-text"
                        : "border-transparent text-text-muted hover:text-text"
                    }`}
                  >
                    New ({briefCounts.new})
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setAddClientModalOpen(true)}
                  className="btn-outline-dark hover:btn-outline-dark border border-button-black"
                >
                  <Plus className="icon-20 mr-4" />
                  Add new client
                </Button>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-text-muted px-6 py-4">
              <div className="col-span-4">Project name and type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Brief creator</div>
              <div className="col-span-2">Date of inquiry</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Briefs List */}
            <Card className="card-bg shadow-card border-0">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {loading ? (
                    <div className="text-center py-8 text-text-muted">Loading...</div>
                  ) : paginatedBriefs.length === 0 ? (
                    <div className="text-center py-8 text-text-muted">No briefs found.</div>
                  ) : (
                    paginatedBriefs.map((brief, index) => (
                      <motion.div
                        key={brief.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "row-hover transition-colors duration-150",
                          index !== paginatedBriefs.length - 1 && "border-b border-gray-100",
                        )}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center p-6">
                          {/* Project Name & Type */}
                          <div className="col-span-4">
                            <div className="space-y-1">
                              <div className="font-medium text-text">{brief.projectName || brief.project_name || "Untitled Project"}</div>
                              <div className="text-sm text-text-muted">{brief.type || "-"}</div>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="col-span-2">{getStatusBadge(brief.status, brief.date)}</div>

                          {/* Creator */}
                          <div className="col-span-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={brief.creator?.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{brief.creator?.name?.substring(0, 2) || "M"}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-text">{brief.creator?.name || "Max"}</span>
                            </div>
                          </div>

                          {/* Date */}
                          <div className="col-span-2">
                            <span className="text-sm text-text">{brief.date ? new Date(brief.date).toLocaleDateString("en-GB") : "-"}</span>
                          </div>

                          {/* Actions */}
                          <div className="col-span-2 flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleShare(brief)} className="h-8 w-8">
                              <Share2 className="icon-20" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDownload(brief)} className="h-8 w-8">
                              <Download className="icon-20" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleSummary(brief)}>
                              See Summary
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-center pt-4">
              <Button
                variant="ghost"
                className="text-text-muted flex items-center"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="icon-20 mr-4" />
                Previous
              </Button>
              <div className="flex space-x-2 mx-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "ghost"}
                    size="sm"
                    className={page === currentPage ? "btn-solid-dark" : "text-text-muted"}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                className="text-text-muted flex items-center"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="icon-20 ml-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShareBriefModal open={shareModalOpen} onOpenChange={setShareModalOpen} brief={selectedBrief} />
      <DownloadBriefModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} brief={selectedBrief} />
      <BriefSummaryPanel open={summaryPanelOpen} onOpenChange={setSummaryPanelOpen} brief={selectedBrief} />
      <AddClientModal open={addClientModalOpen} onOpenChange={setAddClientModalOpen} />
    </div>
  )
}
