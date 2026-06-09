import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function isAuthorized(req: NextRequest) {
  const token =
    req.nextUrl.searchParams.get('token') ||
    req.headers.get('x-admin-token') ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!ADMIN_TOKEN) {
    // Dev fallback only
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ ADMIN_TOKEN not set — allowing admin access (dev only)');
      return true;
    }
    return false;
  }

  return token === ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json(messages.map((m) => ({
      _id: m.id.toString(),
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      createdAt: m.createdAt.toISOString(),
      ip: m.ip,
      userAgent: m.userAgent,
    })));
  } catch (error) {
    console.error('Admin messages error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch messages' }, { status: 500 });
  }
}
