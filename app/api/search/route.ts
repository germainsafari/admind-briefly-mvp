import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all'; // all, organizations, managers, clients, briefs
  const role = (session.user as any).role;
  const organizationId = (session.user as any).organizationId;

  if (!query.trim()) {
    return NextResponse.json({ results: [], total: 0 });
  }

  try {
    let results: any[] = [];
    let total = 0;

    // Admin can search everything
    if (role === 'admin') {
      if (type === 'all' || type === 'organizations') {
        const orgs = await prisma.organization.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
            ]
          },
          include: {
            _count: {
              select: {
                managers: true,
                clients: true,
                briefs: true
              }
            }
          },
          take: 10
        });
        results.push(...orgs.map(org => ({
          ...org,
          type: 'organization',
          displayName: org.name,
          subtitle: `${org._count.managers} managers, ${org._count.clients} clients, ${org._count.briefs} briefs`
        })));
      }

      if (type === 'all' || type === 'managers') {
        const managers = await prisma.manager.findMany({
          where: {
            role: 'manager',
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { title: { contains: query, mode: 'insensitive' } }
            ]
          },
          include: {
            organization: { select: { name: true } }
          },
          take: 10
        });
        results.push(...managers.map(manager => ({
          ...manager,
          type: 'manager',
          displayName: manager.name,
          subtitle: `${manager.title || 'Manager'} • ${manager.organization?.name || 'No organization'}`
        })));
      }

      if (type === 'all' || type === 'clients') {
        const clients = await prisma.client.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { title: { contains: query, mode: 'insensitive' } }
            ]
          },
          include: {
            organization: { select: { name: true } }
          },
          take: 10
        });
        results.push(...clients.map(client => ({
          ...client,
          type: 'client',
          displayName: client.name,
          subtitle: `${client.title || 'Client'} • ${client.organization?.name || 'No organization'}`
        })));
      }

      if (type === 'all' || type === 'briefs') {
        const briefs = await prisma.brief.findMany({
          where: {
            OR: [
              { project_name: { contains: query, mode: 'insensitive' } },
              { project_description: { contains: query, mode: 'insensitive' } },
              { business_goals: { contains: query, mode: 'insensitive' } }
            ]
          },
          include: {
            client: { select: { name: true } },
            organization: { select: { name: true } }
          },
          take: 10
        });
        results.push(...briefs.map(brief => ({
          ...brief,
          type: 'brief',
          displayName: brief.project_name,
          subtitle: `${brief.client?.name || 'Unknown client'} • ${brief.organization?.name || 'No organization'} • ${brief.status}`
        })));
      }
    }

    // Manager can search clients and briefs in their organization
    else if (role === 'manager') {
      if (!organizationId) {
        return NextResponse.json({ results: [], total: 0 });
      }

      if (type === 'all' || type === 'clients') {
        const clients = await prisma.client.findMany({
          where: {
            organization_id: organizationId,
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { title: { contains: query, mode: 'insensitive' } }
            ]
          },
          include: {
            organization: { select: { name: true } }
          },
          take: 10
        });
        results.push(...clients.map(client => ({
          ...client,
          type: 'client',
          displayName: client.name,
          subtitle: `${client.title || 'Client'} • ${client.organization?.name || 'No organization'}`
        })));
      }

      if (type === 'all' || type === 'briefs') {
        const briefs = await prisma.brief.findMany({
          where: {
            organization_id: organizationId,
            OR: [
              { project_name: { contains: query, mode: 'insensitive' } },
              { project_description: { contains: query, mode: 'insensitive' } },
              { business_goals: { contains: query, mode: 'insensitive' } }
            ]
          },
          include: {
            client: { select: { name: true } },
            organization: { select: { name: true } }
          },
          take: 10
        });
        results.push(...briefs.map(brief => ({
          ...brief,
          type: 'brief',
          displayName: brief.project_name,
          subtitle: `${brief.client?.name || 'Unknown client'} • ${brief.organization?.name || 'No organization'} • ${brief.status}`
        })));
      }
    }

    // Client can only search their own briefs
    else if (role === 'client') {
      if (!organizationId) {
        return NextResponse.json({ results: [], total: 0 });
      }

      if (type === 'all' || type === 'briefs') {
        const briefs = await prisma.brief.findMany({
          where: {
            organization_id: organizationId,
            client_id: (session.user as any).clientId,
            OR: [
              { project_name: { contains: query, mode: 'insensitive' } },
              { project_description: { contains: query, mode: 'insensitive' } },
              { business_goals: { contains: query, mode: 'insensitive' } }
            ]
          },
          include: {
            client: { select: { name: true } },
            organization: { select: { name: true } }
          },
          take: 10
        });
        results.push(...briefs.map(brief => ({
          ...brief,
          type: 'brief',
          displayName: brief.project_name,
          subtitle: `${brief.status} • ${new Date(brief.created_at).toLocaleDateString()}`
        })));
      }
    }

    total = results.length;

    return NextResponse.json({ results, total });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
} 