"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowLeft, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { ShareBriefModal } from "./share-brief-modal-enhanced"
import { BriefSuccessPage } from "./brief-success-page"

interface BriefSummaryProps {
  onBack: () => void
}

const briefSections = [
  {
    id: 1,
    title: "Project Overview",
    completed: true,
    content: {
      projectTitle: "Marketing campaign",
      projectType: "General",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur. Mauris ipsum arcu vulputate molestie ipsum vitae. Aliquet at auctor nisl et ac morbi turpis eu habitasse. Vitae fermentum amet molestie justo porttibus amet.",
      auditGoals: [
        "Lorem ipsum dolor sit amet consectetur.",
        "Tellus sit sed quis integer in sagittis tortor sagittis pellentesque.",
        "Gravida quis donec dignissim sit aliquam posuere lorem elit.",
        "Sed viverra sit adipiscing bibendum volutpat vitae.",
        "Dui neque donec at in odio.",
        "Commodo cum neque non quis.",
        "Fermentum semectus condimentum molestie.",
      ],
      timelineExpectations: "6 weeks",
    },
  },
  {
    id: 2,
    title: "Project Scope and Requirements",
    completed: true,
    content: {
      description: "Detailed project scope and requirements information would be displayed here.",
    },
  },
  {
    id: 3,
    title: "Audience and Insights",
    completed: true,
    content: {
      description: "Target audience and insights information would be displayed here.",
    },
  },
  {
    id: 4,
    title: "Strategic Input",
    completed: true,
    content: {
      description: "Strategic input and positioning information would be displayed here.",
    },
  },
  {
    id: 5,
    title: "References and Context",
    completed: true,
    content: {
      description: "References and context information would be displayed here.",
    },
  },
  {
    id: 6,
    title: "Channels and Touchpoints",
    completed: true,
    content: {
      touchpoints: {
        website: "Dedicated campaign landing page optimized for conversions and lead capture.",
        emailMarketing: "Personalized email sequences targeting segmented audiences with relevant messaging.",
        socialMedia: "Paid and organic posts on LinkedIn, Twitter, and Facebook to engage professional audiences.",
      },
    },
  },
  {
    id: 7,
    title: "Final Notes and Attachments",
    completed: true,
    content: {
      links: ["loremipsum.com"],
    },
  },
]

const steps = [
  { id: 1, title: "Project Overview", completed: true },
  { id: 2, title: "Project Scope and Requirements", completed: true },
  { id: 3, title: "Audience and Insights", completed: true },
  { id: 4, title: "Strategic Input", completed: true },
  { id: 5, title: "References and Context", completed: true },
  { id: 6, title: "Channels and Touchpoints", completed: true },
  { id: 7, title: "Final Notes and Attachments", completed: true },
  { id: 8, title: "Brief summary", completed: false },
]

export function BriefSummary({ onBack }: BriefSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1])
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleSubmitBrief = () => {
    setShowShareModal(false)
    setShowSuccess(true)
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
              {steps.map((step) => (
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

              {/* Brief Sections */}
              <div className="space-y-4">
                {briefSections.map((section) => (
                  <Card key={section.id} className="card-bg shadow-sm">
                    <Collapsible
                      open={expandedSections.includes(section.id)}
                      onOpenChange={() => toggleSection(section.id)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-text">
                              {section.id}. {section.title}
                            </h3>
                            {expandedSections.includes(section.id) ? (
                              <ChevronUp className="h-5 w-5 text-text-muted" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-text-muted" />
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="px-6 pb-6 pt-0">
                          <div className="space-y-4 text-sm">
                            {section.id === 1 && (
                              <div className="space-y-4">
                                <div>
                                  <div className="font-medium text-text-muted mb-2">Project title</div>
                                  <div className="text-text">{section.content.projectTitle}</div>
                                </div>
                                <div>
                                  <div className="font-medium text-text-muted mb-2">Project type</div>
                                  <div className="text-text">{section.content.projectType}</div>
                                </div>
                                <div>
                                  <div className="font-medium text-text-muted mb-2">Project description</div>
                                  <div className="text-text">{section.content.projectDescription}</div>
                                </div>
                                <div>
                                  <div className="font-medium text-text-muted mb-2">Audit goals</div>
                                  <ul className="text-text space-y-1 list-disc list-inside">
                                    {section.content.auditGoals?.map((goal, index) => (
                                      <li key={index}>{goal}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <div className="font-medium text-text-muted mb-2">Timeline expectations</div>
                                  <div className="text-text">{section.content.timelineExpectations}</div>
                                </div>
                              </div>
                            )}

                            {section.id === 6 && section.content.touchpoints && (
                              <div className="space-y-4">
                                <div>
                                  <div className="font-medium text-text mb-2">Touchpoints</div>
                                  <div className="space-y-3">
                                    <div>
                                      <span className="font-medium text-text">Website: </span>
                                      <span className="text-text">{section.content.touchpoints.website}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium text-text">Email Marketing: </span>
                                      <span className="text-text">{section.content.touchpoints.emailMarketing}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium text-text">Social Media: </span>
                                      <span className="text-text">{section.content.touchpoints.socialMedia}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {section.id === 7 && (
                              <div className="space-y-4">
                                <div>
                                  <div className="font-medium text-text-muted mb-2">Links</div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                    <span className="text-text">{section.content.links?.[0]}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {section.id !== 1 && section.id !== 6 && section.id !== 7 && (
                              <div className="text-text-muted">{section.content.description}</div>
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>

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

      {/* Share Modal */}
      <ShareBriefModal open={showShareModal} onOpenChange={setShowShareModal} onSubmit={handleSubmitBrief} />
    </div>
  )
}
