import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddManagerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onManagerCreated?: () => void
}

export function AddManagerModal({ open, onOpenChange, onManagerCreated }: AddManagerModalProps) {
  const [managerData, setManagerData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    organization: "",
    phone: "",
    avatar: null as File | null,
    role: "manager", // Always manager, enforced in backend too
  })
  const [organizations, setOrganizations] = useState<{ id: string, name: string, logo?: string }[]>([])

  useEffect(() => {
    if (open) {
      fetch('/api/organizations')
        .then(res => res.json())
        .then(data => setOrganizations(Array.isArray(data.data) ? data.data : []))
        .catch(() => setOrganizations([]));
    }
  }, [open])

  const handleSave = async () => {
    try {
      const response = await fetch('/api/managers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: managerData.name,
          jobTitle: managerData.jobTitle,
          email: managerData.email,
          organization: managerData.organization,
          phone: managerData.phone,
          avatar: managerData.avatar, // null or file, not handled yet
          // role is always manager, do not send from frontend
        }),
      });
      if (!response.ok) throw new Error('Failed to create manager');
      if (onManagerCreated) onManagerCreated();
      onOpenChange(false);
      setManagerData({
        name: "",
        jobTitle: "",
        email: "",
        organization: "",
        phone: "",
        avatar: null,
        role: "manager",
      });
    } catch (err: any) {
      alert(err.message || 'Error creating manager');
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setManagerData((prev) => ({ ...prev, avatar: file }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" aria-labelledby="add-manager-title" aria-describedby="add-manager-desc">
        <DialogHeader>
          <DialogTitle id="add-manager-title" className="text-xl">Add New Manager</DialogTitle>
          <DialogDescription id="add-manager-desc">Fill in the details to add a new manager to your organization.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={
                    managerData.avatar ? URL.createObjectURL(managerData.avatar) : "/placeholder.svg?height=80&width=80"
                  }
                />
                <AvatarFallback className="text-lg">
                  {managerData.name ? managerData.name.substring(0, 2).toUpperCase() : "MN"}
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
                value={managerData.name}
                onChange={(e) => setManagerData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Dawid Janas"
                className="border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="jobTitle" className="text-sm font-medium text-text-muted mb-2 block">
                Enter job title
              </Label>
              <Input
                id="jobTitle"
                value={managerData.jobTitle}
                onChange={(e) => setManagerData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="Manager"
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
                value={managerData.email}
                onChange={(e) => setManagerData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="dawid.janas@admindagency.com"
                className="border-gray-200"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-text-muted mb-2 block">
                Choose organization from the list*
              </Label>
              <Select
                value={managerData.organization}
                onValueChange={(value) => setManagerData((prev) => ({ ...prev, organization: value }))}
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="card-bg">
                  {Array.isArray(organizations) && organizations.map((org) => (
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

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-text-muted mb-2 block">
                Enter phone number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={managerData.phone}
                onChange={(e) => setManagerData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+48 456 975 057"
                className="border-gray-200"
              />
            </div>

            <div>
              {/* Role selection removed: role is always manager, enforced in backend */}
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
            disabled={!managerData.name || !managerData.email || !managerData.organization}
            className="btn-solid-dark hover:btn-solid-dark"
          >
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 