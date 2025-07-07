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
import { BriefDetailModal } from "./brief-detail-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth-context"

interface ClientBrief {
  id: string
  projectName: string
  type: "General" | "UX/UI Website" | "Event/Tradeshow" | "Video/Animation" | "Digital Paid Campaign"
  status: "Draft" | "Sent" | "Shared"
  progress?: number
  date: string
  updated_at?: string
  sent_at?: string
  editable: boolean
}

const briefTypes = ["General", "UX/UI Website", "Event/Tradeshow", "Video/Animation", "Digital Paid Campaign"]

export function ClientDashboardEnhanced() {
  const { user } = useAuth();
  const [briefs, setBriefs] = useState<ClientBrief[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showBriefBuilder, setShowBriefBuilder] = useState(false)
  const [hoveredBrief, setHoveredBrief] = useState<string | null>(null)
  const [formattedDate, setFormattedDate] = useState<string>("")
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedBrief, setSelectedBrief] = useState<any | null>(null)
  const [loadingBrief, setLoadingBrief] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const [editBriefData, setEditBriefData] = useState<any | null>(null)
  const [showEditWizard, setShowEditWizard] = useState(false)

  const fetchBriefs = async () => {
    try {
      const res = await fetch('/api/briefs')
      if (!res.ok) {
        setBriefs([])
        return
      }
      const data = await res.json()
      setBriefs(
        Array.isArray(data)
          ? data.map((brief) => ({
              id: brief.id,
              projectName: brief.project_name,
              type: (brief.project_type || "").replace(/_/g, "/"),
              status: brief.status === "New" ? "Draft" : brief.status, // Map as needed
              progress: brief.progress,
              date: brief.created_at,
              updated_at: brief.updated_at,
              sent_at: brief.sent_at,
              editable: true, // Set based on your logic
            }))
          : []
      )
    } catch {
      setBriefs([])
    }
  }

  useEffect(() => {
    fetchBriefs()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && briefs.length > 0) {
      const formattedDates = briefs.map(brief => {
        if (brief.date) {
          return new Date(brief.date).toLocaleDateString("en-GB")
        }
        return "-"
      })
      setFormattedDate(formattedDates.join(", "))
    }
  }, [briefs])

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

  const handleAction = async (action: string, brief: ClientBrief) => {
    if (action === "delete") {
      try {
        await fetch('/api/briefs', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: typeof brief.id === 'string' ? parseInt(brief.id, 10) : brief.id })
        })
        await fetchBriefs()
      } catch {
        // Optionally show error
      }
    } else {
      console.log(`${action} brief:`, brief.id)
    }
  }

  const clearFilters = () => {
    setSelectedTypes([])
  }

  const handleSeeSummary = async (brief: ClientBrief) => {
    setLoadingBrief(true)
    setDetailModalOpen(true)
    setModalError(null)
    try {
      const briefId = Number(brief.id)
      const res = await fetch(`/api/briefs/${briefId}`)
      if (res.ok) {
        const data = await res.json()
        setSelectedBrief(data)
      } else if (res.status === 404) {
        setModalError("This brief no longer exists.")
        setSelectedBrief(null)
      } else {
        setModalError("Failed to load brief details.")
        setSelectedBrief(null)
      }
    } catch {
      setModalError("Failed to load brief details.")
      setSelectedBrief(null)
    }
    setLoadingBrief(false)
  }

  // Duplicate a brief (creates a new draft with the same data, but no id or date)
  const handleDuplicate = (brief: any) => {
    const {
      id, date, status, progress, editable, ...rest
    } = brief;
    setEditBriefData({
      ...rest,
      status: "Draft",
      // Map all fields for initialData
      projectName: brief.projectName || brief.project_name || "",
      projectType: brief.type || brief.project_type || "",
      projectDescription: brief.projectDescription || brief.project_description || "",
      businessGoals: brief.businessGoals || brief.business_goals || "",
      communicationGoals: brief.communicationGoals || brief.communication_goals || "",
      projectKPI: brief.projectKPI || brief.project_kpi || "",
      challenge: brief.challenge || "",
      timelineExpectations: brief.timelineExpectations || brief.timeline_expectations || "",
      projectBudget: brief.projectBudget || brief.project_budget || "",
      agencyScope: brief.agencyScope || brief.agency_scope || "",
      mandatories: brief.mandatories || "",
      technicalRequirements: brief.technicalRequirements || brief.technical_requirements || "",
      targetAudience: brief.targetAudience || brief.target_audience || "",
      internalStakeholders: brief.internalStakeholders || brief.internal_stakeholders || "",
      consumerInsight: brief.consumerInsight || brief.consumer_insight || "",
      rtbFeatures: brief.rtbFeatures || brief.rtb_features || "",
      keyMessage: brief.keyMessage || brief.key_message || "",
      valueProposition: brief.valueProposition || brief.value_proposition || "",
      toneOfVoice: brief.toneOfVoice || brief.tone_of_voice || "",
      marketCompetition: brief.marketCompetition || brief.market_competition || "",
      inspirations: brief.inspirations || "",
      pastCommunication: brief.pastCommunication || brief.past_communication || "",
      touchpoints: brief.touchpoints || "",
      finalNotes: brief.finalNotes || brief.final_notes || "",
      links: brief.links || [],
      attachments: brief.attachments || [],
    })
    setShowEditWizard(true)
  }

  // Update/Edit a sent brief
  const handleUpdate = (brief: any) => {
    setEditBriefData({
      ...brief,
      projectName: brief.projectName,
      projectType: brief.type,
      // Map all other fields as needed
    })
    setShowEditWizard(true)
  }

  if (!user || user.role !== "client") {
    return (
      <div className="p-8 text-red-600 font-bold text-xl">Access denied. Only clients can access this dashboard.</div>
    );
  }

  if (showBriefBuilder) {
    return <BriefBuilderWizard onClose={() => setShowBriefBuilder(false)} />
  }

  if (showEditWizard && editBriefData) {
    return <BriefBuilderWizard onClose={() => { setShowEditWizard(false); setEditBriefData(null); fetchBriefs(); }} initialData={editBriefData} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-5xl font-bold text-text">Hello {user.name.split(" ")[0]}!</h1>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg?height=40&width=40"} />
            <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
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
              <TooltipProvider>
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

                          {/* Status (with progress for drafts) */}
                          <div className="col-span-2">
                            {brief.status === "Draft" ? (
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Draft</Badge>
                                  {typeof brief.progress === 'number' && (
                                    <span className="text-xs text-gray-500 font-medium">{brief.progress}%</span>
                                  )}
                                </div>
                                {typeof brief.progress === 'number' && (
                                  <Progress value={brief.progress} className="h-2 bg-blue-100" />
                                )}
                              </div>
                            ) : (
                              <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>
                            )}
                          </div>

                          {/* Date of inquiry */}
                          <div className="col-span-3">
                            <span className="text-sm">
                              {brief.status === "Draft"
                                ? (brief.updated_at ? new Date(brief.updated_at).toLocaleDateString("en-GB") : (brief.date ? new Date(brief.date).toLocaleDateString("en-GB") : "-"))
                                : (brief.sent_at ? new Date(brief.sent_at).toLocaleDateString("en-GB") : (brief.date ? new Date(brief.date).toLocaleDateString("en-GB") : "-"))}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="col-span-2 flex justify-end space-x-2">
                            {/* Draft actions */}
                            {brief.status === "Draft" && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleAction("delete", brief)}>
                                      <Trash2 className="h-5 w-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete draft</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleDuplicate(brief)}>
                                      <Copy className="h-5 w-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Duplicate</TooltipContent>
                                </Tooltip>
                                <Button variant="outline" size="sm" onClick={() => { setEditBriefData(brief); setShowEditWizard(true); }}>
                                  Continue writing
                                </Button>
                              </>
                            )}
                            {/* Sent actions */}
                            {brief.status === "Sent" && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleDuplicate(brief)}>
                                      <Copy className="h-5 w-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Duplicate</TooltipContent>
                                </Tooltip>
                                <Button variant="outline" size="sm" onClick={() => handleSeeSummary(brief)}>
                                  See Summary
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
      {/* Brief Detail Modal */}
      <BriefDetailModal
        open={detailModalOpen}
        onOpenChange={(open) => {
          setDetailModalOpen(open)
          setModalError(null)
          if (!open) setSelectedBrief(null)
        }}
        brief={selectedBrief ? {
          projectName: selectedBrief.project_name || selectedBrief.projectName || "",
          projectType: selectedBrief.project_type || selectedBrief.projectType || "",
          projectDescription: selectedBrief.project_description || selectedBrief.projectDescription || "",
          businessGoals: selectedBrief.business_goals || selectedBrief.businessGoals || "",
          communicationGoals: selectedBrief.communication_goals || selectedBrief.communicationGoals || "",
          projectKPI: selectedBrief.project_kpi || selectedBrief.projectKPI || "",
          challenge: selectedBrief.challenge || "",
          timelineExpectations: selectedBrief.timeline_expectations || selectedBrief.timelineExpectations || "",
          projectBudget: selectedBrief.project_budget || selectedBrief.projectBudget || "",
          agencyScope: selectedBrief.agency_scope || selectedBrief.agencyScope || "",
          mandatories: selectedBrief.mandatories || "",
          technicalRequirements: selectedBrief.technical_requirements || selectedBrief.technicalRequirements || "",
          targetAudience: selectedBrief.target_audience || selectedBrief.targetAudience || "",
          internalStakeholders: selectedBrief.internal_stakeholders || selectedBrief.internalStakeholders || "",
          consumerInsight: selectedBrief.consumer_insight || selectedBrief.consumerInsight || "",
          rtbFeatures: selectedBrief.rtb_features || selectedBrief.rtbFeatures || "",
          keyMessage: selectedBrief.key_message || selectedBrief.keyMessage || "",
          valueProposition: selectedBrief.value_proposition || selectedBrief.valueProposition || "",
          toneOfVoice: selectedBrief.tone_of_voice || selectedBrief.toneOfVoice || "",
          marketCompetition: selectedBrief.market_competition || selectedBrief.marketCompetition || "",
          inspirations: selectedBrief.inspirations || "",
          pastCommunication: selectedBrief.past_communication || selectedBrief.pastCommunication || "",
          touchpoints: selectedBrief.touchpoints || "",
          finalNotes: selectedBrief.final_notes || selectedBrief.finalNotes || "",
          links: selectedBrief.links || [],
          attachments: selectedBrief.attachments || [],
        } : loadingBrief ? { projectName: 'Loading...', projectType: '', projectDescription: '' } : {}}
        error={modalError}
      />
    </div>
  )
}
