import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  // Only return users with role 'manager'
  const managers = await prisma.manager.findMany({
    where: { role: 'manager' },
    orderBy: { id: 'asc' },
    include: { organization: { select: { name: true } } },
  });
  // Flatten organization_name for compatibility
  const result = managers.map(m => ({ ...m, organization_name: m.organization?.name || null }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name || !data.email || !data.organization) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    // Find organization by id or name
    let org = null;
    if (!isNaN(Number(data.organization))) {
      org = await prisma.organization.findFirst({ where: { id: Number(data.organization) } });
    }
    if (!org) {
      org = await prisma.organization.findFirst({ where: { name: data.organization } });
    }
    if (!org) {
      return NextResponse.json({ error: 'Organization not found.' }, { status: 400 });
    }
    // Always set role to 'manager', ignore any role sent from frontend
    const manager = await prisma.manager.create({
      data: {
        name: data.name,
        title: data.jobTitle,
        email: data.email,
        avatar: data.avatar,
        organization_id: org.id,
        role: 'manager', // Enforce role
        // Add phone if your schema supports it
      }
    });
    return NextResponse.json(manager, { status: 201 });
  } catch (err) {
    console.error('Error creating manager:', err);
    return NextResponse.json({ error: 'Failed to create manager.' }, { status: 500 });
  }
} 