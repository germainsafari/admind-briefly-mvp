"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BadgeCheck, Download, Eye, MoreHorizontal, Share2, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { BriefDetailModal } from "../client/brief-detail-modal"
import { useToast } from "@/hooks/use-toast"

interface Brief {
  id: string | number
  project_name: string
  project_type?: string
  status?: string | null
  creator?: { id: string | number; name: string; avatar?: string; email?: string } | null
  manager?: { id: string | number; name: string; avatar?: string; email?: string } | null
  client?: { id: string | number; name: string; avatar?: string; email?: string } | null
  date: string
  organization?: { id: string | number; name: string }
  project_description?: string
  business_goals?: string
  communication_goals?: string
  project_kpi?: string
  challenge?: string
  timeline_expectations?: string
  project_budget?: string
  agency_scope?: string
  mandatories?: string
  technical_requirements?: string
  target_audience?: string
  internal_stakeholders?: string
  consumer_insight?: string
  rtb_features?: string
  key_message?: string
  value_proposition?: string
  tone_of_voice?: string
  market_competition?: string
  inspirations?: string
  past_communication?: string
  touchpoints?: string
  final_notes?: string
  links?: string
  attachments?: string
}

const mockBriefs: Brief[] = [
  {
    id: "1",
    project_name: "V2 – Hitachi Energy Landing Page",
    project_type: "General",
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
    project_name: "ABB Robotics UX/UI Audit",
    project_type: "General",
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

interface BriefsListProps {
  onBriefDeleted?: () => void;
}

const BRIEF_TYPES = [
  { id: "General", label: "General" },
  { id: "UX_UI_Website", label: "UX/UI Website" },
  { id: "Event_Tradeshow", label: "Event/Tradeshow" },
  { id: "Video_Animation", label: "Video/Animation" },
  { id: "Digital_Paid_Campaign", label: "Digital Paid Campaign" },
];

// Helper to check if a date is within the last 3 days
function isNew(dateString: string) {
  const created = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 3;
}

export function BriefsList({ onBriefDeleted }: BriefsListProps) {
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [typeFilters, setTypeFilters] = useState<string[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { toast } = useToast();

  const fetchBriefs = () => {
    fetch('/api/briefs')
      .then(res => res.json())
      .then(setBriefs)
  }
  useEffect(() => { fetchBriefs() }, [])

  const getStatusPill = (status: Brief["status"]) => {
    if (status === "New") {
      return <Badge className="bg-green-100 text-green-800">New</Badge>
    }
    return null
  }

  const handleShare = (brief: Brief) => {
    navigator.clipboard.writeText(`${window.location.origin}/brief/${brief.id}`)
    toast({ title: 'Share link copied!' })
  }

  const handleDownload = (brief: Brief) => {
    fetch(`/api/briefs/${brief.id}/download`)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `brief-${brief.id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  const handleSeeSummary = (brief: Brief) => {
    setSelectedBrief(brief)
    setShowSummary(true)
  }

  const closeSummary = () => {
    setShowSummary(false)
    setSelectedBrief(null)
  }

  // Sorting and filtering logic
  const filteredBriefs = briefs.filter(brief => {
    if (typeFilters.length === 0) return true;
    return typeFilters.includes(brief.project_type || "");
  });
  const sortedBriefs = [...filteredBriefs].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleTypeFilterChange = (type: string) => {
    setTypeFilters(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };
  const handleClearFilters = () => {
    setTypeFilters([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 min-w-[200px] justify-between">
              Sorting & Filtering <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
            <DropdownMenuRadioItem checked={sortOrder === 'newest'} onClick={() => setSortOrder('newest')}>Newest first</DropdownMenuRadioItem>
            <DropdownMenuRadioItem checked={sortOrder === 'oldest'} onClick={() => setSortOrder('oldest')}>Oldest first</DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by type:</DropdownMenuLabel>
            {BRIEF_TYPES.map(type => (
              <DropdownMenuCheckboxItem
                key={type.id}
                checked={typeFilters.includes(type.id)}
                onCheckedChange={() => handleTypeFilterChange(type.id)}
              >
                {type.label}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <Button variant="ghost" className="w-full justify-start" onClick={handleClearFilters}>Clear all</Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-xl overflow-hidden border">
        <div className="grid grid-cols-6 gap-0 bg-gray-50 text-sm font-medium text-gray-500 px-6 py-3 border-b">
          <div>Project name and type</div>
          <div>Status</div>
          <div>Brief creator</div>
          <div>Brief manager</div>
          <div>Date of inquiry</div>
          <div>Actions</div>
        </div>
        <div>
          {Array.isArray(sortedBriefs) && sortedBriefs.map((brief, idx) => (
            <div
              key={brief.id}
              className={`grid grid-cols-6 gap-0 items-center px-6 py-4 border-b last:border-b-0 bg-white`}
            >
              {/* Project name and type */}
              <div className="flex flex-col min-w-0">
                <span className={`font-semibold ${brief.status !== 'New' && !isNew(brief.date) ? 'text-gray-400 line-through' : ''}`}>{brief.project_name}</span>
                <span className="text-xs text-gray-400">{BRIEF_TYPES.find(t => t.id === brief.project_type)?.label || brief.project_type}</span>
              </div>
              {/* Status */}
              <div className="flex items-center h-full">
                {isNew(brief.date) ? (
                  <Badge className="bg-green-100 text-green-800">New</Badge>
                ) : null}
              </div>
              {/* Brief creator */}
              <div className="flex items-center gap-2 min-w-0">
                {brief.creator?.avatar && <Avatar className="w-7 h-7"><AvatarImage src={brief.creator.avatar} /><AvatarFallback>{brief.creator.name?.[0]}</AvatarFallback></Avatar>}
                <span className="truncate">{brief.creator?.name}</span>
              </div>
              {/* Brief manager */}
              <div className="flex items-center gap-2 min-w-0">
                {brief.manager?.avatar && <Avatar className="w-7 h-7"><AvatarImage src={brief.manager.avatar} /><AvatarFallback>{brief.manager.name?.[0]}</AvatarFallback></Avatar>}
                <span className="truncate">{brief.manager?.name}</span>
              </div>
              {/* Date of inquiry */}
              <div className="text-gray-700">
                {brief.date ? new Date(brief.date).toLocaleDateString() : ''}
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleShare(brief)} title="Share"><Share2 className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDownload(brief)} title="Download"><Download className="w-4 h-4" /></Button>
                <Button variant="outline" onClick={() => handleSeeSummary(brief)} title="See Summary">See Summary</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showSummary && selectedBrief && (
        <BriefDetailModal
          open={showSummary}
          onOpenChange={open => { if (!open) closeSummary(); }}
          brief={{
            ...selectedBrief,
            projectName: selectedBrief.project_name,
            projectType: selectedBrief.project_type,
            projectDescription: selectedBrief.project_description,
            businessGoals: selectedBrief.business_goals,
            communicationGoals: selectedBrief.communication_goals,
            projectKPI: selectedBrief.project_kpi,
            challenge: selectedBrief.challenge,
            timelineExpectations: selectedBrief.timeline_expectations,
            projectBudget: selectedBrief.project_budget,
            agencyScope: selectedBrief.agency_scope,
            mandatories: selectedBrief.mandatories,
            technicalRequirements: selectedBrief.technical_requirements,
            targetAudience: selectedBrief.target_audience,
            internalStakeholders: selectedBrief.internal_stakeholders,
            consumerInsight: selectedBrief.consumer_insight,
            rtbFeatures: selectedBrief.rtb_features,
            keyMessage: selectedBrief.key_message,
            valueProposition: selectedBrief.value_proposition,
            toneOfVoice: selectedBrief.tone_of_voice,
            marketCompetition: selectedBrief.market_competition,
            inspirations: selectedBrief.inspirations,
            pastCommunication: selectedBrief.past_communication,
            touchpoints: selectedBrief.touchpoints,
            finalNotes: selectedBrief.final_notes,
            links: selectedBrief.links,
            attachments: selectedBrief.attachments,
          }}
        />
      )}
    </div>
  )
}
