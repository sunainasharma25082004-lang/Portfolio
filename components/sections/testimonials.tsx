'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'
import { ImQuotesLeft } from 'react-icons/im'
import { SectionHeading } from '@/components/section-heading'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { testimonials as staticTestimonials } from '@/lib/data'
import { ClientReviewForm } from '@/components/client-review-form'
import { getApprovedReviews } from '@/lib/actions'

type LiveReview = {
  id: number
  name: string
  position: string
  review: string
  rating: number
}

type DisplayTestimonial = {
  name: string
  position: string
  review: string
  image?: string
  rating?: number
  isLive?: boolean
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [liveReviews, setLiveReviews] = useState<LiveReview[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)

  // Combine static + live approved reviews
  const allTestimonials: DisplayTestimonial[] = [
    ...staticTestimonials.map((t) => ({ ...t, isLive: false })),
    ...liveReviews.map((r) => ({
      name: r.name,
      position: r.position,
      review: r.review,
      rating: r.rating,
      isLive: true,
      // Use placeholder for client-submitted reviews (no photo provided)
      image: '/placeholder-user.jpg',
    })),
  ]

  // Load approved reviews from backend
  useEffect(() => {
    let mounted = true
    getApprovedReviews()
      .then((reviews) => {
        if (mounted) {
          setLiveReviews(reviews as any)
        }
      })
      .catch(() => {
        // fail silently — fall back to static only
      })
      .finally(() => {
        if (mounted) setIsLoadingReviews(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const go = useCallback(
    (next: number) => {
      if (allTestimonials.length === 0) return
      setDir(next > 0 ? 1 : -1)
      setIndex((prev) => (prev + next + allTestimonials.length) % allTestimonials.length)
    },
    [allTestimonials.length]
  )

  useEffect(() => {
    if (allTestimonials.length === 0) return
    const id = setInterval(() => go(1), 6200)
    return () => clearInterval(id)
  }, [go, allTestimonials.length])

  const t = allTestimonials[index] || staticTestimonials[0]

  return (
    <section className="relative bg-card/40 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say"
            description="Trusted by founders and teams to deliver work that exceeds expectations."
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="relative overflow-hidden rounded-3xl border border-border glass p-6 sm:p-10 lg:p-12">
              <ImQuotesLeft className="mb-5 text-primary/40 sm:mb-6" size={32} aria-hidden />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-pretty text-base leading-relaxed text-foreground sm:text-lg">{t.review}</p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border bg-muted">
                      <Image
                        src={t.image || '/placeholder-user.jpg'}
                        alt={t.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">{t.name}</p>
                      <p className="text-sm text-secondary">{t.position}</p>
                    </div>
                  </div>

                  {/* Show rating if available (live reviews) */}
                  {t.rating && (
                    <div className="mt-4 flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} size={16} className={i < t.rating! ? 'fill-current' : ''} />
                      ))}
                      <span className="ml-2 text-xs font-medium text-muted-foreground">{t.rating}/5</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            {allTestimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <FiChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                  {allTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDir(i > index ? 1 : -1)
                        setIndex(i)
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Client Review Submission */}
            <div className="mt-10 flex justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-muted-foreground">Have we worked together?</p>
                <ClientReviewForm triggerLabel="Leave a review" />
                {isLoadingReviews && (
                  <p className="text-[11px] text-muted-foreground">Loading client reviews…</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
