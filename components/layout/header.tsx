"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react";
import { SearchComponent } from "@/components/ui/search"
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
        // For managers, use the managerId from session
        if (!(session.user as any).managerId) return;
        url = `/api/notifications?managerId=${(session.user as any).managerId}`;
      } else if ((session.user as any).role === "client") {
        // For clients, use the clientId from session
        if (!(session.user as any).clientId) return;
        url = `/api/notifications?clientId=${(session.user as any).clientId}`;
      } else {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }
      
      if (url) {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
          setUnreadCount(data.filter((n: any) => !n.read).length);
        }
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

  // Add a type guard for user with role
  function hasRole(user: any): user is { role: string } {
    return user && typeof user.role === 'string';
  }

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
            <div className="hidden md:flex">
              <SearchComponent 
                placeholder="Search organizations, managers, clients, briefs..." 
                className="w-80 bg-white/80 border-white/20 placeholder:text-gray-500" 
              />
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

            {/* User Menu - Custom for client */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3 focus-visible:ring-2 focus-visible:ring-brand-orange" aria-haspopup="menu" aria-label="Open user menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || "/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback>{session?.user?.name?.split(" ").map(n => n[0]).join("") || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start min-w-0 max-w-[120px] truncate">
                    <span className="text-sm font-medium truncate">{session?.user?.name || "User"}</span>
                    {(session?.user as any)?.role === 'client' && (
                      <span className="text-xs text-gray-500 truncate">{(session?.user as any)?.organization_name || (session?.user as any)?.organizationId || (session?.user as any)?.organization || ""}</span>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" aria-label="User menu">
                {/* Only show these for client role */}
                {hasRole(session?.user) && session.user.role === 'client' && (
                  <>
                    <Link href="/client/profile" passHref legacyBehavior>
                      <DropdownMenuItem asChild>Profile</DropdownMenuItem>
                    </Link>
                    <Link href="/onboarding" passHref legacyBehavior>
                      <DropdownMenuItem asChild>Onboarding</DropdownMenuItem>
                    </Link>
                  </>
                )}
                {/* Fallback for other roles (unchanged) */}
                {hasRole(session?.user) && session.user.role === 'admin' && (
                  <Link href="/admin/profile" passHref legacyBehavior>
                    <DropdownMenuItem asChild>Profile</DropdownMenuItem>
                  </Link>
                )}
                {hasRole(session?.user) && session.user.role === 'manager' && (
                  <Link href="/manager/profile" passHref legacyBehavior>
                    <DropdownMenuItem asChild>Profile</DropdownMenuItem>
                  </Link>
                )}
                {!hasRole(session?.user) && session?.user && (
                  <Link href="/profile" passHref legacyBehavior>
                    <DropdownMenuItem asChild>Profile</DropdownMenuItem>
                  </Link>
                )}
                {!hasRole(session?.user) && (
                  <DropdownMenuItem disabled>No profile available</DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
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
