'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCode, FiSmartphone, FiZap, FiCheckCircle, FiCheck } from 'react-icons/fi'
import { SectionHeading } from '@/components/section-heading'
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '@/lib/motion'
import { stats, personal } from '@/lib/data'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame: number
    const duration = 1500
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

const highlights = [
  {
    icon: FiSmartphone,
    title: 'A-to-Z Mobile & Web',
    text: 'From UI/UX wireframes, Node.js REST APIs, to Google Play Store mobile releases.',
    color: 'emerald',
  },
  {
    icon: FiCode,
    title: 'Clean Architecture',
    text: 'Modular, highly performant React.js & React Native codebase designed to scale.',
    color: 'indigo',
  },
  {
    icon: FiZap,
    title: 'High Performance',
    text: 'Lightning fast initial loads, responsive layouts, and optimized database queries.',
    color: 'purple',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background Subtle Mesh */}
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="About Sunaina"
            title="Building End-to-End Digital Platforms from Concept to Play Store"
            description="Specializing in modern full-stack web architectures, mobile application development, REST API engineering, and production server deployment."
          />

          <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-12">
            {/* Left Narrative Box */}
            <motion.div variants={fadeLeft} className="space-y-4 sm:space-y-6 lg:col-span-7">
              <div className="rounded-3xl border border-indigo-500/30 glass-card p-6 sm:p-8 space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-slate-200 font-medium">
                  I&apos;m{' '}
                  <span className="font-extrabold text-emerald-400">
                    {personal.name}
                  </span>
                  , a{' '}
                  <span className="font-extrabold text-white">
                    Full Stack &amp; Mobile Engineer
                  </span>{' '}
                  with 1+ year of experience currently engineering web apps and Google Play Store applications at VIZ Digital (Motiaz Zirakpur).
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                  My work spans the complete product lifecycle — designing pixel-perfect mobile &amp; web interfaces, building scalable REST API backends in Node.js &amp; Express, architecting MongoDB schemas, and deploying live production applications.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                  Whether engineering a 4K OTT video streaming app (VIZ TV), an influencer brand deal platform (Fluencer), an organic farming e-commerce system (FarmMart24), or a real-time matchmaking app (Rishta24), I take complete ownership to deliver polished, scalable products.
                </p>
              </div>

              {/* 3 Pillar Highlight Cards */}
              <div className="grid gap-3 pt-1 grid-cols-1 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, title, text }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-indigo-500/25 glass-card p-4 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-heading text-xs sm:text-sm font-extrabold text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side Key Stats Grid */}
            <motion.div
              variants={fadeRight}
              className="grid grid-cols-2 gap-4 lg:col-span-5"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative overflow-hidden rounded-3xl border border-indigo-500/30 glass-card p-5 text-center sm:p-7 shadow-xl hover:border-emerald-400/50 transition-all"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-primary to-indigo-500" />
                  <p className="font-heading text-3xl font-black gradient-text sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-extrabold text-slate-200">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                    Production Verified
                  </p>
                </motion.div>
              ))}

              {/* Bonus Recruiter Fast-Facts Box */}
              <div className="col-span-2 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs sm:text-sm">
                  <FiCheckCircle size={16} /> Key Strengths for Recruiter Hiring:
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> React Native &amp; Expo
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> Next.js 15 &amp; React 19
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Node.js &amp; Express APIs
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Play Store Deployment
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
