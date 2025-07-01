"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { BriefSummaryStreamlined } from "./brief-summary-streamlined"

interface BriefBuilderWizardProps {
  onClose: () => void
}

interface BriefData {
  projectName: string
  projectType: string
  projectDescription: string
  businessGoals: string
  communicationGoals: string
  projectKPI: string
  challenge: string
  timelineExpectations: string
  projectBudget: string
  agencyScope: string
  mandatories: string
  technicalRequirements: string
  targetAudience: string
  internalStakeholders: string
  consumerInsight: string
  rtbFeatures: string
  keyMessage: string
  valueProposition: string
  toneOfVoice: string
  marketCompetition: string
  inspirations: string
  pastCommunication: string
  touchpoints: string
  finalNotes: string
  attachments: File[]
  links: string[]
}

const projectTypes = [
  { id: "general", label: "General" },
  { id: "ux-ui", label: "UX/UI Website" },
  { id: "event", label: "Event/Tradeshow" },
  { id: "video", label: "Video/Animation" },
  { id: "digital", label: "Digital Paid Campaign" },
]

const steps = [
  { id: 1, title: "Project Overview", completed: false },
  { id: 2, title: "Project Scope and Requirements", completed: false },
  { id: 3, title: "Audience and Insights", completed: false },
  { id: 4, title: "Strategic Input", completed: false },
  { id: 5, title: "References and Context", completed: false },
  { id: 6, title: "Channels and Touchpoints", completed: false },
  { id: 7, title: "Final Notes and Attachments", completed: false },
  { id: 8, title: "Brief summary", completed: false },
]

export function BriefBuilderWizard({ onClose }: BriefBuilderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [briefData, setBriefData] = useState<BriefData>({
    projectName: "",
    projectType: "",
    projectDescription: "",
    businessGoals: "",
    communicationGoals: "",
    projectKPI: "",
    challenge: "",
    timelineExpectations: "",
    projectBudget: "",
    agencyScope: "",
    mandatories: "",
    technicalRequirements: "",
    targetAudience: "",
    internalStakeholders: "",
    consumerInsight: "",
    rtbFeatures: "",
    keyMessage: "",
    valueProposition: "",
    toneOfVoice: "",
    marketCompetition: "",
    inspirations: "",
    pastCommunication: "",
    touchpoints: "",
    finalNotes: "",
    attachments: [],
    links: [""],
  })

  const updateBriefData = (field: keyof BriefData, value: any) => {
    setBriefData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addLink = () => {
    setBriefData((prev) => ({ ...prev, links: [...prev.links, ""] }))
  }

  const updateLink = (index: number, value: string) => {
    setBriefData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) => (i === index ? value : link)),
    }))
  }

  const removeLink = (index: number) => {
    setBriefData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }))
  }

  const AITextArea = ({
    label,
    value,
    onChange,
    placeholder = "",
    required = false,
  }: {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    required?: boolean
  }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium">{label}</Label>
        {required && <span className="text-red-500">*</span>}
        <Button variant="ghost" size="sm" className="h-auto p-1">
          <Wand2 className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px] resize-none"
        rows={4}
      />
    </div>
  )

  if (currentStep === 8) {
    return <BriefSummaryStreamlined onBack={() => setCurrentStep(7)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <div className="space-y-6">
          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors",
                  currentStep === step.id
                    ? "bg-brand-orange text-white"
                    : currentStep > step.id
                      ? "bg-brand-orange text-white"
                      : "text-gray-600 hover:bg-gray-50",
                )}
                onClick={() => setCurrentStep(step.id)}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                    currentStep >= step.id ? "bg-white text-brand-orange" : "bg-gray-200 text-gray-600",
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
              <Save className="h-4 w-4 mr-2" />
              Save and close
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Project Overview */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h1 className="text-3xl font-bold">1. Project overview</h1>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="projectName" className="text-sm font-medium">
                      Project name
                    </Label>
                    <Input
                      id="projectName"
                      value={briefData.projectName}
                      onChange={(e) => updateBriefData("projectName", e.target.value)}
                      placeholder="e.g. Marketing campaign"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Select project type</Label>
                    <div className="grid grid-cols-5 gap-3 mt-2">
                      {projectTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={briefData.projectType === type.id ? "default" : "outline"}
                          className={cn(
                            "h-auto p-4 text-center",
                            briefData.projectType === type.id ? "bg-brand-black" : "",
                          )}
                          onClick={() => updateBriefData("projectType", type.id)}
                        >
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <AITextArea
                    label="Project description"
                    value={briefData.projectDescription}
                    onChange={(value) => updateBriefData("projectDescription", value)}
                    placeholder="Describe your project in detail..."
                  />

                  <AITextArea
                    label="Business Goals"
                    value={briefData.businessGoals}
                    onChange={(value) => updateBriefData("businessGoals", value)}
                    placeholder="What are your main business objectives?"
                  />

                  <AITextArea
                    label="Communication Goals"
                    value={briefData.communicationGoals}
                    onChange={(value) => updateBriefData("communicationGoals", value)}
                    placeholder="What message do you want to communicate?"
                  />

                  <AITextArea
                    label="Project KPI"
                    value={briefData.projectKPI}
                    onChange={(value) => updateBriefData("projectKPI", value)}
                    placeholder="How will you measure success?"
                  />

                  <AITextArea
                    label="Challenge"
                    value={briefData.challenge}
                    onChange={(value) => updateBriefData("challenge", value)}
                    placeholder="What challenges are you trying to solve?"
                  />

                  <div>
                    <Label htmlFor="timeline" className="text-sm font-medium">
                      Timeline Expectations
                    </Label>
                    <Input
                      id="timeline"
                      value={briefData.timelineExpectations}
                      onChange={(e) => updateBriefData("timelineExpectations", e.target.value)}
                      placeholder="6 weeks"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-sm font-medium">
                      Project Budget
                    </Label>
                    <Input
                      id="budget"
                      value={briefData.projectBudget}
                      onChange={(e) => updateBriefData("projectBudget", e.target.value)}
                      placeholder="$50,000"
                      className="mt-2"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Scope and Requirements */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h1 className="text-3xl font-bold">2. Project Scope and Requirements</h1>

                <div className="space-y-6">
                  <AITextArea
                    label="Agency Scope and Deliverables"
                    value={briefData.agencyScope}
                    onChange={(value) => updateBriefData("agencyScope", value)}
                    placeholder="What specific deliverables do you need?"
                  />

                  <AITextArea
                    label="Mandatories and Restrictions / Policies"
                    value={briefData.mandatories}
                    onChange={(value) => updateBriefData("mandatories", value)}
                    placeholder="Any mandatory requirements or restrictions?"
                  />

                  <AITextArea
                    label="Technical Requirements"
                    value={briefData.technicalRequirements}
                    onChange={(value) => updateBriefData("technicalRequirements", value)}
                    placeholder="Any specific technical requirements?"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Audience and Insights */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h1 className="text-3xl font-bold">3. Audience and Insights</h1>

                <div className="space-y-6">
                  <AITextArea
                    label="Target Audience"
                    value={briefData.targetAudience}
                    onChange={(value) => updateBriefData("targetAudience", value)}
                    placeholder="Who is your target audience?"
                  />

                  <AITextArea
                    label="Internal TG - Internal Stakeholders"
                    value={briefData.internalStakeholders}
                    onChange={(value) => updateBriefData("internalStakeholders", value)}
                    placeholder="Who are the internal stakeholders?"
                  />

                  <AITextArea
                    label="Consumer Insight"
                    value={briefData.consumerInsight}
                    onChange={(value) => updateBriefData("consumerInsight", value)}
                    placeholder="What insights do you have about your consumers?"
                  />

                  <AITextArea
                    label="RTB, Features and Benefits"
                    value={briefData.rtbFeatures}
                    onChange={(value) => updateBriefData("rtbFeatures", value)}
                    placeholder="What are the key features and benefits?"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Strategic Input */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h1 className="text-3xl font-bold">4. Strategic Input</h1>

                <div className="space-y-6">
                  <AITextArea
                    label="Key Message"
                    value={briefData.keyMessage}
                    onChange={(value) => updateBriefData("keyMessage", value)}
                    placeholder="What is your key message?"
                  />

                  <AITextArea
                    label="Value Proposition and USP"
                    value={briefData.valueProposition}
                    onChange={(value) => updateBriefData("valueProposition", value)}
                    placeholder="What is your unique value proposition?"
                  />

                  <AITextArea
                    label="Tone of Voice"
                    value={briefData.toneOfVoice}
                    onChange={(value) => updateBriefData("toneOfVoice", value)}
                    placeholder="How should we communicate? (e.g., professional, friendly, authoritative)"
                  />

                  <AITextArea
                    label="Market and Competition"
                    value={briefData.marketCompetition}
                    onChange={(value) => updateBriefData("marketCompetition", value)}
                    placeholder="Who are your main competitors?"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 5: References and Context */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h1 className="text-3xl font-bold">5. References and Context</h1>

                <div className="space-y-6">
                  <AITextArea
                    label="Inspirations/Benchmarks/References"
                    value={briefData.inspirations}
                    onChange={(value) => updateBriefData("inspirations", value)}
                    placeholder="Any inspirational examples or benchmarks?"
                  />

                  <AITextArea
                    label="Past Communication, Campaigns and Insights"
                    value={briefData.pastCommunication}
                    onChange={(value) => updateBriefData("pastCommunication", value)}
                    placeholder="Tell us about your past campaigns and what you learned"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 6: Channels and Touchpoints */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h1 className="text-3xl font-bold">6. Channels and Touchpoints</h1>

                <div className="space-y-6">
                  <AITextArea
                    label="Touchpoints"
                    value={briefData.touchpoints}
                    onChange={(value) => updateBriefData("touchpoints", value)}
                    placeholder="Where will your audience encounter this campaign? (e.g., website, social media, email, print)"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 7: Final Notes and Attachments */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h1 className="text-3xl font-bold">7. Final Notes and Attachments</h1>

                <div className="space-y-6">
                  <AITextArea
                    label="Anything else you'd like to share with us?"
                    value={briefData.finalNotes}
                    onChange={(value) => updateBriefData("finalNotes", value)}
                    placeholder="Any additional notes or comments you'd like to share with us?"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
