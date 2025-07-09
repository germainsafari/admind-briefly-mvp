"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Header() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!session?.user) return;
      let url = "";
      if ((session.user as any).role === "manager") {
        url = `/api/notifications?managerId=${(session.user as any).id}`;
      } else if ((session.user as any).role === "client") {
        url = `/api/notifications?clientId=${(session.user as any).id}`;
      } else {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        setUnreadCount(data.filter((n: any) => !n.read).length);
      }
    };
    fetchNotifications();
    // Optionally poll every 30s
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [session]);

  const markAsRead = async (id: number, type: string) => {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type }),
    });
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <header className="gradient-header">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-brand-black">Admind_</span>
              <span className="text-brand-orange">Briefly</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Input placeholder="Search" className="w-80 bg-white/80 border-white/20 placeholder:text-gray-500" />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2">
                    {notifications.length === 0 && (
                      <div className="text-gray-500 text-sm">No notifications</div>
                    )}
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${n.read ? '' : 'bg-orange-50'}`}
                        onClick={() => markAsRead(n.id, (session?.user as any)?.role || '')}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-sm">
                          <p className="font-medium">{n.message}</p>
                          {n.link && <a href={n.link} className="text-xs text-blue-600 underline">View</a>}
                          <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || "/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback>{session?.user?.name?.split(" ").map(n => n[0]).join("") || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">{session?.user?.name || "User"}</div>
                    <div className="text-xs text-gray-500">{session?.user?.email || ""}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" aria-label="User menu">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
