"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Brief {
  id: string
  projectName: string
  type: string
  status: string
  creator: {
    name: string
    avatar: string
  }
  date: string
}

interface DownloadBriefModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brief: Brief | null
}

export function DownloadBriefModal({ open, onOpenChange, brief }: DownloadBriefModalProps) {
  const [downloadSummary, setDownloadSummary] = useState(true)
  const [downloadAttachments, setDownloadAttachments] = useState(false)

  const handleDownload = () => {
    // Handle download logic here
    console.log("Downloading brief:", {
      summary: downloadSummary,
      attachments: downloadAttachments,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        aria-labelledby="download-brief-title"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle id="download-brief-title" className="text-xl">Download brief</DialogTitle>
          <p id="download-brief-desc" className="text-gray-600 mt-2">Choose your download options for this brief.</p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Download Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox id="summary" checked={downloadSummary} onCheckedChange={setDownloadSummary} />
              <Label htmlFor="summary" className="flex-1">
                Download brief summary as PDF - 2MB
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="attachments" checked={downloadAttachments} onCheckedChange={setDownloadAttachments} />
              <Label htmlFor="attachments" className="flex-1">
                Download with attachments - 125MB
              </Label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!downloadSummary && !downloadAttachments}
            className="bg-gray-900 hover:bg-gray-800"
          >
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
