import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: /api/notifications?managerId=1 or ?clientId=2
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const managerId = searchParams.get('managerId');
  const clientId = searchParams.get('clientId');

  if (managerId) {
    const notifications = await prisma.managerNotification.findMany({
      where: { managerId: Number(managerId) },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notifications);
  }
  if (clientId) {
    const notifications = await prisma.clientNotification.findMany({
      where: { clientId: Number(clientId) },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notifications);
  }
  return NextResponse.json({ error: 'Missing managerId or clientId' }, { status: 400 });
}

// POST: create notification for manager or client
export async function POST(req: NextRequest) {
  const { managerId, clientId, message, link } = await req.json();
  if (!message || (!managerId && !clientId)) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (managerId) {
    const notification = await prisma.managerNotification.create({
      data: { managerId: Number(managerId), message, link },
    });
    return NextResponse.json(notification);
  }
  if (clientId) {
    const notification = await prisma.clientNotification.create({
      data: { clientId: Number(clientId), message, link },
    });
    return NextResponse.json(notification);
  }
  return NextResponse.json({ error: 'Missing managerId or clientId' }, { status: 400 });
}

// PATCH: mark notification as read
export async function PATCH(req: NextRequest) {
  const { id, type } = await req.json(); // type: 'manager' or 'client'
  if (!id || !type) {
    return NextResponse.json({ error: 'Missing id or type' }, { status: 400 });
  }
  if (type === 'manager') {
    const notification = await prisma.managerNotification.update({
      where: { id: Number(id) },
      data: { read: true },
    });
    return NextResponse.json(notification);
  }
  if (type === 'client') {
    const notification = await prisma.clientNotification.update({
      where: { id: Number(id) },
      data: { read: true },
    });
    return NextResponse.json(notification);
  }
  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
} 