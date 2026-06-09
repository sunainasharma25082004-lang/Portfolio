import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function isAuthorized(req: NextRequest) {
  const token =
    req.nextUrl.searchParams.get('token') ||
    req.headers.get('x-admin-token') ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!ADMIN_TOKEN) {
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
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json(reviews.map((r) => ({
      _id: r.id.toString(),
      name: r.name,
      position: r.position,
      rating: r.rating,
      review: r.review,
      email: r.email,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
      ip: r.ip,
      userAgent: r.userAgent,
    })));
  } catch (error) {
    console.error('Admin reviews error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch reviews' }, { status: 500 });
  }
}
