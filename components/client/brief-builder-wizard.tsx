"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, Save, X, Trash2, Plus, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DebugUserInfo } from "@/components/debug-user-info"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { BriefSummaryStreamlined } from "./brief-summary-streamlined"
import { useAuth } from "@/lib/auth-context"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from '@/hooks/use-toast'

interface BriefBuilderWizardProps {
  onClose: () => void
  initialData?: (Partial<BriefData> & { id?: number })
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

export function BriefBuilderWizard({ onClose, initialData }: BriefBuilderWizardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1)
  const [briefId] = useState(initialData?.id)
  const [briefData, setBriefData] = useState<BriefData>({
    projectName: initialData?.projectName || "",
    projectType: initialData?.projectType || "",
    projectDescription: initialData?.projectDescription || "",
    businessGoals: initialData?.businessGoals || "",
    communicationGoals: initialData?.communicationGoals || "",
    projectKPI: initialData?.projectKPI || "",
    challenge: initialData?.challenge || "",
    timelineExpectations: initialData?.timelineExpectations || "",
    projectBudget: initialData?.projectBudget || "",
    agencyScope: initialData?.agencyScope || "",
    mandatories: initialData?.mandatories || "",
    technicalRequirements: initialData?.technicalRequirements || "",
    targetAudience: initialData?.targetAudience || "",
    internalStakeholders: initialData?.internalStakeholders || "",
    consumerInsight: initialData?.consumerInsight || "",
    rtbFeatures: initialData?.rtbFeatures || "",
    keyMessage: initialData?.keyMessage || "",
    valueProposition: initialData?.valueProposition || "",
    toneOfVoice: initialData?.toneOfVoice || "",
    marketCompetition: initialData?.marketCompetition || "",
    inspirations: initialData?.inspirations || "",
    pastCommunication: initialData?.pastCommunication || "",
    touchpoints: initialData?.touchpoints || "",
    finalNotes: initialData?.finalNotes || "",
    attachments: initialData?.attachments || [],
    links: initialData?.links || [""]
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [managers, setManagers] = useState<any[]>([]);
  const [selectedManagers, setSelectedManagers] = useState<any[]>([]);
  const [managerError, setManagerError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [saveDraftError, setSaveDraftError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showStep8CancelConfirm, setShowStep8CancelConfirm] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // List all text fields to count for progress
    const textFields = [
      'projectName', 'projectType', 'projectDescription', 'businessGoals', 'communicationGoals',
      'projectKPI', 'challenge', 'timelineExpectations', 'projectBudget', 'agencyScope',
      'mandatories', 'technicalRequirements', 'targetAudience', 'internalStakeholders',
      'consumerInsight', 'rtbFeatures', 'keyMessage', 'valueProposition', 'toneOfVoice',
      'marketCompetition', 'inspirations', 'pastCommunication', 'touchpoints', 'finalNotes'
    ];
    const totalFields = textFields.length;
    let filled = 0;
    textFields.forEach((field) => {
      const value = briefData[field as keyof BriefData];
      if (value && typeof value === 'string' && value.trim() !== '') {
        filled++;
      }
    });
    setProgress(Math.round((filled / totalFields) * 100));
  }, [briefData]);

  const updateBriefData = (field: keyof BriefData, value: any) => {
    setBriefData((prev) => ({ ...prev, [field]: typeof value === 'string' ? value : (value || "") }))
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', files[0])
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (data.url) {
      setUploadedFiles((prev) => [...prev, data.url])
      updateBriefData('attachments', [...briefData.attachments, files[0]])
    }
    setUploading(false)
  }

  // Fetch managers for the client's organization
  const fetchManagers = async () => {
    if (!user?.organization) return;
    const res = await fetch(`/api/organizations/${user.organization}/managers`);
    if (res.ok) {
      setManagers(await res.json());
    }
  };

  // Open manager modal after last step
  const handleOpenManagerModal = async () => {
    await fetchManagers();
    setManagerModalOpen(true);
  };

  // Modified submit handler to use manager modal
  const handleSubmit = async () => {
    setSubmitStatus('idle');
    // Instead of submitting, open the manager selection modal
    await handleOpenManagerModal();
  };

  // Save as draft handler
  const handleSaveAndClose = async () => {
    setSaveDraftError(null);
    const toSnake = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    const projectTypeMap: Record<string, string> = {
      "general": "General",
      "ux-ui": "UX_UI_Website",
      "event": "Event_Tradeshow",
      "video": "Video_Animation",
      "digital": "Digital_Paid_Campaign"
    };
    const payload: any = {}
    Object.entries(briefData).forEach(([key, value]) => {
      if (key === "projectType") {
        payload["project_type"] = projectTypeMap[value as string] || undefined;
      } else if (key === "projectKPI") {
        payload["project_kpi"] = value;
      } else {
        payload[toSnake(key)] = value
      }
    })
    if (Array.isArray(payload.links)) {
      payload.links = payload.links.filter((link: string) => link && link.trim() !== "");
    }
    if (!payload.organization_id && user?.organization) {
      payload.organization_id = user.organization
    }
    if (user?.role === "client" && user.id) {
      payload.client_id = user.id;
    }
    payload.attachments = uploadedFiles
    payload.status = 'Draft';
    payload.progress = progress;
    try {
      if (briefId) {
        // Update existing draft
        const res = await fetch('/api/briefs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-user-role': 'client' },
          body: JSON.stringify({ id: briefId, ...payload }),
        });
        if (res.ok) {
          toast({ title: 'Your draft has been updated.' });
          window.location.href = '/client';
        } else {
          const errorData = await res.json().catch(() => ({}));
          setSaveDraftError(errorData.error || 'Failed to update draft.');
        }
      } else {
        // Create new draft
        const res = await fetch('/api/briefs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-user-role': 'client' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast({ title: 'Your brief has been saved as a draft.' });
          window.location.href = '/client';
        } else {
          const errorData = await res.json().catch(() => ({}));
          setSaveDraftError(errorData.error || 'Failed to save draft.');
        }
      }
    } catch (error) {
      setSaveDraftError('Failed to save draft.');
    }
  };

  // Actual submit after manager selection
  const handleManagerConfirm = async () => {
    setSubmitError(null);
    if (!selectedManagers.length) {
      setManagerError('Please select at least one manager.');
      return;
    }
    setManagerError(null);
    const toSnake = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    const projectTypeMap: Record<string, string> = {
      "general": "General",
      "ux-ui": "UX_UI_Website",
      "event": "Event_Tradeshow",
      "video": "Video_Animation",
      "digital": "Digital_Paid_Campaign"
    };
    const payload: any = {}
    Object.entries(briefData).forEach(([key, value]) => {
      if (key === "projectType") {
        payload["project_type"] = projectTypeMap[value as string] || undefined;
      } else if (key === "projectKPI") {
        payload["project_kpi"] = value;
      } else {
        payload[toSnake(key)] = value
      }
    })
    if (Array.isArray(payload.links)) {
      payload.links = payload.links.filter((link: string) => link && link.trim() !== "");
    }
    if (!payload.organization_id && user?.organization) {
      payload.organization_id = user.organization
    }
    if (user?.role === "client" && user.id) {
      payload.client_id = user.id;
    }
    payload.attachments = uploadedFiles
    payload.manager_ids = selectedManagers.map((m: any) => m.id);
    payload.status = 'Sent';
    payload.progress = progress;
    try {
      const res = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-role': 'client' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const brief = await res.json();
        const managerNames = selectedManagers.map((m: any) => m.name).join(', ');
        toast({ title: `Brief sent to ${managerNames}.` });
        setSubmitStatus('success');
        setManagerModalOpen(false);
        window.location.href = `/client/brief-success?id=${brief.id}`;
      } else {
        const errorData = await res.json().catch(() => ({}));
        setSubmitError(errorData.error || 'Brief submission failed.');
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitError('Brief submission error.');
      setSubmitStatus('error');
    }
  };

  // Cancel logic for Step 8
  const handleStep8Cancel = () => setShowStep8CancelConfirm(true);
  const handleStep8CancelConfirm = () => {
    setShowStep8CancelConfirm(false);
    setCurrentStep(7);
  };
  const handleStep8CancelDismiss = () => setShowStep8CancelConfirm(false);

  useEffect(() => {
    if (submitStatus === 'success') {
      // No-op: redirect is now handled after API response
    }
  }, [submitStatus]);

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
    return <BriefSummaryStreamlined
      data={briefData}
      onBack={() => setCurrentStep(7)}
      onSubmit={async (recipient) => {
        setSubmitError(null);
        const toSnake = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        const projectTypeMap: Record<string, string> = {
          "general": "General",
          "ux-ui": "UX_UI_Website",
          "event": "Event_Tradeshow",
          "video": "Video_Animation",
          "digital": "Digital_Paid_Campaign"
        };
        const payload: any = {}
        Object.entries(briefData).forEach(([key, value]) => {
          if (key === "projectType") {
            payload["project_type"] = projectTypeMap[value as string] || undefined;
          } else if (key === "projectKPI") {
            payload["project_kpi"] = value;
          } else {
            payload[toSnake(key)] = value
          }
        })
        if (Array.isArray(payload.links)) {
          payload.links = payload.links.filter((link: string) => link && link.trim() !== "");
        }
        if (!payload.organization_id && user?.organization) {
          payload.organization_id = user.organization
        }
        if (user?.role === "client" && user.id) {
          payload.client_id = user.id;
        }
        payload.attachments = uploadedFiles
        if (recipient.managerId) {
          payload.manager_ids = [recipient.managerId];
        }
        if (recipient.email) {
          payload.email = recipient.email;
        }
        payload.status = 'Sent';
        try {
          const res = await fetch('/api/briefs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-user-role': 'client' },
            body: JSON.stringify(payload),
          })
          if (res.ok) {
            const brief = await res.json();
            setSubmitStatus('success');
            window.location.href = `/client/brief-success?id=${brief.id}`;
          } else {
            const errorData = await res.json().catch(() => ({}));
            setSubmitError(errorData.error || 'Brief submission failed.');
            setSubmitStatus('error');
          }
        } catch (error) {
          setSubmitError('Brief submission error.');
          setSubmitStatus('error');
        }
      }}
      onSaveAndClose={handleSaveAndClose}
      onCancel={handleStep8Cancel}
      submitStatus={submitStatus}
      saveDraftError={saveDraftError}
      submitError={submitError}
      user={user}
    />
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
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm" onClick={handleSaveAndClose}>
              <Save className="h-4 w-4 mr-2" />
              Save and close
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm" onClick={() => setShowCancelConfirm(true)}>
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

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Project description</label>
                    <textarea
                      value={briefData.projectDescription}
                      onChange={e => updateBriefData("projectDescription", e.target.value)}
                      placeholder="Describe your project in detail..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Business Goals</label>
                    <textarea
                      value={briefData.businessGoals}
                      onChange={e => updateBriefData("businessGoals", e.target.value)}
                      placeholder="What are your main business objectives?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Communication Goals</label>
                    <textarea
                      value={briefData.communicationGoals}
                      onChange={e => updateBriefData("communicationGoals", e.target.value)}
                      placeholder="What message do you want to communicate?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Project KPI</label>
                    <textarea
                      value={briefData.projectKPI}
                      onChange={e => updateBriefData("projectKPI", e.target.value)}
                      placeholder="How will you measure success?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Challenge</label>
                    <textarea
                      value={briefData.challenge}
                      onChange={e => updateBriefData("challenge", e.target.value)}
                      placeholder="What challenges are you trying to solve?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

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
                <div className="flex justify-between items-center pt-8 border-t mt-8">
                  <Button variant="outline" onClick={handleBack} className="px-6 py-2 rounded font-medium" disabled={currentStep === 1}>Back</Button>
                  <Button onClick={handleNext} className="px-8 py-2 bg-brand-orange text-white rounded font-semibold text-base shadow hover:bg-orange-600 transition">Next</Button>
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
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Agency Scope and Deliverables</label>
                    <textarea
                      value={briefData.agencyScope}
                      onChange={e => updateBriefData("agencyScope", e.target.value)}
                      placeholder="What specific deliverables do you need?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Mandatories and Restrictions / Policies</label>
                    <textarea
                      value={briefData.mandatories}
                      onChange={e => updateBriefData("mandatories", e.target.value)}
                      placeholder="Any mandatory requirements or restrictions?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Technical Requirements</label>
                    <textarea
                      value={briefData.technicalRequirements}
                      onChange={e => updateBriefData("technicalRequirements", e.target.value)}
                      placeholder="Any specific technical requirements?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t mt-8">
                  <Button variant="outline" onClick={handleBack} className="px-6 py-2 rounded font-medium">Back</Button>
                  <Button onClick={handleNext} className="px-8 py-2 bg-brand-orange text-white rounded font-semibold text-base shadow hover:bg-orange-600 transition">Next</Button>
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
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Target Audience</label>
                    <textarea
                      value={briefData.targetAudience}
                      onChange={e => updateBriefData("targetAudience", e.target.value)}
                      placeholder="Who is your target audience?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Internal TG - Internal Stakeholders</label>
                    <textarea
                      value={briefData.internalStakeholders}
                      onChange={e => updateBriefData("internalStakeholders", e.target.value)}
                      placeholder="Who are the internal stakeholders?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Consumer Insight</label>
                    <textarea
                      value={briefData.consumerInsight}
                      onChange={e => updateBriefData("consumerInsight", e.target.value)}
                      placeholder="What insights do you have about your consumers?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">RTB, Features and Benefits</label>
                    <textarea
                      value={briefData.rtbFeatures}
                      onChange={e => updateBriefData("rtbFeatures", e.target.value)}
                      placeholder="What are the key features and benefits?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t mt-8">
                  <Button variant="outline" onClick={handleBack} className="px-6 py-2 rounded font-medium">Back</Button>
                  <Button onClick={handleNext} className="px-8 py-2 bg-brand-orange text-white rounded font-semibold text-base shadow hover:bg-orange-600 transition">Next</Button>
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
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Key Message</label>
                    <textarea
                      value={briefData.keyMessage}
                      onChange={e => updateBriefData("keyMessage", e.target.value)}
                      placeholder="What is your key message?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Value Proposition and USP</label>
                    <textarea
                      value={briefData.valueProposition}
                      onChange={e => updateBriefData("valueProposition", e.target.value)}
                      placeholder="What is your unique value proposition?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Tone of Voice</label>
                    <textarea
                      value={briefData.toneOfVoice}
                      onChange={e => updateBriefData("toneOfVoice", e.target.value)}
                      placeholder="How should we communicate? (e.g., professional, friendly, authoritative)"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Market and Competition</label>
                    <textarea
                      value={briefData.marketCompetition}
                      onChange={e => updateBriefData("marketCompetition", e.target.value)}
                      placeholder="Who are your main competitors?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t mt-8">
                  <Button variant="outline" onClick={handleBack} className="px-6 py-2 rounded font-medium">Back</Button>
                  <Button onClick={handleNext} className="px-8 py-2 bg-brand-orange text-white rounded font-semibold text-base shadow hover:bg-orange-600 transition">Next</Button>
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
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Inspirations/Benchmarks/References</label>
                    <textarea
                      value={briefData.inspirations}
                      onChange={e => updateBriefData("inspirations", e.target.value)}
                      placeholder="Any inspirational examples or benchmarks?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Past Communication, Campaigns and Insights</label>
                    <textarea
                      value={briefData.pastCommunication}
                      onChange={e => updateBriefData("pastCommunication", e.target.value)}
                      placeholder="Tell us about your past campaigns and what you learned"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t mt-8">
                  <Button variant="outline" onClick={handleBack} className="px-6 py-2 rounded font-medium">Back</Button>
                  <Button onClick={handleNext} className="px-8 py-2 bg-brand-orange text-white rounded font-semibold text-base shadow hover:bg-orange-600 transition">Next</Button>
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
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-gray-800 mb-1">Touchpoints</label>
                    <textarea
                      value={briefData.touchpoints}
                      onChange={e => updateBriefData("touchpoints", e.target.value)}
                      placeholder="Where will your audience encounter this campaign? (e.g., website, social media, email, print)"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t mt-8">
                  <Button variant="outline" onClick={handleBack} className="px-6 py-2 rounded font-medium">Back</Button>
                  <Button onClick={handleNext} className="px-8 py-2 bg-brand-orange text-white rounded font-semibold text-base shadow hover:bg-orange-600 transition">Next</Button>
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

                {/* Final Notes Textarea */}
                <div className="space-y-2">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Anything else you'd like to share with us? <span className="text-red-500">*</span></label>
                  <textarea
                    value={briefData.finalNotes}
                    onChange={e => updateBriefData("finalNotes", e.target.value)}
                    placeholder="Any additional information, special requirements, or notes?"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[100px] resize-none bg-white"
                  />
                </div>

                {/* Upload Assets */}
                <div className="space-y-2">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Upload assets</label>
                  <div
                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        if (fileInputRef.current) {
                          fileInputRef.current.files = e.dataTransfer.files;
                        }
                        handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
                      }
                    }}
                  >
                    <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="font-medium text-gray-700">Select a file or drag and drop here</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-black text-white rounded shadow"
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading...' : 'Select file'}
                    </button>
                  </div>
                  {/* File List */}
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((url, idx) => {
                      const fileName = url.split('/').pop() || 'file';
                      const ext = fileName.split('.').pop() || '';
                      let icon = <span className="inline-block w-5 h-5 bg-gray-200 rounded mr-2" />;
                      if (["png", "jpg", "jpeg", "gif"].includes(ext)) icon = <span className="inline-block w-5 h-5 bg-blue-200 rounded mr-2" />;
                      if (["pdf"].includes(ext)) icon = <span className="inline-block w-5 h-5 bg-red-200 rounded mr-2" />;
                      if (["mp4", "mov", "avi"].includes(ext)) icon = <span className="inline-block w-5 h-5 bg-green-200 rounded mr-2" />;

                      // New: Secure SAS download handler
                      const handleViewClick = () => {
                        const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
                        const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME;
                        const publicUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}`;
                        window.open(publicUrl, '_blank', 'noopener,noreferrer');
                      };

                      return (
                        <div key={idx} className="flex items-center bg-white border border-gray-200 rounded px-3 py-2">
                          {icon}
                          <span className="flex-1 truncate text-gray-800 text-sm">{fileName}</span>
                          <span onClick={handleViewClick} className="ml-2 text-xs text-blue-600 underline cursor-pointer">View</span>
                          {/* Optionally add a remove button here */}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Add Links */}
                <div className="space-y-2">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Add links</label>
                  <div className="space-y-2">
                    {briefData.links.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={link}
                          onChange={e => updateLink(idx, e.target.value)}
                          placeholder="Link URL"
                          className="flex-1 rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeLink(idx)}
                          className="p-2 text-gray-500 hover:text-red-600"
                          aria-label="Remove link"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addLink}
                      className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 mt-1"
                    >
                      <Plus className="w-4 h-4" /> Add link
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t mt-8">
                  <Button variant="outline" onClick={handleBack} className="px-6 py-2 rounded font-medium">Back</Button>
                  <Button onClick={handleNext} className="px-8 py-2 bg-brand-orange text-white rounded font-semibold text-base shadow hover:bg-orange-600 transition">Next</Button>
                </div>
              </motion.div>
            )}

            {/* Step 8: Brief Summary */}
            {currentStep === 8 && (
              <BriefSummaryStreamlined
                data={briefData}
                onBack={() => setCurrentStep(7)}
                onSubmit={async (recipient) => {
                  setSubmitError(null);
                  const toSnake = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
                  const projectTypeMap: Record<string, string> = {
                    "general": "General",
                    "ux-ui": "UX_UI_Website",
                    "event": "Event_Tradeshow",
                    "video": "Video_Animation",
                    "digital": "Digital_Paid_Campaign"
                  };
                  const payload: any = {}
                  Object.entries(briefData).forEach(([key, value]) => {
                    if (key === "projectType") {
                      payload["project_type"] = projectTypeMap[value as string] || undefined;
                    } else if (key === "projectKPI") {
                      payload["project_kpi"] = value;
                    } else {
                      payload[toSnake(key)] = value
                    }
                  })
                  if (Array.isArray(payload.links)) {
                    payload.links = payload.links.filter((link: string) => link && link.trim() !== "");
                  }
                  if (!payload.organization_id && user?.organization) {
                    payload.organization_id = user.organization
                  }
                  if (user?.role === "client" && user.id) {
                    payload.client_id = user.id;
                  }
                  payload.attachments = uploadedFiles
                  if (recipient.managerId) {
                    payload.manager_ids = [recipient.managerId];
                  }
                  if (recipient.email) {
                    payload.email = recipient.email;
                  }
                  payload.status = 'Sent';
                  try {
                    const res = await fetch('/api/briefs', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', 'x-user-role': 'client' },
                      body: JSON.stringify(payload),
                    })
                    if (res.ok) {
                      const brief = await res.json();
                      setSubmitStatus('success');
                      window.location.href = `/client/brief-success?id=${brief.id}`;
                    } else {
                      const errorData = await res.json().catch(() => ({}));
                      setSubmitError(errorData.error || 'Brief submission failed.');
                      setSubmitStatus('error');
                    }
                  } catch (error) {
                    setSubmitError('Brief submission error.');
                    setSubmitStatus('error');
                  }
                }}
                onSaveAndClose={handleSaveAndClose}
                onCancel={handleStep8Cancel}
                submitStatus={submitStatus}
                saveDraftError={saveDraftError}
                submitError={submitError}
                user={user}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <Dialog open={managerModalOpen} onOpenChange={setManagerModalOpen}>
        <DialogContent>
          <DialogTitle>Choose who you'd like to send this brief to</DialogTitle>
          <div className="mb-2 text-sm text-gray-500">Select one or more managers from your organization:</div>
          <div className="max-h-60 overflow-y-auto space-y-2 mb-2">
            {managers.map(manager => (
              <div key={manager.id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedManagers.some((m: any) => m.id === manager.id) ? 'bg-gray-100' : ''}`}
                onClick={() => setSelectedManagers(prev => prev.some((m: any) => m.id === manager.id)
                  ? prev.filter((m: any) => m.id !== manager.id)
                  : [...prev, manager])}
              >
                <Avatar className="w-8 h-8"><AvatarImage src={manager.avatar} /><AvatarFallback>{manager.name?.[0]}</AvatarFallback></Avatar>
                <div>
                  <div className="font-medium">{manager.name}</div>
                  <div className="text-xs text-gray-500">{manager.email}</div>
                </div>
                <input type="checkbox" checked={selectedManagers.some((m: any) => m.id === manager.id)} readOnly className="ml-auto" />
              </div>
            ))}
          </div>
          {managerError && <div className="text-red-500 text-sm mb-2">{managerError}</div>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setManagerModalOpen(false)}>Cancel</Button>
            <Button onClick={handleManagerConfirm} disabled={submitStatus === 'success'}>Send the brief</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Fallback overlay for debugging */}
      {managerModalOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', padding: 32, borderRadius: 8, minWidth: 400}}>
            <h2>DEBUG: Manager Modal Fallback</h2>
            <div>Select one or more managers from your organization:</div>
            <div style={{maxHeight: 200, overflowY: 'auto', margin: '16px 0'}}>
              {managers.map(manager => (
                <div key={manager.id} style={{padding: 8, background: selectedManagers.some((m: any) => m.id === manager.id) ? '#eee' : '#fff', cursor: 'pointer'}}
                  onClick={() => setSelectedManagers(prev => prev.some((m: any) => m.id === manager.id)
                    ? prev.filter((m: any) => m.id !== manager.id)
                    : [...prev, manager])}
                >
                  {manager.name} ({manager.email})
                </div>
              ))}
            </div>
            <div style={{color: 'red'}}>{managerError}</div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
              <button onClick={() => setManagerModalOpen(false)}>Cancel</button>
              <button onClick={handleManagerConfirm}>Send the brief</button>
            </div>
          </div>
        </div>
      )}
      {/* Cancel confirmation dialog */}
      <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <DialogContent>
          <DialogTitle>Are you sure you want to cancel?</DialogTitle>
          <div>All information you entered will be lost. This action cannot be undone.</div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>Go Back</Button>
            <Button variant="destructive" onClick={onClose}>Yes, Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Step 8 Cancel confirmation dialog */}
      <Dialog open={showStep8CancelConfirm} onOpenChange={setShowStep8CancelConfirm}>
        <DialogContent>
          <DialogTitle>All unsaved changes will be lost. Are you sure you want to cancel?</DialogTitle>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleStep8CancelDismiss}>Dismiss</Button>
            <Button variant="destructive" onClick={handleStep8CancelConfirm}>Yes, Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
