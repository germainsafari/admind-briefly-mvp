"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: number
  type: 'organization' | 'manager' | 'client' | 'brief'
  displayName: string
  subtitle: string
  name?: string
  project_name?: string
  avatar?: string
  status?: string
}

interface AdminDashboardSearchProps {
  className?: string
  onResultClick?: (result: SearchResult) => void
}

const searchTypes = [
  { id: 'all', label: 'All', count: 0 },
  { id: 'organizations', label: 'Organizations', count: 0 },
  { id: 'managers', label: 'Managers', count: 0 },
  { id: 'clients', label: 'Clients', count: 0 },
  { id: 'briefs', label: 'Briefs', count: 0 },
]

const typeIcons = {
  organization: '🏢',
  manager: '👥',
  client: '👤',
  brief: '📄',
}

const typeColors = {
  organization: "bg-blue-100 text-blue-800",
  manager: "bg-green-100 text-green-800",
  client: "bg-purple-100 text-purple-800",
  brief: "bg-orange-100 text-orange-800",
}

export function AdminDashboardSearch({ className, onResultClick }: AdminDashboardSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const performSearch = async (searchQuery: string, type: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=${type}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data.results || [])
      }
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim().length >= 2) {
      performSearch(searchQuery, selectedType)
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    if (query.trim().length >= 2) {
      performSearch(query, type)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result)
    } else {
      // Default navigation based on result type
      switch (result.type) {
        case 'organization':
          router.push(`/admin/organizations/${result.id}`)
          break
        case 'manager':
          router.push(`/admin/users/${result.id}`)
          break
        case 'client':
          router.push(`/admin/users/${result.id}`)
          break
        case 'brief':
          router.push(`/admin/briefs/${result.id}`)
          break
      }
    }
    setShowResults(false)
    setQuery("")
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search organizations, managers, clients, briefs..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowResults(true)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters && "bg-gray-100")}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-2 flex flex-wrap gap-2">
          {searchTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleTypeChange(type.id)}
              className="text-xs"
            >
              {type.label}
            </Button>
          ))}
        </div>
      )}

      {/* Search Results */}
      {showResults && (query.length >= 2 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {result.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={result.avatar} />
                          <AvatarFallback>
                            {result.displayName?.charAt(0)?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                          {typeIcons[result.type]}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {result.displayName}
                        </p>
                        <Badge variant="secondary" className={cn("text-xs", typeColors[result.type])}>
                          {result.type}
                        </Badge>
                        {result.status && (
                          <Badge variant="outline" className="text-xs">
                            {result.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  )
} 