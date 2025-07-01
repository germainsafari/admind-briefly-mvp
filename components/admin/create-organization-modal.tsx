"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Plus, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreateOrganizationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface OrganizationData {
  name: string
  location: string
  logo: File | null
  emails: string[]
}

export function CreateOrganizationModal({ open, onOpenChange }: CreateOrganizationModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [orgData, setOrgData] = useState<OrganizationData>({
    name: "",
    location: "",
    logo: null,
    emails: [""],
  })

  const steps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Add Members" },
    { number: 3, title: "Review & Save" },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addEmail = () => {
    setOrgData((prev) => ({
      ...prev,
      emails: [...prev.emails, ""],
    }))
  }

  const removeEmail = (index: number) => {
    setOrgData((prev) => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index),
    }))
  }

  const updateEmail = (index: number, value: string) => {
    setOrgData((prev) => ({
      ...prev,
      emails: prev.emails.map((email, i) => (i === index ? value : email)),
    }))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving organization:", orgData)
    onOpenChange(false)
    setCurrentStep(1)
    setOrgData({ name: "", location: "", logo: null, emails: [""] })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Organization</DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number ? "bg-brand-orange text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.number}
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700">{step.title}</div>
              {index < steps.length - 1 && <div className="w-12 h-px bg-gray-300 mx-4" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={orgData.name}
                    onChange={(e) => setOrgData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={orgData.location}
                    onChange={(e) => setOrgData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location"
                  />
                </div>
              </div>

              <div>
                <Label>Organization Logo</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Add Members */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label>Member Email Addresses</Label>
                <div className="space-y-3 mt-2">
                  {orgData.emails.map((email, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                        placeholder="Enter email address"
                        type="email"
                      />
                      {orgData.emails.length > 1 && (
                        <Button variant="outline" size="icon" onClick={() => removeEmail(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="outline" onClick={addEmail} className="mt-3 bg-transparent" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Email
                </Button>
              </div>

              <div>
                <Label>Or Upload CSV</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV File
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">CSV file with email addresses</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Review Organization Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Organization Name</Label>
                      <p className="font-medium">{orgData.name || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Location</Label>
                      <p className="font-medium">{orgData.location || "Not specified"}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Members to Invite</Label>
                    <div className="mt-2 space-y-1">
                      {orgData.emails
                        .filter((email) => email.trim())
                        .map((email, index) => (
                          <p key={index} className="text-sm">
                            {email}
                          </p>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Save & Close
            </Button>
            {currentStep < 3 ? (
              <Button onClick={handleNext} className="bg-brand-orange hover:bg-orange-600">
                Next
              </Button>
            ) : (
              <Button onClick={handleSave} className="bg-brand-orange hover:bg-orange-600">
                Save & Send Invites
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
