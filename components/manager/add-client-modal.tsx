"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

interface AddClientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClientCreated?: () => void
}

export function AddClientModal({ open, onOpenChange, onClientCreated }: AddClientModalProps) {
  const [clientData, setClientData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    organization: "",
    avatar: null as File | null,
  })
  const [organizations, setOrganizations] = useState<{ id: string, name: string, logo?: string }[]>([])

  useEffect(() => {
    if (open) {
      fetch('/api/organizations')
        .then(res => res.json())
        .then(data => setOrganizations(Array.isArray(data) ? data : (data.data || [])))
    }
  }, [open])

  const handleSave = async () => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientData.name,
          jobTitle: clientData.jobTitle,
          email: clientData.email,
          organization: clientData.organization,
          avatar: clientData.avatar, // null or file, not handled yet
        }),
      });
      if (!response.ok) throw new Error('Failed to create client');
      if (onClientCreated) onClientCreated();
      onOpenChange(false);
      setClientData({
        name: "",
        jobTitle: "",
        email: "",
        organization: "",
        avatar: null,
      });
    } catch (err: any) {
      alert(err.message || 'Error creating client');
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setClientData((prev) => ({ ...prev, avatar: file }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        aria-labelledby="add-client-title"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle id="add-client-title" className="text-xl">Add New Client</DialogTitle>
          <DialogDescription id="add-client-desc">Fill in the details to add a new client to your organization.</DialogDescription>
          <div className="flex items-center space-x-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={
                    clientData.avatar ? URL.createObjectURL(clientData.avatar) : "/placeholder.svg?height=80&width=80"
                  }
                />
                <AvatarFallback className="text-lg">
                  {clientData.name ? clientData.name.substring(0, 2).toUpperCase() : "CN"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <input type="file" id="avatar-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Label htmlFor="avatar-upload" className="text-sm text-accent-orange cursor-pointer hover:underline">
                Update image
              </Label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-text-muted mb-2 block">
                Enter name and surname
              </Label>
              <Input
                id="name"
                value={clientData.name}
                onChange={(e) => setClientData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Beyonce Knowles"
                className="border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="jobTitle" className="text-sm font-medium text-text-muted mb-2 block">
                Enter job title
              </Label>
              <Input
                id="jobTitle"
                value={clientData.jobTitle}
                onChange={(e) => setClientData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="Singer and Songwriter"
                className="border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-text-muted mb-2 block">
                Enter email address
              </Label>
              <Input
                id="email"
                type="email"
                value={clientData.email}
                onChange={(e) => setClientData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="beyonce.knowles@ch.abb.com"
                className="border-gray-200"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-text-muted mb-2 block">
                Choose organization from the list
              </Label>
              <Select
                value={clientData.organization}
                onValueChange={(value) => setClientData((prev) => ({ ...prev, organization: value }))}
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="card-bg">
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      <div className="flex items-center space-x-3">
                        <img src={org.logo || "/placeholder.svg"} alt={org.name} className="h-5 w-5" />
                        <span>{org.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 mt-6 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-text-muted">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!clientData.name || !clientData.email || !clientData.organization}
            className="btn-solid-dark hover:btn-solid-dark"
          >
            Save and send invite
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
