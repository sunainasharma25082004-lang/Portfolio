'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiX, FiSend, FiCheckCircle } from 'react-icons/fi'
import { submitReview, type SubmitReviewResult } from '@/lib/actions'

interface ClientReviewFormProps {
  triggerLabel?: string
  className?: string
}

export function ClientReviewForm({ triggerLabel = "Share your experience", className = "" }: ClientReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [form, setForm] = useState({ name: '', position: '', review: '', email: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const open = () => {
    setIsOpen(true)
    setStatus('idle')
    setServerMessage('')
    setErrors({})
  }

  const close = () => {
    setIsOpen(false)
    // Reset after close animation
    setTimeout(() => {
      setForm({ name: '', position: '', review: '', email: '' })
      setRating(5)
      setStatus('idle')
      setServerMessage('')
      setErrors({})
    }, 200)
  }

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.position.trim()) nextErrors.position = 'Position / company is required'
    if (!form.review.trim() || form.review.trim().length < 15) nextErrors.review = 'Please write a short review (min 15 chars)'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')

    const fd = new FormData()
    fd.append('name', form.name.trim())
    fd.append('position', form.position.trim())
    fd.append('rating', String(rating))
    fd.append('review', form.review.trim())
    if (form.email.trim()) fd.append('email', form.email.trim())
    fd.append('website', '') // honeypot

    const result: SubmitReviewResult = await submitReview(fd)

    if (result.success) {
      setStatus('success')
      setServerMessage(result.message)
      setTimeout(() => {
        close()
      }, 2200)
    } else {
      setStatus('error')
      setServerMessage(result.message)
      if (result.errors) setErrors(result.errors)
      setTimeout(() => setStatus('idle'), 2400)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <>
      <button
        onClick={open}
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary ${className}`}
      >
        <FiStar size={16} />
        {triggerLabel}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={close}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg rounded-3xl border border-border bg-card p-5 shadow-xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-semibold">Leave a Review</h3>
                  <p className="text-sm text-muted-foreground">Your feedback helps others know what it&apos;s like to work with me.</p>
                </div>
                <button onClick={close} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <FiX size={20} />
                </button>
              </div>

              {status === 'success' ? (
                <div className="mt-8 flex flex-col items-center py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <FiCheckCircle size={36} />
                  </div>
                  <p className="text-lg font-medium">{serverMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Rating Stars */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Your Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const filled = (hoverRating || rating) >= star
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="rounded p-1 transition hover:scale-110"
                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          >
                            <FiStar
                              size={28}
                              className={filled ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                            />
                          </button>
                        )
                      })}
                      <span className="ml-3 text-sm font-medium text-muted-foreground">{rating} / 5</span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Your Name</label>
                      <input
                        type="text"
                        placeholder="Priya Patel"
                        className={inputClass}
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Position / Company</label>
                      <input
                        type="text"
                        placeholder="Founder, Acme Labs"
                        className={inputClass}
                        value={form.position}
                        onChange={(e) => updateField('position', e.target.value)}
                      />
                      {errors.position && <p className="mt-1 text-xs text-red-400">{errors.position}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Your Review</label>
                    <textarea
                      rows={4}
                      placeholder="Aarav delivered exceptional work. Communication was clear and the final product exceeded our expectations..."
                      className={`${inputClass} resize-y`}
                      value={form.review}
                      onChange={(e) => updateField('review', e.target.value)}
                    />
                    {errors.review && <p className="mt-1 text-xs text-red-400">{errors.review}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Email <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">Only used if I need to follow up.</p>
                  </div>

                  {/* Honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                  <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:px-5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70 sm:w-auto"
                    >
                      {status === 'loading' ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <FiSend size={16} /> Submit Review
                        </>
                      )}
                    </button>
                  </div>

                  {status === 'error' && serverMessage && (
                    <p className="text-center text-sm text-red-500">{serverMessage}</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
