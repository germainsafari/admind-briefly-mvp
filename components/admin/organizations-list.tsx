"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { CreateOrganizationModal } from "./create-organization-modal"
import { useToast } from "@/hooks/use-toast"

interface Organization {
  id: string
  name: string
  logo?: string
  clientsCount: number
  members: Array<{
    id: string
    name: string
    avatar?: string
  }>
}

export function OrganizationsList() {
  const [organizations, setOrganizations] = useState([])
  const [editOrg, setEditOrg] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deletingOrgId, setDeletingOrgId] = useState(null)
  const { toast } = useToast()

  const fetchOrgs = () => {
    fetch('/api/organizations')
      .then(res => res.json())
      .then(setOrganizations)
  }
  useEffect(() => { fetchOrgs() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this organization?')) return
    const res = await fetch(`/api/organizations/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast({ title: 'Organization deleted' })
      fetchOrgs()
    } else {
      toast({ title: 'Failed to delete', variant: 'destructive' })
    }
  }

  const handleEdit = (org) => {
    setEditOrg(org)
    setShowEditModal(true)
  }

  const handleEditSave = async (updatedOrg) => {
    const res = await fetch(`/api/organizations/${editOrg.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedOrg),
    })
    if (res.ok) {
      toast({ title: 'Organization updated' })
      setShowEditModal(false)
      setEditOrg(null)
      fetchOrgs()
    } else {
      toast({ title: 'Failed to update', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 px-4">
        <div>Organization name</div>
        <div>Clients amount</div>
        <div>Add member</div>
        <div></div>
      </div>

      {/* Organizations */}
      <div className="space-y-3">
        {Array.isArray(organizations) && organizations.map((org, index) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4 items-center">
                  {/* Organization Name */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={org.logo || "/placeholder.svg"} />
                      <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{org.name}</span>
                  </div>

                  {/* Clients Count */}
                  <div className="flex items-center space-x-2">
                    <span>
                      {org.clientsCount} client{org.clientsCount !== 1 ? "s" : ""}
                    </span>
                    {org.members && org.members.map((member) => (
                      <Avatar key={member.id} className="h-6 w-6">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  {/* Add Member */}
                  <div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <Link href={`/admin/organizations/${org.id}`} passHref legacyBehavior>
                      <Button as="a" variant="outline" size="sm" className="mr-2 bg-transparent">
                        See organization
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" aria-label="Organization actions">
                        <DropdownMenuItem onClick={() => handleEdit(org)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(org.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {showEditModal && (
        <CreateOrganizationModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          onOrganizationCreated={fetchOrgs}
          initialData={editOrg}
          onSave={handleEditSave}
          isEdit
        />
      )}
    </div>
  )
}
