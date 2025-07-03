import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const organizations = await prisma.organization.findMany({
    orderBy: { id: 'asc' },
    include: {
      clients: true,
      managers: true,
    },
  });
  const result = organizations.map(org => ({
    ...org,
    clientsCount: org.clients.length,
    members: org.managers,
  }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
      return NextResponse.json({ error: 'Organization name is required.' }, { status: 400 });
    }
    // Only 'name' is saved for now, as per schema
    const org = await prisma.organization.create({
      data: {
        name: data.name.trim(),
        // ai_support and other fields can be added here if needed
      },
    });
    return NextResponse.json(org, { status: 201 });
  } catch (err) {
    console.error('Error creating organization:', err);
    return NextResponse.json({ error: 'Failed to create organization.' }, { status: 500 });
  }
} 