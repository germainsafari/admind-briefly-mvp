"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2 } from "lucide-react"

interface ShareBriefModalEnhancedProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { managerId?: string; email?: string }) => void
  organizationId: string
}

export function ShareBriefModalEnhanced({ open, onOpenChange, onSubmit, organizationId }: ShareBriefModalEnhancedProps) {
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedManager, setSelectedManager] = useState(null)
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (open && organizationId) {
      setLoading(true)
      setError(null)
      fetch(`/api/organizations/${organizationId}/managers`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch managers')
          return res.json()
        })
        .then(data => {
          setManagers(data)
          setLoading(false)
        })
        .catch(e => {
          setError('Could not load managers.')
          setLoading(false)
        })
    }
  }, [open, organizationId])

  const handleSubmit = () => {
    if (onSubmit) onSubmit({
      managerId: selectedManager || undefined,
      email: email || undefined
    });
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md card-bg"
        aria-labelledby="share-brief-enhanced-title"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle id="share-brief-enhanced-title" className="text-xl text-text">Choose who you'd like to send this brief to</DialogTitle>
            <Button variant="ghost" size="sm" className="text-text-muted">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <p id="share-brief-enhanced-desc" className="text-gray-600 mt-2">Select a contact or enter an email to send the brief.</p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-text">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Type in email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-200"
            />
          </div>

          {/* Contact Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-text">Choose from the list</Label>
            <Select value={selectedManager} onValueChange={setSelectedManager}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="max-h-60 card-bg">
                {managers.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id}>
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={manager.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{manager.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-text">{manager.name}</span>
                        <span className="text-sm text-text-muted">{manager.email}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-text-muted">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!email && !selectedManager}
            className="accent-bg hover:accent-light-bg hover:text-accent-orange text-white"
          >
            Send the brief
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ShareBriefModalEnhanced as ShareBriefModal }
