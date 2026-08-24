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
  FiMessageSquare,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
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
  { icon: FaWhatsapp, label: 'WhatsApp', value: personal.phone, href: personal.whatsapp },
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

  const openWhatsAppDirect = (name: string, email: string, subject: string, message: string) => {
    const text = encodeURIComponent(
      `👋 Hi Sunaina! New message from portfolio:\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n💬 *Message:* ${message}`
    )
    const waUrl = `https://wa.me/${personal.whatsappNumber}?text=${text}`
    window.open(waUrl, '_blank')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    formData.append('company', '')

    const result: SubmitResult = await submitContactMessage(formData)

    if (result.success) {
      setStatus('success')
      setServerMessage(result.message)

      openWhatsAppDirect(form.name.trim(), form.email.trim(), form.subject.trim(), form.message.trim())

      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})

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
      setTimeout(() => setStatus('idle'), 2200)
    }
  }

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateField(key, e.target.value),
  })

  const inputClass =
    'w-full rounded-2xl border border-indigo-500/30 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 font-medium'

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute right-1/4 bottom-10 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Contact &amp; WhatsApp Connect"
            title="Let's Build Something Great Together"
            description="Have a web app, mobile app project, or full-time position? Send a message below or reach out directly on WhatsApp."
          />

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact Information Column */}
            <motion.div variants={fadeLeft} className="space-y-4 lg:col-span-2">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex items-center gap-3.5 rounded-3xl border border-indigo-500/30 glass-card p-4 sm:gap-4 sm:p-5 transition-all hover:border-emerald-400/60 hover:scale-[1.02] shadow-lg group"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      {label}
                    </span>
                    <span className="font-extrabold text-white break-all text-sm sm:text-base">{value}</span>
                  </span>
                </a>
              ))}

              <div className="flex gap-3 pt-2">
                <a
                  href={personal.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Direct"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 py-3 text-sm font-black text-emerald-400 transition-all hover:bg-emerald-500 hover:text-slate-950 shadow-lg shadow-emerald-500/15"
                >
                  <FaWhatsapp size={20} /> Direct WhatsApp Chat
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-slate-900 text-slate-300 transition-all hover:border-indigo-400 hover:text-white"
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-slate-900 text-slate-300 transition-all hover:border-indigo-400 hover:text-white"
                >
                  <FiGithub size={20} />
                </a>
              </div>
            </motion.div>

            {/* Contact Form Column */}
            <motion.form
              variants={fadeRight}
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-indigo-500/30 glass-card p-6 sm:p-8 lg:col-span-3 shadow-2xl space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Your Name
                  </label>
                  <input id="name" type="text" placeholder="e.g. Rahul Verma" className={inputClass} {...field('name')} />
                  {errors.name && <p className="mt-1.5 text-xs font-bold text-rose-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Your Email
                  </label>
                  <input id="email" type="email" placeholder="e.g. rahul@example.com" className={inputClass} {...field('email')} />
                  {errors.email && <p className="mt-1.5 text-xs font-bold text-rose-400">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Project Subject
                </label>
                <input id="subject" type="text" placeholder="Mobile app or Full-stack inquiry" className={inputClass} {...field('subject')} />
                {errors.subject && <p className="mt-1.5 text-xs font-bold text-rose-400">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Message Details
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Share details about your idea, timeline, or requirements..."
                  className={`${inputClass} resize-none`}
                  {...field('message')}
                />
                {errors.message && <p className="mt-1.5 text-xs font-bold text-rose-400">{errors.message}</p>}
              </div>

              {/* Honeypot field */}
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
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp size={18} className="text-emerald-400" /> Send Message via WhatsApp
                    </>
                  )}
                </MagneticButton>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs font-extrabold text-emerald-400"
                    >
                      <FiCheckCircle size={18} /> Message prepared &amp; opened in WhatsApp!
                    </motion.span>
                  )}
                  {status === 'error' && serverMessage && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-xs font-extrabold text-rose-400"
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
