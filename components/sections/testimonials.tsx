'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar, FiCheckCircle } from 'react-icons/fi'
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
      image: '/placeholder-user.jpg',
    })),
  ]

  useEffect(() => {
    let mounted = true
    getApprovedReviews()
      .then((reviews) => {
        if (mounted) {
          setLiveReviews(reviews as any)
        }
      })
      .catch(() => {})
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
    const id = setInterval(() => go(1), 6500)
    return () => clearInterval(id)
  }, [go, allTestimonials.length])

  const t = allTestimonials[index] || staticTestimonials[0]

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/3 bottom-0 -z-10 h-80 w-80 rounded-full bg-purple-500/10 blur-[130px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Client Testimonials"
            title="What Clients &amp; Employers Say"
            description="Trusted by product managers, agency founders, and business owners to engineer reliable software."
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 glass-card p-6 sm:p-10 lg:p-12 shadow-2xl">
              <ImQuotesLeft className="mb-5 text-indigo-400/50 sm:mb-6" size={36} aria-hidden />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-pretty text-base leading-relaxed text-slate-200 sm:text-lg font-medium">
                    &quot;{t.review}&quot;
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-indigo-500/40 bg-slate-900 shadow-md">
                        <Image
                          src={t.image || '/placeholder-user.jpg'}
                          alt={t.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-heading font-black text-white text-base">{t.name}</p>
                        <p className="text-xs font-bold text-emerald-400">{t.position}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} size={16} className={i < (t.rating || 5) ? 'fill-current' : 'text-slate-600'} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            {allTestimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900/90 text-white transition-all hover:border-emerald-400 hover:text-emerald-400 hover:scale-105 active:scale-95"
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
                      className={`h-2.5 rounded-full transition-all ${
                        i === index ? 'w-8 bg-emerald-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900/90 text-white transition-all hover:border-emerald-400 hover:text-emerald-400 hover:scale-105 active:scale-95"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Client Review Submission */}
            <div className="mt-10 flex justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-xs text-slate-400 font-medium">Worked with Sunaina? Share your experience:</p>
                <ClientReviewForm triggerLabel="Leave a Verified Review" />
                {isLoadingReviews && (
                  <p className="text-[11px] text-slate-500">Loading client reviews…</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
