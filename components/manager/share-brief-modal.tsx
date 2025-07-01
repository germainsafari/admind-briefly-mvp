"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Brief {
  id: string
  projectName: string
  type: string
  status: string
  creator: {
    name: string
    avatar: string
  }
  date: string
}

interface ShareBriefModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brief: Brief | null
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

export function ShareBriefModal({ open, onOpenChange, brief }: ShareBriefModalProps) {
  const [email, setEmail] = useState("")
  const [selectedContact, setSelectedContact] = useState("")

  const handleShare = () => {
    // Handle sharing logic here
    console.log("Sharing brief with:", email || selectedContact)
    onOpenChange(false)
    setEmail("")
    setSelectedContact("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Select with who you want to share this brief</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Type in email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contact Selection */}
          <div className="space-y-2">
            <Label>Choose from the list</Label>
            <Select value={selectedContact} onValueChange={setSelectedContact}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {mockContacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-sm text-gray-500">{contact.email}</span>
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
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleShare} disabled={!email && !selectedContact} className="bg-gray-600 hover:bg-gray-700">
            Share the brief
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
