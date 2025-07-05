"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Client {
  id: string
  name: string
  title: string
  avatar?: string
  organization: string
  status: "active" | "invited" | "deactivated"
}

interface ClientsListProps {
  onClientDeleted?: () => void;
}

export function ClientsList({ onClientDeleted }: ClientsListProps) {
  const [clients, setClients] = useState([])
  const { toast } = useToast();
  const fetchClients = () => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(setClients)
  }
  useEffect(() => { fetchClients() }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: 'Client deleted' });
      fetchClients();
      if (onClientDeleted) onClientDeleted();
    } else {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  }

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "invited":
        return <Badge className="bg-pink-100 text-pink-800">Invited</Badge>
      case "deactivated":
        return <Badge variant="secondary">Deactivated</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 px-4">
        <div>Manager name</div>
        <div>Organization</div>
        <div>Status</div>
      </div>

      {/* Clients */}
      <div className="space-y-3">
        {Array.isArray(clients) && clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* Client Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.title}</div>
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <span className="text-sm">{client.organization_name || client.organization}</span>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center justify-between">
                    {getStatusBadge(client.status)}
                    <div className="flex gap-2">
                      <Link href={`/admin/users/${client.id}?type=client`} passHref legacyBehavior>
                        <Button as="a" variant="outline" size="sm">
                          See profile
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(client.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
