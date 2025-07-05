"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function ClientProfilePage() {
  const { user } = useAuth();

  if (!user || user.role !== "client") {
    return <div className="p-8 text-red-600">Access denied. Only clients can view this page.</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center space-x-6">
          <img src={user.avatar || "/placeholder-user.jpg"} alt={user.name} className="h-24 w-24 rounded-full object-cover" />
          <div>
            <div className="text-2xl font-semibold">{user.name}</div>
            <div className="text-gray-500">Client</div>
            <div className="flex items-center mt-2">
              <img src={user.organization_logo || "/placeholder-logo.png"} alt="org" className="h-6 w-6 mr-2" />
              <span>{user.organization_name || user.organization}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">Email: <span className="font-semibold text-black">{user.email}</span></div>
          </div>
        </div>
      </div>
      <Link href="/client" className="text-black flex items-center space-x-1">
        <span>&larr;</span>
        <span>Back to dashboard</span>
      </Link>
    </div>
  );
} 