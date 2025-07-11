"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Copy, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
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
import { useToast } from '@/hooks/use-toast'

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
  const { toast } = useToast();
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

  const filteredBriefs = Array.isArray(briefs) ? briefs.filter((brief) => {
    if (activeTab === "sent" && brief.status !== "Sent") return false
    if (activeTab === "drafts" && brief.status !== "Draft") return false
    if (activeTab === "shared" && brief.status !== "Shared") return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(brief.type)) return false
    return true
  }) : [];

  const [currentPage, setCurrentPage] = useState(1);
  const briefsPerPage = 10;
  const [totalBriefs, setTotalBriefs] = useState(0);
  const totalPages = Math.max(1, Math.ceil(totalBriefs / briefsPerPage));
  const paginatedBriefs = filteredBriefs; // Backend already paginates

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedTypes, activeTab]);

  useEffect(() => {
    fetchBriefs();
  }, [currentPage, sortBy, selectedTypes, activeTab]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const fetchBriefs = async () => {
    if (!user || !user.id) return;
    try {
      const res = await fetch(`/api/briefs?client_id=${user.id}&page=${currentPage}&limit=${briefsPerPage}`);
      if (!res.ok) {
        setBriefs([]);
        setTotalBriefs(0);
        return;
      }
      const data = await res.json();
      setBriefs(
        Array.isArray(data.data)
          ? data.data.map((brief: any) => ({
              id: brief.id,
              projectName: brief.project_name,
              type: (brief.project_type || "").replace(/_/g, "/"),
              status: brief.status, // Use real status from backend
              progress: brief.progress,
              date: brief.created_at,
              updated_at: brief.updated_at,
              sent_at: brief.sent_at,
              editable: brief.status === 'Draft', // Only drafts are editable
            }))
          : []
      );
      setTotalBriefs(data.total || 0);
    } catch {
      setBriefs([]);
      setTotalBriefs(0);
    }
  }

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
  const handleDuplicate = async (brief: any) => {
    const { id, date, status, progress, editable, updated_at, sent_at, ...rest } = brief;
    // Map all fields for payload
    const payload = {
      ...rest,
      status: "Draft",
      project_name: brief.projectName || brief.project_name || "",
      project_type: brief.type || brief.project_type || "",
      project_description: brief.projectDescription || brief.project_description || "",
      business_goals: brief.businessGoals || brief.business_goals || "",
      communication_goals: brief.communicationGoals || brief.communication_goals || "",
      project_kpi: brief.projectKPI || brief.project_kpi || "",
      challenge: brief.challenge || "",
      timeline_expectations: brief.timelineExpectations || brief.timeline_expectations || "",
      project_budget: brief.projectBudget || brief.project_budget || "",
      agency_scope: brief.agencyScope || brief.agency_scope || "",
      mandatories: brief.mandatories || "",
      technical_requirements: brief.technicalRequirements || brief.technical_requirements || "",
      target_audience: brief.targetAudience || brief.target_audience || "",
      internal_stakeholders: brief.internalStakeholders || brief.internal_stakeholders || "",
      consumer_insight: brief.consumerInsight || brief.consumer_insight || "",
      rtb_features: brief.rtbFeatures || brief.rtb_features || "",
      key_message: brief.keyMessage || brief.key_message || "",
      value_proposition: brief.valueProposition || brief.value_proposition || "",
      tone_of_voice: brief.toneOfVoice || brief.tone_of_voice || "",
      market_competition: brief.marketCompetition || brief.market_competition || "",
      inspirations: brief.inspirations || "",
      past_communication: brief.pastCommunication || brief.past_communication || "",
      touchpoints: brief.touchpoints || "",
      final_notes: brief.finalNotes || brief.final_notes || "",
      links: brief.links || [],
      attachments: brief.attachments || [],
    };
    // Remove id and timestamps
    delete payload.id;
    delete payload.date;
    delete payload.updated_at;
    delete payload.sent_at;
    // Add user/org IDs if available
    if (user?.id) payload.client_id = user.id;
    if (user?.organization) payload.organization_id = user.organization;
    try {
      const res = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-role': 'client' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast({ title: 'Draft duplicated.' });
        await fetchBriefs();
      } else {
        // Optionally show error toast
      }
    } catch {
      // Optionally show error toast
    }
  };

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

  // Fetch full brief data and open wizard for editing
  const handleContinueWriting = async (brief: any) => {
    setLoadingBrief(true);
    try {
      const briefId = Number(brief.id);
      const res = await fetch(`/api/briefs/${briefId}`);
      if (res.ok) {
        const data = await res.json();
        // Map server fields to wizard initialData format
        setEditBriefData({
          id: data.id,
          projectName: data.project_name || '',
          projectType: data.project_type || '',
          projectDescription: data.project_description || '',
          businessGoals: data.business_goals || '',
          communicationGoals: data.communication_goals || '',
          projectKPI: data.project_kpi || '',
          challenge: data.challenge || '',
          timelineExpectations: data.timeline_expectations || '',
          projectBudget: data.project_budget || '',
          agencyScope: data.agency_scope || '',
          mandatories: data.mandatories || '',
          technicalRequirements: data.technical_requirements || '',
          targetAudience: data.target_audience || '',
          internalStakeholders: data.internal_stakeholders || '',
          consumerInsight: data.consumer_insight || '',
          rtbFeatures: data.rtb_features || '',
          keyMessage: data.key_message || '',
          valueProposition: data.value_proposition || '',
          toneOfVoice: data.tone_of_voice || '',
          marketCompetition: data.market_competition || '',
          inspirations: data.inspirations || '',
          pastCommunication: data.past_communication || '',
          touchpoints: data.touchpoints || '',
          finalNotes: data.final_notes || '',
          links: data.links || [],
          attachments: data.attachments || [],
        });
        setShowEditWizard(true);
      } else {
        // fallback: show error toast or similar
      }
    } catch {
      // fallback: show error toast or similar
    }
    setLoadingBrief(false);
  };

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
                {paginatedBriefs.map((brief, index) => (
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
                                <Button variant="outline" size="sm" onClick={() => handleContinueWriting(brief)}>
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
