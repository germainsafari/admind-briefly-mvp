"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Copy, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BriefBuilderWizard } from "./brief-builder-wizard"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface ClientBrief {
  id: string
  projectName: string
  type: "General" | "UX/UI Website" | "Event/Tradeshow" | "Video/Animation" | "Digital Paid Campaign"
  status: "Draft" | "Sent" | "Shared"
  progress?: number
  date: string
  editable: boolean
}

const briefTypes = ["General", "UX/UI Website", "Event/Tradeshow", "Video/Animation", "Digital Paid Campaign"]

export function ClientDashboardEnhanced() {
  const [briefs, setBriefs] = useState<ClientBrief[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showBriefBuilder, setShowBriefBuilder] = useState(false)
  const [hoveredBrief, setHoveredBrief] = useState<string | null>(null)
  const [formattedDate, setFormattedDate] = useState<string>("")

  useEffect(() => {
    fetch('/api/briefs')
      .then(async res => {
        if (!res.ok) {
          return [];
        }
        try {
          return await res.json();
        } catch {
          return [];
        }
      })
      .then((data) => {
        setBriefs(
          Array.isArray(data)
            ? data.map((brief) => ({
                id: brief.id,
                projectName: brief.project_name,
                type: (brief.project_type || "").replace(/_/g, "/"),
                status: brief.status === "New" ? "Draft" : brief.status, // Map as needed
                progress: brief.progress,
                date: brief.created_at,
                editable: true, // Set based on your logic
              }))
            : []
        );
      })
      .catch(() => setBriefs([]));
  }, []);

  const briefCounts = {
    all: briefs.length,
    sent: briefs.filter((b) => b.status === "Sent").length,
    drafts: briefs.filter((b) => b.status === "Draft").length,
    shared: briefs.filter((b) => b.status === "Shared").length,
  }

  const filteredBriefs = Array.isArray(briefs) ? briefs.filter((brief) => {
    if (activeTab === "sent" && brief.status !== "Sent") return false
    if (activeTab === "drafts" && brief.status !== "Draft") return false
    if (activeTab === "shared" && brief.status !== "Shared") return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(brief.type)) return false
    return true
  }) : [];

  const getStatusBadge = (status: ClientBrief["status"]) => {
    switch (status) {
      case "Draft":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Draft</Badge>
      case "Sent":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>
      case "Shared":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>
      default:
        return null
    }
  }

  const handleAction = (action: string, brief: ClientBrief) => {
    console.log(`${action} brief:`, brief.id)
    // Handle actions here
  }

  const clearFilters = () => {
    setSelectedTypes([])
  }

  useEffect(() => {
    if (briefs.length > 0) {
      const formattedDates = briefs.map(brief => {
        if (brief.date) {
          return new Date(brief.date).toLocaleDateString("en-GB")
        }
        return "-"
      })
      setFormattedDate(formattedDates.join(", "))
    }
  }, [briefs])

  if (showBriefBuilder) {
    return <BriefBuilderWizard onClose={() => setShowBriefBuilder(false)} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-5xl font-bold text-text">Hello Max!</h1>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-lg text-text-muted max-w-3xl">
          Fill out briefs quickly and intuitively. Share them with your team or download everything directly — all in
          one place.
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
                  Clear all
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
          {/* Your Briefs Section */}
          <div className="space-y-6">
            {/* Header with Tabs and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h2 className="text-2xl font-bold">Your Briefs</h2>
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
                    onClick={() => setActiveTab("sent")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "sent"
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Sent ({briefCounts.sent})
                  </button>
                  <button
                    onClick={() => setActiveTab("drafts")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "drafts"
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Drafts ({briefCounts.drafts})
                  </button>
                  <button
                    onClick={() => setActiveTab("shared")}
                    className={`pb-2 border-b-2 font-medium text-sm ${
                      activeTab === "shared"
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Shared with you ({briefCounts.shared})
                  </button>
                </div>
              </div>

              <Button onClick={() => setShowBriefBuilder(true)} className="btn-solid-dark hover:btn-solid-dark">
                <Plus className="icon-20 mr-4" />
                Create new brief
              </Button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 px-4 py-2">
              <div className="col-span-5">Project name and type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Date of inquiry</div>
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
                  onMouseEnter={() => setHoveredBrief(brief.id)}
                  onMouseLeave={() => setHoveredBrief(null)}
                  className="relative"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Project Name & Type */}
                        <div className="col-span-5">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{brief.projectName}</div>
                            <div className="text-sm text-gray-500">{brief.type}</div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(brief.status)}
                          </div>
                        </div>

                        {/* Date */}
                        <div className="col-span-3">
                          <span className="text-sm">
                            {brief.date ? new Date(brief.date).toLocaleDateString("en-GB") : "-"}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            See Summary
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Tooltips */}
                  {hoveredBrief === brief.id && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-1 z-10">
                      {brief.status === "Draft" && (
                        <>
                          <div className="bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                            <button
                              onClick={() => handleAction("delete", brief as ClientBrief)}
                              className="flex items-center space-x-1 hover:text-red-300"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete draft</span>
                            </button>
                          </div>
                          <div className="bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                            <button
                              onClick={() => handleAction("duplicate", brief as ClientBrief)}
                              className="flex items-center space-x-1"
                            >
                              <Copy className="h-3 w-3" />
                              <span>Duplicate</span>
                            </button>
                          </div>
                        </>
                      )}
                      {brief.status === "Sent" && (
                        <div className="bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                          <button onClick={() => handleAction("update", brief as ClientBrief)} className="flex items-center space-x-1">
                            <RotateCcw className="h-3 w-3" />
                            <span>Update</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
