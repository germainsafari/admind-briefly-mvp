import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  const [briefs, total] = await Promise.all([
    prisma.brief.findMany({
      skip,
      take: limit,
      orderBy: { id: 'desc' },
      include: {
        client: { select: { id: true, name: true, avatar: true, email: true } },
        managers: { select: { id: true, name: true, avatar: true, email: true } },
        organization: { select: { id: true, name: true } },
      },
    }),
    prisma.brief.count(),
  ]);

  // Map to frontend-friendly format with all fields
  const mapped = briefs.map(brief => {
    const createdAt = new Date(brief.created_at);
    const now = new Date();
    const daysDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    let status = null;
    if (daysDiff < 3) status = 'New';

    return {
      id: brief.id,
      project_name: brief.project_name,
      project_type: brief.project_type,
      status,
      creator: brief.client ? {
        id: brief.client.id,
        name: brief.client.name,
        avatar: brief.client.avatar,
        email: brief.client.email,
      } : null,
      managers: Array.isArray(brief.managers) ? brief.managers.map(m => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar,
        email: m.email,
      })) : [],
      date: brief.created_at,
      updated_at: brief.updated_at,
      sent_at: brief.created_at,
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

  return NextResponse.json({ data: mapped, total });
}

export async function POST(req: NextRequest) {
  // Only allow clients to create briefs
  const userRole = req.headers.get('x-user-role');
  if (userRole !== 'client') {
    return NextResponse.json({ error: 'Only clients can create briefs' }, { status: 403 });
  }

  const data = await req.json();
  if (data.project_k_p_i && !data.project_kpi) {
    data.project_kpi = data.project_k_p_i;
    delete data.project_k_p_i;
  }
  try {
    // Handle organization_id - could be numeric ID or organization name
    let orgId: number;
    if (typeof data.organization_id === 'string' && isNaN(Number(data.organization_id))) {
      let organization = await prisma.organization.findFirst({
        where: { name: data.organization_id }
      });
      if (!organization) {
        organization = await prisma.organization.create({
          data: { name: data.organization_id }
        });
      }
      orgId = organization.id;
    } else {
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
    if (clientId !== undefined) {
      const clientExists = await prisma.client.findUnique({ where: { id: clientId } });
      if (!clientExists) {
        return NextResponse.json({ error: 'Client not found for provided client_id' }, { status: 400 });
      }
    }

    // Remove raw IDs from data before spreading
    delete data.organization_id;
    delete data.client_id;
    delete data.creator_id;
    delete data.manager_id;
    delete data.manager_ids;

    // Build Prisma data object
    const prismaData: any = {
      ...data,
      attachments: data.attachments || [],
      links: data.links || [],
      client: { connect: { id: clientId } },
      organization: { connect: { id: orgId } },
    };
    // Connect managers (many-to-many)
    if (Array.isArray(data.manager_ids) && data.manager_ids.length > 0) {
      prismaData.managers = { connect: data.manager_ids.map((id: any) => ({ id: Number(id) })) };
    }

    // Coerce numbers if present
    if (data.timeline_expectations !== undefined) {
      data.timeline_expectations = String(data.timeline_expectations);
    }
    if (data.project_budget !== undefined) {
      data.project_budget = String(data.project_budget);
    }

    if (Array.isArray(data.links)) {
      data.links = data.links.filter((l: string) => l && l.length > 0);
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