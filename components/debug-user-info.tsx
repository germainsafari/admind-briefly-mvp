"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

export function DebugUserInfo() {
  const { user, logout } = useAuth()

  const clearLocalStorage = () => {
    localStorage.removeItem("admind_user")
    window.location.reload()
  }

  if (!user) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-bold">Debug: No user logged in</h3>
        <p>Please log in to test the brief submission.</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-blue-100 border border-blue-400 rounded mb-4">
      <h3 className="font-bold">Debug: Current User Info</h3>
      <div className="text-sm space-y-1">
        <p><strong>ID:</strong> {user.id} (Type: {typeof user.id})</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Organization:</strong> {user.organization}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      
      <div className="mt-3 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
        >
          Logout
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearLocalStorage}
        >
          Clear localStorage
        </Button>
      </div>
      
      {user.role !== "client" && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 rounded">
          <p className="text-red-800 text-sm">
            ⚠️ You are logged in as a {user.role}, not a client. 
            Brief submission requires a client role.
          </p>
        </div>
      )}
    </div>
  )
} 