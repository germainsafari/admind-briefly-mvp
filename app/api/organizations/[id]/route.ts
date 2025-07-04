import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Organization id is required.' }, { status: 400 });
  }
  let org = null;
  if (!isNaN(Number(id))) {
    org = await prisma.organization.findUnique({
      where: { id: Number(id) },
      include: { clients: true, managers: true },
    });
  }
  if (!org) {
    org = await prisma.organization.findUnique({
      where: { id: id },
      include: { clients: true, managers: true },
    });
  }
  if (!org) {
    return NextResponse.json({ error: 'Organization not found.' }, { status: 404 });
  }
  return NextResponse.json({
    ...org,
    clientsCount: org.clients.length,
    members: org.managers,
  });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Organization id is required.' }, { status: 400 });
  }
  let updated;
  try {
    updated = await prisma.organization.update({
      where: { id: isNaN(Number(id)) ? id : Number(id) },
      data,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Organization not found.' }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Organization id is required.' }, { status: 400 });
  }
  let deleted;
  try {
    deleted = await prisma.organization.delete({
      where: { id: isNaN(Number(id)) ? id : Number(id) }
    });
  } catch (e) {
    return NextResponse.json({ error: 'Organization not found.' }, { status: 404 });
  }
  return NextResponse.json({ success: true, deleted });
} 