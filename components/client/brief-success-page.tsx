"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BriefSuccessPageProps {
  onBackToDashboard: () => void
  brief: any
}

export function BriefSuccessPage({ onBackToDashboard, brief }: BriefSuccessPageProps) {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-text">Success!</h1>
            <div className="space-y-2">
              <p className="text-lg text-text">The brief has been successfully sent to the manager.</p>
              <p className="text-lg text-text">We'll review it and contact you via email shortly.</p>
            </div>
          </div>

          <div className="flex items-start justify-between">
            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium text-text-muted mb-2">Project name</div>
                <div className="text-lg font-semibold text-text">{brief?.project_name || <span className="italic text-gray-400">N/A</span>}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-text-muted mb-2">Project type</div>
                <div className="text-lg font-semibold text-text">{brief?.project_type || <span className="italic text-gray-400">N/A</span>}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-text-muted mb-2">Shared with</div>
                <div className="space-y-3">
                  {Array.isArray(brief?.managers) && brief.managers.length > 0 ? (
                    brief.managers.map((manager: any) => (
                      <div key={manager.id} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={manager.avatar || "/placeholder.svg?height=32&width=32"} />
                          <AvatarFallback>{manager.name ? manager.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : '@'}</AvatarFallback>
                        </Avatar>
                        <span className="text-text">{manager.name || manager.email}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs text-text">@</span>
                      </div>
                      <span className="text-text italic text-gray-400">No manager info</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Success Illustration */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                {/* Hand illustration */}
                <div className="w-80 h-60 relative">
                  <svg viewBox="0 0 320 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Thumb up hand illustration */}
                    <path
                      d="M80 120C80 120 90 100 110 100C130 100 140 110 150 120L180 140C190 145 200 150 210 160C220 170 225 180 220 190C215 200 200 205 180 200L120 180C100 175 85 165 80 150V120Z"
                      fill="#FF6700"
                      stroke="#E55A00"
                      strokeWidth="2"
                    />
                    {/* Thumb */}
                    <path
                      d="M110 100C110 90 115 80 125 75C135 70 145 75 150 85C155 95 150 105 140 110L130 115L110 100Z"
                      fill="#FF6700"
                      stroke="#E55A00"
                      strokeWidth="2"
                    />
                    {/* Fingers */}
                    <path
                      d="M150 120L160 110C165 105 175 105 180 110C185 115 185 125 180 130L170 140"
                      fill="#FF6700"
                      stroke="#E55A00"
                      strokeWidth="2"
                    />
                    <path
                      d="M170 140L180 130C185 125 195 125 200 130C205 135 205 145 200 150L190 160"
                      fill="#FF6700"
                      stroke="#E55A00"
                      strokeWidth="2"
                    />
                    <path
                      d="M190 160L200 150C205 145 215 145 220 150C225 155 225 165 220 170L210 180"
                      fill="#FF6700"
                      stroke="#E55A00"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Avatar on thumb */}
                  <div className="absolute top-16 left-28">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-lg">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-blue-500 text-white">U</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Back to Dashboard Button */}
          <div className="flex justify-end pt-8">
            <Button
              onClick={onBackToDashboard}
              className="accent-bg hover:accent-light-bg hover:text-accent-orange text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
