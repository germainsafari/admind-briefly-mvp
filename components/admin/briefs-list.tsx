"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BadgeCheck, Download, Eye, MoreHorizontal, Share2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"

interface Brief {
  id: string
  projectName: string
  type: "General" | "Motion" | "Events" | "Web"
  status: "New" | "Shared" | "Draft"
  creator: {
    name: string
    avatar?: string
  }
  manager: {
    name: string
    avatar?: string
  }
  date: string
}

const mockBriefs: Brief[] = [
  {
    id: "1",
    projectName: "V2 – Hitachi Energy Landing Page",
    type: "General",
    status: "New",
    creator: {
      name: "Kung Fu Panda",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    manager: {
      name: "Natalia Haligowska-Rzepa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-21",
  },
  {
    id: "2",
    projectName: "ABB Robotics UX/UI Audit",
    type: "General",
    status: "New",
    creator: {
      name: "Max Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    manager: {
      name: "Martyna Florek",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-06-20",
  },
]

export function BriefsList() {
  const [briefs, setBriefs] = useState([])
  const [form, setForm] = useState({ project_name: '', project_type: '', id: null })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    fetch('/api/briefs')
      .then(res => res.json())
      .then(setBriefs)
  }, [])

  const refresh = () => {
    fetch('/api/briefs')
      .then(res => res.json())
      .then(setBriefs)
  }

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (editing) {
      await fetch('/api/briefs', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/briefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setForm({ project_name: '', project_type: '', id: null })
    setEditing(false)
    refresh()
  }

  const handleEdit = brief => {
    setForm(brief)
    setEditing(true)
  }

  const handleDelete = async id => {
    await fetch('/api/briefs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    refresh()
  }

  const getStatusPill = (status: Brief["status"]) => {
    switch (status) {
      case "New":
        return <Badge className="bg-green-100 text-green-800">New</Badge>
      case "Shared":
        return <Badge className="bg-blue-100 text-blue-800">Shared</Badge>
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input name="project_name" value={form.project_name} onChange={handleChange} placeholder="Project Name" className="border px-2" required />
        <input name="project_type" value={form.project_type} onChange={handleChange} placeholder="Project Type" className="border px-2" required />
        <button type="submit" className="btn-solid-dark hover:btn-solid-dark px-4">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={() => { setEditing(false); setForm({ project_name: '', project_type: '', id: null }) }} className="ml-2">Cancel</button>}
      </form>
      <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 px-4">
        <div>Project Name</div>
        <div>Type</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      <div className="space-y-3">
        {Array.isArray(briefs) && briefs.map((brief, index) => (
          <div key={brief.id} className="flex items-center gap-4 px-4 py-2 border rounded">
            <div className="flex-1">{brief.project_name}</div>
            <div className="flex-1">{brief.project_type}</div>
            <div className="flex-1">{brief.status}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(brief)} className="btn-outline-dark px-2">Edit</button>
              <button onClick={() => handleDelete(brief.id)} className="btn-outline-dark px-2 text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
