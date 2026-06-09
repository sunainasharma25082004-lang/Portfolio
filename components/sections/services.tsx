'use client'

import { motion } from 'framer-motion'
import {
  FiCode,
  FiLayers,
  FiSmartphone,
  FiLink,
  FiTrendingUp,
  FiTool,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { services } from '@/lib/data'

const icons: IconType[] = [
  FiCode,
  FiLayers,
  FiSmartphone,
  FiLink,
  FiTrendingUp,
  FiTool,
]

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Services"
            title="What I can do for you"
            description="From concept to deployment, I offer the full spectrum of modern web development services."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = icons[i % icons.length]
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-7"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
