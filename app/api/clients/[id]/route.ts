import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Client id is required.' }, { status: 400 });
  }
  const client = await prisma.client.findUnique({
    where: { id: Number(id) },
  });
  if (!client) {
    return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
  }
  return NextResponse.json(client);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Client id is required.' }, { status: 400 });
  }
  let updated;
  try {
    updated = await prisma.client.update({
      where: { id: Number(id) },
      data,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
  }
  return NextResponse.json(updated);
} 