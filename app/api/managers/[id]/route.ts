import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Manager id is required.' }, { status: 400 });
  }
  let manager = null;
  if (!isNaN(Number(id))) {
    manager = await prisma.manager.findUnique({
      where: { id: Number(id) },
    });
  }
  if (!manager) {
    manager = await prisma.manager.findUnique({
      where: { id: id },
    });
  }
  if (!manager) {
    return NextResponse.json({ error: 'Manager not found.' }, { status: 404 });
  }
  return NextResponse.json(manager);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Manager id is required.' }, { status: 400 });
  }
  let updated;
  try {
    updated = await prisma.manager.update({
      where: { id: isNaN(Number(id)) ? id : Number(id) },
      data,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Manager not found.' }, { status: 404 });
  }
  return NextResponse.json(updated);
} 