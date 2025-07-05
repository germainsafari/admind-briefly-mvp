import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const [organizations, managers, clients, briefs] = await Promise.all([
      prisma.organization.count(),
      prisma.manager.count({ where: { role: 'manager' } }),
      prisma.client.count(),
      prisma.brief.count(),
    ]);
    return NextResponse.json({ organizations, managers, clients, briefs });
  } catch (err) {
    console.error('Error fetching dashboard counts:', err);
    return NextResponse.json({ error: 'Failed to fetch dashboard counts.' }, { status: 500 });
  }
} 