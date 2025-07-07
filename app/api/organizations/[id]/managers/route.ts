import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id: orgId } = await params;
  let org;
  if (isNaN(Number(orgId))) {
    org = await prisma.organization.findFirst({ where: { name: orgId } });
  } else {
    org = await prisma.organization.findUnique({ where: { id: Number(orgId) } });
  }
  if (!org) {
    return NextResponse.json([], { status: 200 });
  }
  const managers = await prisma.manager.findMany({
    where: { organization_id: org.id },
    select: { id: true, name: true, avatar: true, email: true }
  });
  return NextResponse.json(managers);
} 