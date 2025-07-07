"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import JSZip from 'jszip'

interface DownloadBriefModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brief: any | null
}

export function DownloadBriefModal({ open, onOpenChange, brief }: DownloadBriefModalProps) {
  const [downloadSummary, setDownloadSummary] = useState(true)
  const [downloadAttachments, setDownloadAttachments] = useState(false)

  const handleDownload = async () => {
    if (!brief) return;
    // --- PDF GENERATION ---
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let y = height - 40;
    const left = 40;
    const lineHeight = 20;
    const drawText = (label: string, value: string | undefined, opts = {}) => {
      if (!value) return;
      page.drawText(label, { x: left, y, size: 12, font, color: rgb(0.2,0.2,0.2), ...opts });
      y -= lineHeight;
      page.drawText(value, { x: left + 120, y, size: 12, font, color: rgb(0,0,0), ...opts });
      y -= lineHeight + 4;
    };
    // Title
    page.drawText('Brief Summary', { x: left, y, size: 20, font, color: rgb(0.1,0.1,0.5) });
    y -= 2 * lineHeight;
    drawText('Project Title:', brief.project_name || brief.projectName || 'N/A');
    drawText('Project Type:', brief.project_type || brief.type || 'N/A');
    drawText('Project Description:', brief.project_description || 'N/A');
    drawText('Timeline:', brief.timeline_expectations || 'N/A');
    drawText('Status:', brief.status || 'N/A');
    drawText('Date of Inquiry:', brief.date ? new Date(brief.date).toLocaleDateString('en-GB') : 'N/A');
    // Managers
    if (Array.isArray(brief.managers) && brief.managers.length > 0) {
      page.drawText('Managers:', { x: left, y, size: 12, font, color: rgb(0.2,0.2,0.2) });
      y -= lineHeight;
      brief.managers.forEach((m: any) => {
        page.drawText(`- ${m.name || m.email}`, { x: left + 120, y, size: 12, font, color: rgb(0,0,0) });
        y -= lineHeight;
      });
      y -= 4;
    }
    // Add all other fields
    const fields = [
      ['Business Goals:', brief.business_goals],
      ['Communication Goals:', brief.communication_goals],
      ['Project KPI:', brief.project_kpi],
      ['Challenge:', brief.challenge],
      ['Agency Scope:', brief.agency_scope],
      ['Mandatories:', brief.mandatories],
      ['Technical Requirements:', brief.technical_requirements],
      ['Target Audience:', brief.target_audience],
      ['Internal Stakeholders:', brief.internal_stakeholders],
      ['Consumer Insight:', brief.consumer_insight],
      ['RTB Features:', brief.rtb_features],
      ['Key Message:', brief.key_message],
      ['Value Proposition:', brief.value_proposition],
      ['Tone of Voice:', brief.tone_of_voice],
      ['Market Competition:', brief.market_competition],
      ['Inspirations:', brief.inspirations],
      ['Past Communication:', brief.past_communication],
      ['Touchpoints:', brief.touchpoints],
      ['Links:', brief.links],
      ['Final Notes:', brief.final_notes],
    ];
    for (const [label, value] of fields) {
      if (!value) continue;
      if (Array.isArray(value)) {
        page.drawText(label, { x: left, y, size: 12, font, color: rgb(0.2,0.2,0.2) });
        y -= lineHeight;
        value.forEach((v: string) => {
          page.drawText(`- ${v}`, { x: left + 120, y, size: 12, font, color: rgb(0,0,0) });
          y -= lineHeight;
        });
        y -= 4;
      } else {
        drawText(label, String(value));
      }
    }
    // --- PDF BYTES ---
    const pdfBytes = await pdfDoc.save();
    // --- ATTACHMENTS ---
    if (downloadAttachments && Array.isArray(brief.attachments) && brief.attachments.length > 0) {
      const zip = new JSZip();
      zip.file(`${brief.project_name || 'brief'}-summary.pdf`, pdfBytes);
      // Download each attachment and add to zip
      for (const att of brief.attachments) {
        try {
          // If att is an object with url or name, adjust accordingly
          const url = typeof att === 'string' ? att : att.url;
          const name = typeof att === 'string' ? att.split('/').pop() : att.name || att.url.split('/').pop();
          const res = await fetch(url);
          const blob = await res.blob();
          zip.file(name, blob);
        } catch (e) {
          // skip failed downloads
        }
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${brief.project_name || 'brief'}-attachments.zip`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      onOpenChange(false);
      return;
    }
    // --- PDF ONLY ---
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brief.project_name || 'brief'}-summary.pdf`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        aria-labelledby="download-brief-title"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle id="download-brief-title" className="text-xl">
            Download brief{brief ? '' : ' (loading...)'}
          </DialogTitle>
          <p id="download-brief-desc" className="text-gray-600 mt-2">Choose your download options for this brief.</p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Download Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox id="summary" checked={downloadSummary} onCheckedChange={v => setDownloadSummary(!!v)} />
              <Label htmlFor="summary" className="flex-1">
                Download brief summary as PDF - 2MB
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="attachments" checked={downloadAttachments} onCheckedChange={v => setDownloadAttachments(!!v)} />
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
