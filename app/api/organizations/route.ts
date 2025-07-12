import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  const [organizations, total] = await Promise.all([
    prisma.organization.findMany({
      skip,
      take: limit,
      orderBy: { id: 'asc' },
      include: {
        clients: true,
        managers: true,
      },
    }),
    prisma.organization.count(),
  ]);
  const result = organizations.map(org => ({
    ...org,
    clientsCount: org.clients.length,
    members: org.managers,
  }));
  return NextResponse.json({ data: result, total });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
      return NextResponse.json({ error: 'Organization name is required.' }, { status: 400 });
    }
    
    // Get the creating manager's ID from headers or session
    const userRole = req.headers.get('x-user-role');
    const creatingManagerId = userRole === 'admin' ? req.headers.get('x-manager-id') : null;
    
    // Only 'name' is saved for now, as per schema
    const org = await prisma.organization.create({
      data: {
        name: data.name.trim(),
        // ai_support and other fields can be added here if needed
      },
    });

    // Send notifications
    const { NotificationService } = await import('@/lib/notification-service');
    await NotificationService.handleOrganizationCreated(org, creatingManagerId ? Number(creatingManagerId) : undefined);

    return NextResponse.json(org, { status: 201 });
  } catch (err) {
    console.error('Error creating organization:', err);
    return NextResponse.json({ error: 'Failed to create organization.' }, { status: 500 });
  }
} 