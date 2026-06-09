'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCode, FiLayout, FiZap } from 'react-icons/fi'
import { SectionHeading } from '@/components/section-heading'
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '@/lib/motion'
import { stats } from '@/lib/data'

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
    icon: FiCode,
    title: 'Clean Code',
    text: 'Readable, maintainable, well-structured code following best practices.',
  },
  {
    icon: FiLayout,
    title: 'UI / UX Focus',
    text: 'Thoughtful, accessible interfaces that users genuinely enjoy.',
  },
  {
    icon: FiZap,
    title: 'Performance',
    text: 'Fast, optimized apps with excellent Core Web Vitals.',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="About Me"
            title="Crafting digital experiences that matter"
          />

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <motion.div variants={fadeLeft} className="space-y-5">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I&apos;m a passionate{' '}
                <span className="font-semibold text-foreground">
                  Frontend &amp; MERN Stack Developer
                </span>{' '}
                who loves transforming complex problems into elegant, intuitive
                solutions. Over the past two years I&apos;ve built and shipped
                production web applications for startups and freelance clients.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                My approach blends a problem-solving mindset with an obsession
                for clean code and refined UI/UX. Whether it&apos;s architecting
                a REST API, optimizing a React frontend, or designing a
                responsive layout, I care about the details that make products
                feel premium.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                When I&apos;m not coding, I&apos;m exploring new technologies,
                contributing to open source, and continuously sharpening my
                craft.
              </p>

              <div className="grid gap-4 pt-2 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, title, text }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-border bg-card p-4 sm:p-5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-center sm:p-6"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                  <p className="font-heading text-4xl font-bold gradient-text sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
