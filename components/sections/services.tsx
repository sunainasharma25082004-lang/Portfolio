'use client'

import { motion } from 'framer-motion'
import {
  FiCode,
  FiLayers,
  FiSmartphone,
  FiDatabase,
  FiZap,
  FiCheckCircle,
} from 'react-icons/fi'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { services } from '@/lib/data'

const serviceIcons = [
  FiSmartphone,
  FiCode,
  FiDatabase,
  FiLayers,
  FiZap,
  FiCheckCircle,
]

const serviceAccents = [
  'from-emerald-400 to-teal-500',
  'from-indigo-400 to-primary',
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-accent',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
]

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute right-10 top-1/3 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Specialized Services &amp; Capabilities"
            title="What I Offer &amp; Engineer for Clients"
            description="From initial UI/UX wireframes to full-stack web platforms, REST API engines, and Google Play Store application launches."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length]
              const gradient = serviceAccents[i % serviceAccents.length]

              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl border border-indigo-500/25 glass-card p-6 sm:p-8 shadow-xl hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20" />

                  <div>
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-slate-950 font-bold shadow-lg shadow-indigo-500/20`}>
                      <Icon size={26} />
                    </div>

                    <h3 className="font-heading text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <FiCheckCircle size={14} /> Production Ready
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform text-white">
                      Learn More →
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
