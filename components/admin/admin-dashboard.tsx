"use client"

import { useState, useEffect } from "react"
import { Plus, Building2, Users, UserCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateOrganizationModal } from "./create-organization-modal"
import { OrganizationsList } from "./organizations-list"
import { ManagersList } from "./managers-list"
import { ClientsList } from "./clients-list"
import { BriefsList } from "./briefs-list"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddClientModal } from "@/components/manager/add-client-modal"
import { AddManagerModal } from "./add-manager-modal"
import { AdminDashboardSearch } from "./admin-dashboard-search"
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const user = session?.user as { name?: string };
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAddManagerModal, setShowAddManagerModal] = useState(false)
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [activeTab, setActiveTab] = useState("organizations")
  const [orgsRefreshKey, setOrgsRefreshKey] = useState(0)
  const [managersRefreshKey, setManagersRefreshKey] = useState(0)
  const [clientsRefreshKey, setClientsRefreshKey] = useState(0)
  const [briefsRefreshKey, setBriefsRefreshKey] = useState(0)
  const [tabCounts, setTabCounts] = useState({ organizations: 0, managers: 0, clients: 0, briefs: 0 })

  const firstName = user?.name?.split(" ")[0] || "Admin";

  // Fetch counts from API
  useEffect(() => {
    fetch('/api/dashboard-counts')
      .then(res => res.json())
      .then(data => setTabCounts(data))
      .catch(() => setTabCounts({ organizations: 0, managers: 0, clients: 0, briefs: 0 }))
  }, [orgsRefreshKey, managersRefreshKey, clientsRefreshKey, briefsRefreshKey]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-5xl font-bold text-text">Hello {firstName}!</h1>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} />
            <AvatarFallback>{user?.name?.substring(0, 2) || "AD"}</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-lg text-text-muted max-w-2xl">
          Your first step is to create an organization — this is where your clients will complete their briefs. Manage
          the structure, invite users, and set up a workspace tailored to your team's needs.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl">
          <AdminDashboardSearch />
        </div>
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
      {(activeTab !== "briefs" || user?.role !== "admin") && (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (activeTab === "managers") setShowAddManagerModal(true)
              else if (activeTab === "clients") setShowAddClientModal(true)
              else setShowCreateModal(true)
            }}
            className="btn-solid-dark hover:btn-solid-dark"
          >
            {activeTab === "organizations" && "Create new organization"}
            {activeTab === "managers" && "Add new manager"}
            {activeTab === "clients" && "Add new client"}
            {activeTab === "briefs" && user?.role !== "admin" && "Create new brief"}
            {activeTab === "briefs" && user?.role !== "admin" && <Plus className="ml-4 icon-20" />}
          </Button>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "organizations" && (
        <OrganizationsList
          key={orgsRefreshKey}
          onOrganizationDeleted={() => setOrgsRefreshKey((k) => k + 1)}
        />
      )}
      {activeTab === "managers" && (
        <ManagersList
          key={managersRefreshKey}
          onManagerDeleted={() => setManagersRefreshKey((k) => k + 1)}
        />
      )}
      {activeTab === "clients" && (
        <ClientsList
          key={clientsRefreshKey}
          onClientDeleted={() => setClientsRefreshKey((k) => k + 1)}
        />
      )}
      {activeTab === "briefs" && (
        <BriefsList
          key={briefsRefreshKey}
          onBriefDeleted={() => setBriefsRefreshKey((k) => k + 1)}
        />
      )}

      {/* Create Organization Modal */}
      <CreateOrganizationModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onOrganizationCreated={() => setOrgsRefreshKey((k) => k + 1)}
      />
      {/* Add Manager Modal */}
      <AddManagerModal open={showAddManagerModal} onOpenChange={setShowAddManagerModal} onManagerCreated={() => setManagersRefreshKey(k => k + 1)} />
      {/* Add Client Modal */}
      <AddClientModal open={showAddClientModal} onOpenChange={setShowAddClientModal} onClientCreated={() => setClientsRefreshKey(k => k + 1)} />
    </div>
  )
}
