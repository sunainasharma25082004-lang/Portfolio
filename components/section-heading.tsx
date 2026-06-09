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
      className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
    >
      <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-secondary">
        {eyebrow}
      </span>
      <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
