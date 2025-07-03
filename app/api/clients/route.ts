import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const clients = await prisma.client.findMany({
    orderBy: { id: 'asc' },
    include: { organization: { select: { name: true } } },
  });
  // Flatten organization_name for compatibility
  const result = clients.map(c => ({ ...c, organization_name: c.organization?.name || null }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, jobTitle, email, organization, avatar } = data;
    if (!name || !email || !organization) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
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
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client', details: (error as any)?.message }, { status: 500 });
  }
} 