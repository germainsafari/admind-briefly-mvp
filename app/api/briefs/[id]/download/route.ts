import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

function wrapText(text: string, maxWidth: number, font: any, fontSize: number) {
  if (!text) return [''];
  
  // Clean the text by replacing newlines with spaces and removing extra whitespace
  const cleanText = text.replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\s+/g, ' ').trim();
  
  const words = cleanText.split(' ');
  let lines = [];
  let currentLine = '';
  for (let word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const brief = await prisma.brief.findUnique({
    where: { id: Number(id) },
    include: {
      client: { select: { name: true, email: true } },
      organization: { select: { name: true } },
    },
  });
  if (!brief) {
    return NextResponse.json({ error: 'Brief not found' }, { status: 404 });
  }

  // Create PDF
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  let y = 780;
  const lineHeight = 18;
  const margin = 50;
  const maxWidth = 500;
  const section = (title: string) => {
    if (y < 60) { page = pdfDoc.addPage([600, 800]); y = 780; }
    page.drawText(title, { x: margin, y, size: 14, font: fontBold, color: rgb(0.1,0.1,0.5) });
    y -= lineHeight;
  };
  const drawField = (label: string, value: any) => {
    if (y < 40) { page = pdfDoc.addPage([600, 800]); y = 780; }
    page.drawText(label + ':', { x: margin, y, size: 12, font: fontBold });
    y -= lineHeight;
    if (value) {
      const lines = wrapText(String(value), maxWidth, font, 12);
      for (let line of lines) {
        if (y < 40) { page = pdfDoc.addPage([600, 800]); y = 780; }
        page.drawText(line, { x: margin + 20, y, size: 12, font });
        y -= lineHeight;
      }
    } else {
      page.drawText('-', { x: margin + 20, y, size: 12, font });
      y -= lineHeight;
    }
  };

  // Title
  page.drawText('Brief Summary', { x: margin, y, size: 18, font: fontBold });
  y -= lineHeight * 2;

  // Project Overview
  section('Project Overview');
  drawField('Project Name', brief.project_name);
  drawField('Project Type', brief.project_type);
  drawField('Project Description', brief.project_description);
  drawField('Business Goals', brief.business_goals);
  drawField('Communication Goals', brief.communication_goals);
  drawField('Project KPI', brief.project_kpi);
  drawField('Challenge', brief.challenge);
  drawField('Timeline Expectations', brief.timeline_expectations);
  drawField('Project Budget', brief.project_budget);

  // Scope & Requirements
  section('Scope & Requirements');
  drawField('Agency Scope', brief.agency_scope);
  drawField('Mandatories', brief.mandatories);
  drawField('Technical Requirements', brief.technical_requirements);

  // Audience & Insights
  section('Audience & Insights');
  drawField('Target Audience', brief.target_audience);
  drawField('Internal Stakeholders', brief.internal_stakeholders);
  drawField('Consumer Insight', brief.consumer_insight);
  drawField('RTB Features', brief.rtb_features);

  // Strategic Input
  section('Strategic Input');
  drawField('Key Message', brief.key_message);
  drawField('Value Proposition', brief.value_proposition);
  drawField('Tone of Voice', brief.tone_of_voice);
  drawField('Market Competition', brief.market_competition);

  // References & Context
  section('References & Context');
  drawField('Inspirations', brief.inspirations);
  drawField('Past Communication', brief.past_communication);

  // Channels & Touchpoints
  section('Channels & Touchpoints');
  drawField('Touchpoints', brief.touchpoints);

  // Final Notes & Attachments
  section('Final Notes & Attachments');
  drawField('Final Notes', brief.final_notes);
  drawField('Links', (brief.links || []).join(', '));
  drawField('Attachments', (brief.attachments || []).join(', '));

  // Meta
  section('Meta');
  drawField('Creator', brief.client?.name);
  drawField('Client', brief.client?.name);
  drawField('Organization', brief.organization?.name);
  drawField('Created At', brief.created_at);

  const pdfBytes = await pdfDoc.save();
  return new Response(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=brief-${id}.pdf`,
    },
  });
} 