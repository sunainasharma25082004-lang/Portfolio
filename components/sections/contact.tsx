'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiAlertCircle,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { SectionHeading } from '@/components/section-heading'
import { MagneticButton } from '@/components/magnetic-button'
import { fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/lib/motion'
import { personal } from '@/lib/data'
import { submitContactMessage, type SubmitResult } from '@/lib/actions'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const contactItems: { icon: IconType; label: string; value: string; href: string }[] = [
  { icon: FiMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: FiPhone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
  { icon: FiMapPin, label: 'Location', value: personal.location, href: '#' },
]

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const updateField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) {
      setErrors((er) => {
        const next = { ...er }
        delete next[key]
        return next
      })
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Client-side quick validation
    const nextErrors: FormErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name'
    if (!form.email.trim()) nextErrors.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email'
    if (!form.subject.trim()) nextErrors.subject = 'Please enter a subject'
    if (!form.message.trim()) nextErrors.message = 'Please enter a message'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    setServerMessage('')

    const formData = new FormData()
    formData.append('name', form.name.trim())
    formData.append('email', form.email.trim())
    formData.append('subject', form.subject.trim())
    formData.append('message', form.message.trim())
    // Honeypot (leave empty)
    formData.append('company', '')

    const result: SubmitResult = await submitContactMessage(formData)

    if (result.success) {
      setStatus('success')
      setServerMessage(result.message)
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setServerMessage('')
      }, 5000)
    } else {
      setStatus('error')
      setServerMessage(result.message)
      if (result.errors) {
        setErrors(result.errors as FormErrors)
      }
      // Allow retry after short delay
      setTimeout(() => setStatus('idle'), 2200)
    }
  }

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateField(key, e.target.value),
  })

  const inputClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something great"
            description="Have a project in mind or just want to say hi? My inbox is always open."
          />

          <div className="grid gap-10 lg:grid-cols-5">
            <motion.div variants={fadeLeft} className="space-y-4 lg:col-span-2">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 sm:gap-4 sm:p-5 transition-colors hover:border-primary active:bg-muted/50"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary sm:h-12 sm:w-12">
                    <Icon size={18} className="sm:size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span className="font-medium text-foreground break-all text-sm sm:text-base">{value}</span>
                  </span>
                </a>
              ))}

              <div className="flex gap-3 pt-2">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <FiGithub size={20} />
                </a>
              </div>
            </motion.div>

            <motion.form
              variants={fadeRight}
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-3"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input id="name" type="text" placeholder="John Doe" className={inputClass} {...field('name')} />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input id="email" type="email" placeholder="john@email.com" className={inputClass} {...field('email')} />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                  Subject
                </label>
                <input id="subject" type="text" placeholder="Project inquiry" className={inputClass} {...field('subject')} />
                {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                  {...field('message')}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              {/* Honeypot field - hidden from real users, bots often fill it */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} /> Send Message
                    </>
                  )}
                </MagneticButton>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm font-medium text-green-500"
                    >
                      <FiCheckCircle size={18} /> {serverMessage || 'Message sent!'}
                    </motion.span>
                  )}
                  {status === 'error' && serverMessage && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-sm font-medium text-red-500"
                    >
                      <FiAlertCircle size={17} /> {serverMessage}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
