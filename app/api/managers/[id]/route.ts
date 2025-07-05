import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Manager id is required.' }, { status: 400 });
  }
  const manager = await prisma.manager.findUnique({
    where: { id: Number(id) },
  });
  if (!manager) {
    return NextResponse.json({ error: 'Manager not found.' }, { status: 404 });
  }
  return NextResponse.json(manager);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Manager id is required.' }, { status: 400 });
  }
  // Only include organization_id if provided and not empty/null
  const updateData: any = { ...data };
  if (typeof updateData.organization === 'undefined' || updateData.organization === null || updateData.organization === "") {
    delete updateData.organization;
    delete updateData.organization_id;
  } else {
    updateData.organization_id = Number(updateData.organization);
    delete updateData.organization;
  }
  let updated;
  try {
    updated = await prisma.manager.update({
      where: { id: Number(id) },
      data: updateData,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Manager not found.' }, { status: 404 });
  }
  return NextResponse.json(updated);
} 