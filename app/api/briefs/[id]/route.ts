import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const id = params.id;
  console.log('Fetching brief with id:', id);
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  try {
    let brief = await prisma.brief.findUnique({
      where: { id: Number(id) },
      include: {
        client: { select: { id: true, name: true, email: true } },
        organization: { select: { id: true, name: true } },
        managers: { select: { id: true, name: true, avatar: true, email: true } },
      },
    });
    // Fallback: try as string if not found and id is not a number
    if (!brief && isNaN(Number(id))) {
      brief = await prisma.brief.findUnique({
        where: { id: id as any },
        include: {
          client: { select: { id: true, name: true, email: true } },
          organization: { select: { id: true, name: true } },
          managers: { select: { id: true, name: true, avatar: true, email: true } },
        },
      });
    }
    if (!brief) {
      return NextResponse.json({ error: 'Brief not found' }, { status: 404 });
    }
    return NextResponse.json(brief);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch brief', details: (err as any).message }, { status: 500 });
  }
} 