import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const briefs = await prisma.brief.findMany({
    orderBy: { id: 'desc' },
    include: {
      creator: { select: { id: true, name: true, avatar: true, email: true } },
      client: { select: { id: true, name: true, avatar: true, email: true } },
      organization: { select: { id: true, name: true } },
    },
  });

  // Map to frontend-friendly format with all fields
  const mapped = briefs.map(brief => {
    const createdAt = new Date(brief.created_at);
    const now = new Date();
    const daysDiff = (now - createdAt) / (1000 * 60 * 60 * 24);
    let status = null;
    if (daysDiff < 3) status = 'New';

    return {
      id: brief.id,
      project_name: brief.project_name,
      project_type: brief.project_type,
      status,
      creator: brief.creator ? {
        id: brief.creator.id,
        name: brief.creator.name,
        avatar: brief.creator.avatar,
        email: brief.creator.email,
      } : null,
      manager: brief.creator ? {
        id: brief.creator.id,
        name: brief.creator.name,
        avatar: brief.creator.avatar,
        email: brief.creator.email,
      } : null,
      client: brief.client ? {
        id: brief.client.id,
        name: brief.client.name,
        avatar: brief.client.avatar,
        email: brief.client.email,
      } : null,
      date: brief.created_at,
      organization: brief.organization,
      project_description: brief.project_description,
      business_goals: brief.business_goals,
      communication_goals: brief.communication_goals,
      project_kpi: brief.project_kpi,
      challenge: brief.challenge,
      timeline_expectations: brief.timeline_expectations,
      project_budget: brief.project_budget,
      agency_scope: brief.agency_scope,
      mandatories: brief.mandatories,
      technical_requirements: brief.technical_requirements,
      target_audience: brief.target_audience,
      internal_stakeholders: brief.internal_stakeholders,
      consumer_insight: brief.consumer_insight,
      rtb_features: brief.rtb_features,
      key_message: brief.key_message,
      value_proposition: brief.value_proposition,
      tone_of_voice: brief.tone_of_voice,
      market_competition: brief.market_competition,
      inspirations: brief.inspirations,
      past_communication: brief.past_communication,
      touchpoints: brief.touchpoints,
      final_notes: brief.final_notes,
      links: brief.links,
      attachments: brief.attachments,
      progress: brief.progress,
    };
  });

  return NextResponse.json(mapped);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log('BRIEF PAYLOAD:', data);
  if (data.project_k_p_i && !data.project_kpi) {
    data.project_kpi = data.project_k_p_i;
    delete data.project_k_p_i;
  }
  try {
    // Handle organization_id - could be numeric ID or organization name
    let orgId: number;
    if (typeof data.organization_id === 'string' && isNaN(Number(data.organization_id))) {
      // It's an organization name, look it up or create it
      let organization = await prisma.organization.findFirst({
        where: { name: data.organization_id }
      });
      if (!organization) {
        // Create the organization if it doesn't exist
        organization = await prisma.organization.create({
          data: { name: data.organization_id }
        });
      }
      orgId = organization.id;
    } else {
      // It's a numeric ID
      orgId = parseInt(data.organization_id, 10);
      if (Number.isNaN(orgId)) {
        throw new Error('organization_id must be numeric or a valid organization name');
      }
    }

    // Handle client_id
    const clientId = data.client_id !== undefined ? parseInt(data.client_id, 10) : undefined;
    if (data.client_id !== undefined && Number.isNaN(clientId)) {
      throw new Error('client_id must be numeric');
    }
    // Validate client existence if clientId is provided
    if (clientId !== undefined) {
      const clientExists = await prisma.client.findUnique({ where: { id: clientId } });
      if (!clientExists) {
        return NextResponse.json({ error: 'Client not found for provided client_id' }, { status: 400 });
      }
    }

    // Remove raw IDs from data
    delete data.organization_id;
    delete data.client_id;

    // Coerce numbers if present
    if (data.timeline_expectations !== undefined) {
      data.timeline_expectations = String(data.timeline_expectations);
    }
    if (data.project_budget !== undefined) {
      data.project_budget = String(data.project_budget);
    }

    // Filter out empty links
    if (Array.isArray(data.links)) {
      data.links = data.links.filter((l: string) => l && l.length > 0);
    }

    // Build Prisma data object
    const prismaData: any = {
      ...data,
      organization: { connect: { id: orgId } },
      attachments: data.attachments || [],
      links: data.links || [],
    };
    if (clientId !== undefined) {
      prismaData.client = { connect: { id: clientId } };
    }

    const brief = await prisma.brief.create({ data: prismaData });
    return NextResponse.json(brief);
  } catch (err) {
    console.error('PRISMA ERROR:', err);
    return NextResponse.json({ error: 'Failed to create brief', details: (err as any).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...fields } = data;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const brief = await prisma.brief.update({ where: { id }, data: fields });
  return NextResponse.json(brief);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.brief.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 