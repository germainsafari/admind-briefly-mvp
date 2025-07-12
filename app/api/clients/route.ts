import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      skip,
      take: limit,
      orderBy: { id: 'asc' },
      include: { organization: { select: { name: true } } },
    }),
    prisma.client.count(),
  ]);
  const result = clients.map(c => ({ ...c, organization_name: c.organization?.name || null }));
  return NextResponse.json({ data: result, total });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, jobTitle, email, organization, avatar } = data;
    if (!name || !email || !organization) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Get the creating manager's ID from headers
    const creatingManagerId = req.headers.get('x-manager-id');
    
    const client = await prisma.client.create({
      data: {
        name,
        title: jobTitle || '',
        email,
        organization: { connect: { id: Number(organization) } },
        avatar: avatar || null,
      },
      include: { organization: { select: { name: true } } },
    });
    
    // Flatten organization_name for compatibility
    const result = { ...client, organization_name: client.organization?.name || null };

    // Send notifications
    const { NotificationService } = await import('@/lib/notification-service');
    await NotificationService.handleClientCreated(client, creatingManagerId ? Number(creatingManagerId) : undefined);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client', details: (error as any)?.message }, { status: 500 });
  }
} 