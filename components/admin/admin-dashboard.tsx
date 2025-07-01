"use client"

import { useState } from "react"
import { Plus, Building2, Users, UserCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateOrganizationModal } from "./create-organization-modal"
import { OrganizationsList } from "./organizations-list"
import { ManagersList } from "./managers-list"
import { ClientsList } from "./clients-list"
import { BriefsList } from "./briefs-list"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const summaryCards = [
  {
    title: "Organizations",
    count: 12,
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "Managers",
    count: 48,
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Clients",
    count: 156,
    icon: UserCheck,
    color: "text-purple-600",
  },
  {
    title: "Briefs",
    count: 324,
    icon: FileText,
    color: "text-orange-600",
  },
]

export function AdminDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState("organizations")

  const tabCounts = {
    organizations: 2,
    managers: 2,
    clients: 4,
    briefs: 5,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-5xl font-bold text-text">Hello Admin!</h1>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>NH</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-lg text-text-muted max-w-2xl">
          Your first step is to create an organization — this is where your clients will complete their briefs. Manage
          the structure, invite users, and set up a workspace tailored to your team's needs.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {[
            { id: "organizations", label: "Organizations", count: tabCounts.organizations },
            { id: "managers", label: "Managers", count: tabCounts.managers },
            { id: "clients", label: "Clients", count: tabCounts.clients },
            { id: "briefs", label: "Briefs", count: tabCounts.briefs },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button onClick={() => setShowCreateModal(true)} className="btn-solid-dark hover:btn-solid-dark">
          {activeTab === "organizations" && "Create new organization"}
          {activeTab === "managers" && "Add new manager"}
          {activeTab === "clients" && "Add new client"}
          {activeTab === "briefs" && "Create new brief"}
          <Plus className="ml-4 icon-20" />
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "organizations" && <OrganizationsList />}
      {activeTab === "managers" && <ManagersList />}
      {activeTab === "clients" && <ClientsList />}
      {activeTab === "briefs" && <BriefsList />}

      {/* Create Organization Modal */}
      <CreateOrganizationModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
