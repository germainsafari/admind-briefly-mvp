"use client"

import { useState } from "react"
import { ArrowLeft, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ShareBriefModal } from "./share-brief-modal-enhanced"
import { BriefSuccessPage } from "./brief-success-page"
import { BriefDetailModal } from "./brief-detail-modal"

interface BriefSummaryStreamlinedProps {
  onBack: () => void
}

const briefSteps = [
  { id: 1, title: "Project Overview", completed: true },
  { id: 2, title: "Project Scope and Requirements", completed: true },
  { id: 3, title: "Audience and Insights", completed: true },
  { id: 4, title: "Strategic Input", completed: true },
  { id: 5, title: "References and Context", completed: true },
  { id: 6, title: "Channels and Touchpoints", completed: true },
  { id: 7, title: "Final Notes and Attachments", completed: true },
  { id: 8, title: "Brief summary", completed: false },
]

export function BriefSummaryStreamlined({ onBack }: BriefSummaryStreamlinedProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const handleSubmitBrief = () => {
    setShowShareModal(false)
    setShowSuccess(true)
  }

  const handleViewDetails = () => {
    setShowDetailModal(true)
  }

  if (showSuccess) {
    return <BriefSuccessPage onBackToDashboard={() => (window.location.href = "/client")} />
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 card-bg border-r border-gray-200 min-h-screen p-6">
          <div className="space-y-6">
            {/* Steps */}
            <div className="space-y-3">
              {briefSteps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                    step.id === 8
                      ? "bg-accent-orange text-white"
                      : step.completed
                        ? "bg-accent-orange text-white"
                        : "text-text-muted hover:bg-gray-50",
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                      step.id === 8 || step.completed ? "bg-white text-accent-orange" : "bg-gray-200 text-text-muted",
                    )}
                  >
                    {step.id}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t">
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                Save and close
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-text">Brief summary</h1>
                <Button variant="ghost" size="sm" className="text-text-muted">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>

              {/* Summary Overview */}
              <Card className="card-bg shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-medium text-text-muted mb-1">Project Title</div>
                        <div className="text-lg font-semibold text-text">Marketing campaign</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-muted mb-1">Project Type</div>
                        <div className="text-lg font-semibold text-text">General</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-text-muted mb-2">Project Description</div>
                      <div className="text-text">
                        Lorem ipsum dolor sit amet consectetur. Mauris ipsum arcu vulputate molestie ipsum vitae.
                        Aliquet at auctor nisl et ac morbi turpis eu habitasse.
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-text-muted mb-2">Timeline Expectations</div>
                      <div className="text-text">6 weeks</div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={handleViewDetails}
                        className="text-accent-orange border-accent-orange hover:bg-accent-light bg-transparent"
                      >
                        View Full Brief Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between pt-8">
                <Button variant="ghost" onClick={onBack} className="text-text">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setShowShareModal(true)}
                  className="accent-bg hover:accent-light-bg hover:text-accent-orange text-white"
                >
                  Submit the brief
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShareBriefModal open={showShareModal} onOpenChange={setShowShareModal} onSubmit={handleSubmitBrief} />
      <BriefDetailModal open={showDetailModal} onOpenChange={setShowDetailModal} />
    </div>
  )
}
