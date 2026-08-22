'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
    >
      <span className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 shadow-md backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {eyebrow}
      </span>
      <h2 className="font-heading text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 font-medium max-w-2xl mx-auto">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
