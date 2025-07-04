import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  try {
    const brief = await prisma.brief.findUnique({
      where: { id: Number(id) },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        client: { select: { id: true, name: true, email: true } },
        organization: { select: { id: true, name: true } },
      },
    });
    if (!brief) {
      return NextResponse.json({ error: 'Brief not found' }, { status: 404 });
    }
    return NextResponse.json(brief);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch brief', details: (err as any).message }, { status: 500 });
  }
} 