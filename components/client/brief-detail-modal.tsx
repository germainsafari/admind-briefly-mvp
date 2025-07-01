"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface BriefDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const briefSections = [
  {
    id: 1,
    title: "Project Overview",
    content: {
      projectTitle: "Marketing campaign",
      projectType: "General",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur. Mauris ipsum arcu vulputate molestie ipsum vitae. Aliquet at auctor nisl et ac morbi turpis eu habitasse. Vitae fermentum amet molestie justo porttibus amet.",
      businessGoals: "Increase brand awareness and drive customer engagement through targeted marketing initiatives.",
      communicationGoals:
        "Establish clear messaging that resonates with our target audience and differentiates us from competitors.",
      projectKPI: "Increase website traffic by 40%, generate 500 new leads, improve brand recognition by 25%.",
      challenge: "Breaking through market noise and establishing meaningful connections with potential customers.",
      timelineExpectations: "6 weeks",
      projectBudget: "$50,000",
    },
  },
  {
    id: 2,
    title: "Project Scope and Requirements",
    content: {
      agencyScope:
        "Full-service marketing campaign including strategy, creative development, and execution across multiple channels.",
      mandatories: "Brand guidelines compliance, accessibility standards, legal review for all materials.",
      technicalRequirements: "Responsive design, cross-browser compatibility, analytics tracking implementation.",
    },
  },
  {
    id: 3,
    title: "Audience and Insights",
    content: {
      targetAudience:
        "Tech-savvy professionals aged 25-45, decision-makers in mid-to-large companies, early adopters of new technologies.",
      internalStakeholders: "Marketing team, product managers, C-suite executives, sales representatives.",
      consumerInsight:
        "Our audience values efficiency and innovation, seeking solutions that save time and improve productivity.",
      rtbFeatures: "Advanced analytics, seamless integration, 24/7 support, competitive pricing, proven ROI.",
    },
  },
  {
    id: 4,
    title: "Strategic Input",
    content: {
      keyMessage: "Empowering businesses to achieve more through innovative technology solutions.",
      valueProposition:
        "The only platform that combines powerful analytics with intuitive design for maximum business impact.",
      toneOfVoice: "Professional yet approachable, confident but not arrogant, innovative and forward-thinking.",
      marketCompetition:
        "Competing against established players like Salesforce and HubSpot, differentiating through superior user experience.",
    },
  },
  {
    id: 5,
    title: "References and Context",
    content: {
      inspirations: "Apple's clean design aesthetic, Google's user-centric approach, Tesla's innovation messaging.",
      pastCommunication:
        "Previous campaigns focused on features rather than benefits, need to shift to outcome-based messaging.",
    },
  },
  {
    id: 6,
    title: "Channels and Touchpoints",
    content: {
      touchpoints: {
        website: "Dedicated campaign landing page optimized for conversions and lead capture.",
        emailMarketing: "Personalized email sequences targeting segmented audiences with relevant messaging.",
        socialMedia: "Paid and organic posts on LinkedIn, Twitter, and Facebook to engage professional audiences.",
        contentMarketing: "Blog posts, whitepapers, and case studies to establish thought leadership.",
        paidAdvertising: "Google Ads and social media advertising to drive targeted traffic.",
      },
    },
  },
  {
    id: 7,
    title: "Final Notes and Attachments",
    content: {
      finalNotes:
        "Please ensure all materials align with our brand guidelines and maintain consistency across all touchpoints. We're excited to work together on this project!",
      links: ["https://brandguidelines.company.com", "https://competitoranalysis.company.com"],
      attachments: ["brand_guidelines.pdf", "market_research.xlsx", "previous_campaign_results.pptx"],
    },
  },
]

export function BriefDetailModal({ open, onOpenChange }: BriefDetailModalProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1])

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto card-bg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl text-text">Complete Brief Details</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {briefSections.map((section) => (
            <Collapsible
              key={section.id}
              open={expandedSections.includes(section.id)}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-text">
                  {section.id}. {section.title}
                </span>
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="h-5 w-5 text-text-muted" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-text-muted" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 border border-gray-200 rounded-lg mt-2">
                <div className="space-y-4 text-sm">
                  {section.id === 1 && (
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium text-text-muted mb-2">Project Title</div>
                        <div className="text-text">{section.content.projectTitle}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Project Type</div>
                        <div className="text-text">{section.content.projectType}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Project Description</div>
                        <div className="text-text">{section.content.projectDescription}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Business Goals</div>
                        <div className="text-text">{section.content.businessGoals}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Communication Goals</div>
                        <div className="text-text">{section.content.communicationGoals}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Project KPI</div>
                        <div className="text-text">{section.content.projectKPI}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Challenge</div>
                        <div className="text-text">{section.content.challenge}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Timeline Expectations</div>
                        <div className="text-text">{section.content.timelineExpectations}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Project Budget</div>
                        <div className="text-text">{section.content.projectBudget}</div>
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
                          <div>
                            <span className="font-medium text-text">Content Marketing: </span>
                            <span className="text-text">{section.content.touchpoints.contentMarketing}</span>
                          </div>
                          <div>
                            <span className="font-medium text-text">Paid Advertising: </span>
                            <span className="text-text">{section.content.touchpoints.paidAdvertising}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === 7 && (
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium text-text-muted mb-2">Final Notes</div>
                        <div className="text-text">{section.content.finalNotes}</div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Links</div>
                        <div className="space-y-1">
                          {section.content.links?.map((link, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-gray-300 rounded"></div>
                              <span className="text-text">{link}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-text-muted mb-2">Attachments</div>
                        <div className="space-y-1">
                          {section.content.attachments?.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-blue-300 rounded"></div>
                              <span className="text-text">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generic content for other sections */}
                  {section.id !== 1 && section.id !== 6 && section.id !== 7 && (
                    <div className="space-y-4">
                      {Object.entries(section.content).map(([key, value]) => (
                        <div key={key}>
                          <div className="font-medium text-text-muted mb-2 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="text-text">{value as string}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
