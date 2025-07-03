"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface BriefDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brief: any // Use the BriefData type if available
}

export function BriefDetailModal({ open, onOpenChange, brief }: BriefDetailModalProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1])

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto card-bg"
        aria-labelledby="brief-detail-title"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle id="brief-detail-title" className="text-2xl text-text">Complete Brief Details</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <p id="brief-detail-desc" className="sr-only">Full details of the submitted creative brief, including all sections and attachments.</p>

        <div className="space-y-4 mt-6">
          {/* Project Overview */}
          <Collapsible open={expandedSections.includes(1)} onOpenChange={() => toggleSection(1)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-text">1. Project Overview</span>
              {expandedSections.includes(1) ? <ChevronUp className="h-5 w-5 text-text-muted" /> : <ChevronDown className="h-5 w-5 text-text-muted" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
              <div className="space-y-4 text-sm">
                <div><div className="font-medium text-text-muted mb-2">Project Title</div><div className="text-text">{brief.projectName}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Project Type</div><div className="text-text">{brief.projectType}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Project Description</div><div className="text-text">{brief.projectDescription}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Business Goals</div><div className="text-text">{brief.businessGoals}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Communication Goals</div><div className="text-text">{brief.communicationGoals}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Project KPI</div><div className="text-text">{brief.projectKPI}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Challenge</div><div className="text-text">{brief.challenge}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Timeline Expectations</div><div className="text-text">{brief.timelineExpectations}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Project Budget</div><div className="text-text">{brief.projectBudget}</div></div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Project Scope and Requirements */}
          <Collapsible open={expandedSections.includes(2)} onOpenChange={() => toggleSection(2)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-text">2. Project Scope and Requirements</span>
              {expandedSections.includes(2) ? <ChevronUp className="h-5 w-5 text-text-muted" /> : <ChevronDown className="h-5 w-5 text-text-muted" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
              <div className="space-y-4 text-sm">
                <div><div className="font-medium text-text-muted mb-2">Agency Scope</div><div className="text-text">{brief.agencyScope}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Mandatories</div><div className="text-text">{brief.mandatories}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Technical Requirements</div><div className="text-text">{brief.technicalRequirements}</div></div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Audience and Insights */}
          <Collapsible open={expandedSections.includes(3)} onOpenChange={() => toggleSection(3)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-text">3. Audience and Insights</span>
              {expandedSections.includes(3) ? <ChevronUp className="h-5 w-5 text-text-muted" /> : <ChevronDown className="h-5 w-5 text-text-muted" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
              <div className="space-y-4 text-sm">
                <div><div className="font-medium text-text-muted mb-2">Target Audience</div><div className="text-text">{brief.targetAudience}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Internal Stakeholders</div><div className="text-text">{brief.internalStakeholders}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Consumer Insight</div><div className="text-text">{brief.consumerInsight}</div></div>
                <div><div className="font-medium text-text-muted mb-2">RTB Features</div><div className="text-text">{brief.rtbFeatures}</div></div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Strategic Input */}
          <Collapsible open={expandedSections.includes(4)} onOpenChange={() => toggleSection(4)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-text">4. Strategic Input</span>
              {expandedSections.includes(4) ? <ChevronUp className="h-5 w-5 text-text-muted" /> : <ChevronDown className="h-5 w-5 text-text-muted" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
              <div className="space-y-4 text-sm">
                <div><div className="font-medium text-text-muted mb-2">Key Message</div><div className="text-text">{brief.keyMessage}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Value Proposition</div><div className="text-text">{brief.valueProposition}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Tone of Voice</div><div className="text-text">{brief.toneOfVoice}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Market Competition</div><div className="text-text">{brief.marketCompetition}</div></div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* References and Context */}
          <Collapsible open={expandedSections.includes(5)} onOpenChange={() => toggleSection(5)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-text">5. References and Context</span>
              {expandedSections.includes(5) ? <ChevronUp className="h-5 w-5 text-text-muted" /> : <ChevronDown className="h-5 w-5 text-text-muted" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
              <div className="space-y-4 text-sm">
                <div><div className="font-medium text-text-muted mb-2">Inspirations</div><div className="text-text">{brief.inspirations}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Past Communication</div><div className="text-text">{brief.pastCommunication}</div></div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Channels and Touchpoints */}
          <Collapsible open={expandedSections.includes(6)} onOpenChange={() => toggleSection(6)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-text">6. Channels and Touchpoints</span>
              {expandedSections.includes(6) ? <ChevronUp className="h-5 w-5 text-text-muted" /> : <ChevronDown className="h-5 w-5 text-text-muted" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
              <div className="space-y-4 text-sm">
                <div><div className="font-medium text-text mb-2">Touchpoints</div><div className="text-text">{brief.touchpoints}</div></div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Final Notes and Attachments */}
          <Collapsible open={expandedSections.includes(7)} onOpenChange={() => toggleSection(7)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-text">7. Final Notes and Attachments</span>
              {expandedSections.includes(7) ? <ChevronUp className="h-5 w-5 text-text-muted" /> : <ChevronDown className="h-5 w-5 text-text-muted" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
              <div className="space-y-4 text-sm">
                <div><div className="font-medium text-text-muted mb-2">Final Notes</div><div className="text-text">{brief.finalNotes}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Links</div><div className="space-y-1">{brief.links?.map((link: string, index: number) => (<div key={index} className="flex items-center space-x-2"><div className="w-4 h-4 bg-gray-300 rounded"></div><span className="text-text">{link}</span></div>))}</div></div>
                <div><div className="font-medium text-text-muted mb-2">Attachments</div><div className="space-y-1">{brief.attachments?.map((file: string, index: number) => (<div key={index} className="flex items-center space-x-2"><div className="w-4 h-4 bg-blue-300 rounded"></div><span className="text-text">{file}</span></div>))}</div></div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  )
}
