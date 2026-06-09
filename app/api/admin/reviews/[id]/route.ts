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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await req.json();

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    const reviewId = parseInt(id, 10);
    if (isNaN(reviewId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: { status },
    });

    return NextResponse.json({ success: true, review: updated });
  } catch (error) {
    console.error('Update review status error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reviewId = parseInt(id, 10);
    if (isNaN(reviewId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete review' }, { status: 500 });
  }
}
