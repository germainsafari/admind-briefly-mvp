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

interface Manager {
  id: string
  name: string
  title: string
  avatar?: string
  organization: string
  organization_name?: string
  status: "active" | "invited" | "deactivated"
}

interface ManagersListProps {
  onManagerDeleted?: () => void;
}

export function ManagersList({ onManagerDeleted }: ManagersListProps) {
  const [managers, setManagers] = useState<Manager[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();
  const fetchManagers = () => {
    fetch(`/api/managers?page=${currentPage}&limit=${pageSize}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setManagers(data);
        setTotal(total);
      })
  }
  useEffect(() => { fetchManagers() }, [currentPage, pageSize])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this manager?')) return;
    const res = await fetch(`/api/managers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: 'Manager deleted' });
      fetchManagers();
      if (onManagerDeleted) onManagerDeleted();
    } else {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  }

  const getStatusBadge = (status: Manager["status"]) => {
    switch (status) {
      case "invited":
        return <Badge className="bg-blue-100 text-blue-800">Invited</Badge>
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
          {Array.isArray(managers) && managers.map((manager, index) => (
            <TableRow key={manager.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={manager.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{manager.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{manager.name}</div>
                    <div className="text-sm text-gray-500">{manager.title}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{manager.organization_name || manager.organization}</TableCell>
              <TableCell>
                {getStatusBadge(manager.status) || (manager.status === "active" && <Badge className="bg-green-100 text-green-800">Active</Badge>)}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/users/${manager.id}?type=manager`} passHref legacyBehavior>
                  <Button variant="outline" size="sm">
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
