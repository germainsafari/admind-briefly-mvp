"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();
  const fetchClients = () => {
    fetch(`/api/clients?page=${currentPage}&limit=${pageSize}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setClients(data);
        setTotal(total);
      })
  }
  useEffect(() => { fetchClients() }, [currentPage, pageSize])

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

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Manager name</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(clients) && clients.map((client, index) => (
            <TableRow key={client.id}>
              <TableCell>
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
              </TableCell>
              <TableCell>{client.organization_name || client.organization}</TableCell>
              <TableCell>
                {getStatusBadge(client.status) || (client.status === "active" && <Badge className="bg-green-100 text-green-800">Active</Badge>)}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/users/${client.id}?type=client`} passHref legacyBehavior>
                  <Button as="a" variant="outline" size="sm">
                    See profile
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                isActive={currentPage === idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
