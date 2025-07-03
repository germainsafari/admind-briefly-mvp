import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const briefs = await prisma.brief.findMany({
    orderBy: { id: 'desc' },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      client: { select: { id: true, name: true, email: true } },
      organization: { select: { id: true, name: true } },
    },
  });
  return NextResponse.json(briefs);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log('BRIEF PAYLOAD:', data);
  if (data.project_k_p_i && !data.project_kpi) {
    data.project_kpi = data.project_k_p_i;
    delete data.project_k_p_i;
  }
  try {
    const brief = await prisma.brief.create({ data });
    return NextResponse.json(brief);
  } catch (err) {
    console.error('PRISMA ERROR:', err);
    return NextResponse.json({ error: 'Failed to create brief', details: (err as any).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...fields } = data;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const brief = await prisma.brief.update({ where: { id }, data: fields });
  return NextResponse.json(brief);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.brief.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 