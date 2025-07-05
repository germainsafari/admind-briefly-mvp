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
  brief: Brief | null
}

export function BriefSummaryPanel({ open, onOpenChange, brief }: BriefSummaryPanelProps) {
  if (!brief) return null

  const [formattedDate, setFormattedDate] = useState<string>("");
  useEffect(() => {
    setFormattedDate(new Date(brief.date).toLocaleDateString("en-GB"));
  }, [brief.date]);

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl"
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
          <SheetTitle id="brief-summary-title" className="text-2xl">Brief summary</SheetTitle>
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
                      <AvatarImage src={brief.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{brief.creator.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{brief.creator.name}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date of inquiry</div>
                  <div className="font-medium">{formattedDate}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-1">Reviewed by</div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Max Johnson</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-1">Assigned manager</div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>MF</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Martyna Florek</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-1">Brief status</div>
                <div className="flex space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="text-xs">NH</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">natalia.haligowska</span>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">jane.doe@abb.com</span>
                </div>
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
                    <div className="text-sm">{brief.projectName}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Project type</div>
                    <div className="text-sm">{brief.type}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Project description</div>
                    <div className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet consectetur. Mauris ipsum arcu vulputate molestie ipsum vitae. Aliquet
                      at auctor nisl et ac morbi turpis eu habitasse. Vitae fermentum amet molestie justo porttibus
                      amet.
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Audit goals</div>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Lorem ipsum dolor sit amet consectetur.</li>
                      <li>Tellus sit sed quis integer in sagittis tortor sagittis pellentesque.</li>
                      <li>Gravida quis donec dignissim sit aliquam posuere lorem elit.</li>
                      <li>Sed viverra sit adipiscing bibendum volutpat vitae.</li>
                      <li>Dui neque donec at in odio.</li>
                      <li>Commodo cum neque non quis.</li>
                      <li>Fermentum semectus condimentum molestie.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Timeline expectations</div>
                    <div className="text-sm">6 weeks</div>
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
                <div className="text-sm text-gray-600">Content for project scope and requirements...</div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">3. Audience and Insights</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="text-sm text-gray-600">Content for audience and insights...</div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">4. Strategic Input</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="text-sm text-gray-600">Content for strategic input...</div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">5. References and Context</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="text-sm text-gray-600">Content for references and context...</div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-semibold">6. Final Notes and Attachments</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="text-sm text-gray-600">Content for final notes and attachments...</div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Back to Top */}
          <div className="flex justify-end pt-8">
            <Button variant="ghost" onClick={handleScrollToTop}>
              ↑ Back to top
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
