import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  // Simple admin check using custom header
  const role = req.headers.get('x-user-role');
  if (role && role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await context.params;
  const { status } = await req.json();
  if (!['active', 'deactivated'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const updated = await prisma.client.update({
      where: { id: Number(id) },
      data: { status },
    });
    const action = status === 'active' ? 'reactivated' : 'deactivated';
    return NextResponse.json({
      ...updated,
      message: `Client has been ${action}.`,
      isActive: status === 'active',
      isDeactivated: status === 'deactivated',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Client not found or update failed' }, { status: 404 });
  }
} 