"use client"

import { ArrowLeft, Share2, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useEffect, useState } from 'react';

interface Brief {
  id: string
  projectName: string
  type: string
  status: string
  creator: {
    name: string
    avatar: string
  }
  date: string
}

interface BriefSummaryPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brief: any // Use 'any' to allow all API fields
}

export function BriefSummaryPanel({ open, onOpenChange, brief }: BriefSummaryPanelProps) {
  if (!brief) return null

  const [formattedDate, setFormattedDate] = useState<string>("");
  useEffect(() => {
    setFormattedDate(new Date(brief.date).toLocaleDateString("en-GB"));
  }, [brief.date]);

  // Determine status (New if sent within 3 days)
  let status = brief.status;
  if (!status && brief.date) {
    const createdAt = new Date(brief.date);
    const now = new Date();
    const daysDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff < 3) status = 'New';
  }

  // Helper to render lists from string or array
  const renderList = (value: any) => {
    if (!value) return <span className="italic text-gray-400">N/A</span>;
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="italic text-gray-400">N/A</span>;
      return (
        <ul className="list-disc list-inside space-y-1">
          {value.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      );
    }
    if (typeof value === 'string') {
      const items = value.split(/\n|,/).map(s => s.trim()).filter(Boolean);
      if (items.length === 1) return <span>{items[0]}</span>;
      return (
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      );
    }
    return <span>{String(value)}</span>;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl max-h-screen overflow-y-auto"
        aria-labelledby="brief-summary-title"
        aria-describedby={undefined}
      >
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <SheetTitle id="brief-summary-title" className="text-2xl">
            Brief summary{brief ? '' : ' (loading...)'}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Brief Info */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Submitted by</div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={brief.creator?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{brief.creator?.name?.substring(0, 2) || '@'}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{brief.creator?.name || brief.creator?.email || 'N/A'}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date of inquiry</div>
                  <div className="font-medium">{formattedDate}</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-1">Assigned manager(s)</div>
                <div className="flex flex-wrap gap-2 items-center">
                  {Array.isArray(brief.managers) && brief.managers.length > 0 ? (
                    brief.managers.map((manager: any) => (
                      <div key={manager.id} className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={manager.avatar || "/placeholder.svg?height=32&width=32"} />
                          <AvatarFallback>{manager.name ? manager.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : '@'}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{manager.name || manager.email}</span>
                      </div>
                    ))
                  ) : (
                    <span className="italic text-gray-400">No manager info</span>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-1">Brief status</div>
                <span className="font-medium">{status || 'N/A'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Project Sections */}
          <div className="space-y-4">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">1. Project Overview</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Project title</div>
                    <div className="text-sm">{brief.project_name || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Project type</div>
                    <div className="text-sm">{brief.project_type || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Project description</div>
                    <div className="text-sm text-gray-600">{brief.project_description || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Audit goals</div>
                    {renderList(brief.business_goals)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Timeline expectations</div>
                    <div className="text-sm">{brief.timeline_expectations || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">2. Project Scope and Requirements</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Agency scope</div>
                    {renderList(brief.agency_scope)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Mandatories</div>
                    {renderList(brief.mandatories)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Technical requirements</div>
                    {renderList(brief.technical_requirements)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Challenge</div>
                    <div className="text-sm text-gray-600">{brief.challenge || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Project budget</div>
                    <div className="text-sm text-gray-600">{brief.project_budget || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">3. Audience and Insights</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Target audience</div>
                    {renderList(brief.target_audience)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Internal stakeholders</div>
                    {renderList(brief.internal_stakeholders)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Consumer insight</div>
                    <div className="text-sm text-gray-600">{brief.consumer_insight || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">4. Strategic Input</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Key message</div>
                    <div className="text-sm text-gray-600">{brief.key_message || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Value proposition</div>
                    <div className="text-sm text-gray-600">{brief.value_proposition || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Tone of voice</div>
                    <div className="text-sm text-gray-600">{brief.tone_of_voice || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">RTB features</div>
                    {renderList(brief.rtb_features)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Project KPI</div>
                    {renderList(brief.project_kpi)}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">5. References and Context</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Inspirations</div>
                    {renderList(brief.inspirations)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Past communication</div>
                    {renderList(brief.past_communication)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Market competition</div>
                    {renderList(brief.market_competition)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Touchpoints</div>
                    {renderList(brief.touchpoints)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Links</div>
                    {renderList(brief.links)}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">6. Final Notes and Attachments</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Final notes</div>
                    <div className="text-sm text-gray-600">{brief.final_notes || <span className="italic text-gray-400">N/A</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Attachments</div>
                    {renderList(brief.attachments)}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Back to Top */}
          <div className="flex justify-end pt-8">
            <Button variant="ghost" onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              ↑ Back to top
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
