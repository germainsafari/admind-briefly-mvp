"use client"

import { useState } from "react"
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
  onSubmit: () => void
}

const mockContacts = [
  {
    id: "1",
    name: "Martyna Florek",
    email: "martyna.florek@admindagency.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Natalia Haligowska-Rzepa",
    email: "natalia.haligowska-rzepa@admindagency.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Name Surname",
    email: "name.surname@admindagency.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Name Surname",
    email: "name.surname@admindagency.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Name Surname",
    email: "name.surname@admindagency.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "Name Surname",
    email: "name.surname@admindagency.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function ShareBriefModalEnhanced({ open, onOpenChange, onSubmit }: ShareBriefModalEnhancedProps) {
  const [email, setEmail] = useState("")
  const [selectedContact, setSelectedContact] = useState("")

  const handleSubmit = () => {
    onSubmit()
  }

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
            <Select value={selectedContact} onValueChange={setSelectedContact}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="max-h-60 card-bg">
                {mockContacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-text">{contact.name}</span>
                        <span className="text-sm text-text-muted">{contact.email}</span>
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
            disabled={!email && !selectedContact}
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
