'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { setReviewStatus, deleteReview } from '@/lib/actions'

interface Review {
  _id: string
  name: string
  position: string
  rating: number
  review: string
  email?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  ip?: string
  userAgent?: string
}

export default function AdminDashboardClient() {
  const searchParams = useSearchParams()
  const providedToken = searchParams.get('token')

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Check authorization + load data
  useEffect(() => {
    const token = providedToken

    const authorized = !!token
    setIsAuthorized(authorized)

    if (!authorized) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const [messagesRes, reviewsRes] = await Promise.all([
          fetch(`/api/admin/messages?token=${token}`),
          fetch(`/api/admin/reviews?token=${token}`),
        ])

        if (messagesRes.ok) {
          const msgData = await messagesRes.json()
          setMessages(msgData)
        }

        if (reviewsRes.ok) {
          const revData = await reviewsRes.json()
          setReviews(revData)
        }
      } catch (error) {
        console.error('Failed to load admin data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [providedToken])

  const pendingReviews = reviews.filter((r) => r.status === 'PENDING')
  const approvedReviews = reviews.filter((r) => r.status === 'APPROVED')
  const otherReviews = reviews.filter(
    (r) => r.status !== 'PENDING' && r.status !== 'APPROVED'
  )

  const handleReviewAction = async (id: string, action: 'approve' | 'reject' | 'delete') => {
    if (!providedToken) return

    setActionLoading(id)

    let success = false

    if (action === 'approve') {
      const res = await setReviewStatus(id, 'APPROVED', providedToken)
      success = res.success
    } else if (action === 'reject') {
      const res = await setReviewStatus(id, 'REJECTED', providedToken)
      success = res.success
    } else if (action === 'delete') {
      const res = await deleteReview(id, providedToken)
      success = res.success
    }

    if (success) {
      const token = providedToken
      try {
        const res = await fetch(`/api/admin/reviews?token=${token}`)
        if (res.ok) {
          const data = await res.json()
          setReviews(data)
        }
      } catch (e) {
        console.error(e)
      }
    }

    setActionLoading(null)
  }

  const StarRow = ({ rating }: { rating: number }) => (
    <div className="flex text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'fill-current' : ''}>
          ★
        </span>
      ))}
      <span className="ml-2 text-xs text-muted-foreground">({rating}/5)</span>
    </div>
  )

  // Unauthorized view
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-background px-6 py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl border border-border bg-card p-8 text-center">
            <h1 className="font-heading text-2xl font-semibold">Admin Access</h1>
            <p className="mt-3 text-muted-foreground">
              This page is protected. Add <code className="rounded bg-muted px-1.5 py-0.5">?token=YOUR_TOKEN</code> to the URL.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Make sure <span className="font-mono">ADMIN_TOKEN</span> is set in your .env
            </p>
            <Link href="/" className="mt-6 inline-block text-sm text-primary hover:underline">
              ← Back to portfolio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage contact messages and client reviews</p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            ← Back to Portfolio
          </Link>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-muted-foreground">Loading data...</div>
          </div>
        ) : (
          <>
            {/* CLIENT REVIEWS SECTION */}
            <div className="mb-12">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-semibold">Client Reviews &amp; Ratings</h2>
                  <p className="text-sm text-muted-foreground">
                    {pendingReviews.length} pending • {approvedReviews.length} approved
                  </p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="rounded-3xl border border-border bg-card p-10 text-center">
                  <p className="text-muted-foreground">No reviews submitted yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Pending */}
                  {pendingReviews.length > 0 && (
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
                        Pending Approval
                      </div>
                      {pendingReviews.map((review) => (
                        <div key={review._id} className="mb-3 rounded-2xl border border-amber-500/30 bg-card p-6">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-lg">{review.name}</span>
                                <StarRow rating={review.rating} />
                              </div>
                              <div className="text-sm text-secondary">{review.position}</div>
                            </div>
                            <div className="text-right text-xs text-muted-foreground">
                              {format(new Date(review.createdAt), 'dd MMM yyyy, HH:mm')}
                            </div>
                          </div>

                          <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed">{review.review}</p>

                          {review.email && (
                            <a href={`mailto:${review.email}`} className="mt-2 inline-block text-sm text-primary hover:underline">
                              {review.email}
                            </a>
                          )}

                          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                            <button
                              onClick={() => handleReviewAction(review._id, 'approve')}
                              disabled={actionLoading === review._id}
                              className="rounded-full bg-green-600 px-5 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                            >
                              ✓ Approve (show on site)
                            </button>
                            <button
                              onClick={() => handleReviewAction(review._id, 'reject')}
                              disabled={actionLoading === review._id}
                              className="rounded-full border border-border bg-background px-5 py-1.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleReviewAction(review._id, 'delete')}
                              disabled={actionLoading === review._id}
                              className="ml-auto rounded-full px-4 py-1.5 text-sm text-red-500 hover:bg-red-500/10 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Approved */}
                  {approvedReviews.length > 0 && (
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-600">
                        Live on Site
                      </div>
                      {approvedReviews.map((review) => (
                        <div key={review._id} className="mb-3 rounded-2xl border border-green-500/20 bg-card p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold">{review.name}</span>
                                <StarRow rating={review.rating} />
                                <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                                  APPROVED
                                </span>
                              </div>
                              <div className="text-sm text-secondary">{review.position}</div>
                            </div>
                            <button
                              onClick={() => handleReviewAction(review._id, 'delete')}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="mt-3 text-[15px] text-muted-foreground">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Other */}
                  {otherReviews.length > 0 && (
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Rejected / Archived
                      </div>
                      {otherReviews.map((review) => (
                        <div key={review._id} className="mb-3 rounded-2xl border border-border bg-card/60 p-5 opacity-80">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-medium">{review.name}</span> — {review.position}{' '}
                              <span className="text-yellow-500">({review.rating}★)</span>
                            </div>
                            <button
                              onClick={() => handleReviewAction(review._id, 'delete')}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CONTACT MESSAGES */}
            <div>
              <div className="mb-4">
                <h2 className="font-heading text-2xl font-semibold">Contact Messages</h2>
                <p className="text-sm text-muted-foreground">Submissions from the contact form</p>
              </div>

              {messages.length === 0 ? (
                <div className="rounded-3xl border border-border bg-card p-10 text-center">
                  <p className="text-muted-foreground">No contact messages yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg._id} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                        <div>
                          <div className="font-semibold text-lg">{msg.name}</div>
                          <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">
                            {msg.email}
                          </a>
                        </div>
                        <div className="text-right text-xs text-muted-foreground tabular-nums">
                          {format(new Date(msg.createdAt), 'dd MMM yyyy, HH:mm')}
                        </div>
                      </div>

                      <div className="mt-3 text-base font-medium text-foreground">{msg.subject}</div>
                      <div className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-muted-foreground">
                        {msg.message}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-[11px] text-muted-foreground">
                        <span>ID: <span className="font-mono">{msg._id}</span></span>
                        {msg.ip && msg.ip !== 'unknown' && <span>IP: <span className="font-mono">{msg.ip}</span></span>}
                        {msg.userAgent && (
                          <span className="max-w-[280px] truncate" title={msg.userAgent}>
                            UA: {msg.userAgent.slice(0, 55)}…
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 text-center text-xs text-muted-foreground">
              Total reviews: {reviews.length} • Messages: {messages.length}
              <br />
              Powered by Next.js + Prisma (PostgreSQL)
            </div>
          </>
        )}
      </div>
    </div>
  )
}
