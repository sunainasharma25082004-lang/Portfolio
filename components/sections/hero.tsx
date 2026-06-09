'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { MagneticButton } from '@/components/magnetic-button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { personal } from '@/lib/data'

export function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-[92dvh] items-center overflow-x-hidden overflow-hidden pt-14 pb-8 sm:pt-20 sm:pb-14 lg:min-h-[100dvh] lg:pt-24 lg:pb-16"
    >
      {/* floating background shapes - smaller & safer on mobile */}
      <motion.div
        aria-hidden
        animate={{ x: mouse.x * -20, y: mouse.y * -20 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl sm:-left-24 sm:top-24 sm:h-72 sm:w-72"
      />
      <motion.div
        aria-hidden
        animate={{ x: mouse.x * 28, y: mouse.y * 28 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="pointer-events-none absolute -right-12 bottom-6 h-64 w-64 rounded-full bg-secondary/20 blur-3xl sm:-right-20 sm:bottom-10 sm:h-80 sm:w-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%)]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:grid-cols-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            Available for freelance work
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {personal.name.split(' ')[0]}
            <br />
            <span className="gradient-text">{personal.title}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:mx-0"
          >
            {personal.intro} Turning ideas into clean, performant products from
            database to pixel.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:justify-start"
          >
            <MagneticButton href="/resume.pdf" variant="primary">
              <FiDownload size={16} /> Download Resume
            </MagneticButton>
            <MagneticButton href="#projects" variant="outline">
              View Projects <FiArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <HiOutlineMail size={16} /> Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex items-center justify-center gap-2.5 lg:justify-start sm:gap-3"
          >
            {[
              { icon: FiGithub, href: personal.github, label: 'GitHub' },
              { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
              { icon: FiTwitter, href: personal.twitter, label: 'Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary sm:h-10 sm:w-10"
              >
                <Icon size={16} className="sm:size-[18px]" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[220px] sm:max-w-xs"
        >
          <motion.div
            animate={{ x: mouse.x * 10, y: mouse.y * 10 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            className="relative"
          >
            <div className="absolute -inset-2.5 sm:-inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/40 to-secondary/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border glass">
              <Image
                src="/image/sunaina-img.jpeg"
                alt={`Portrait of ${personal.name}`}
                width={800}
                height={1000}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Experience badge - smaller on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-2.5 -left-2.5 rounded-xl border border-border glass px-3 py-1.5 shadow-xl sm:-bottom-4 sm:-left-4 sm:rounded-2xl sm:px-4 sm:py-2.5"
            >
              <p className="font-heading text-lg font-bold text-foreground sm:text-2xl">
                2+ yrs
              </p>
              <p className="text-[9px] text-muted-foreground sm:text-xs">Experience</p>
            </motion.div>

            {/* Projects badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="absolute -right-2.5 top-5 rounded-xl border border-border glass px-3 py-1.5 shadow-xl sm:-right-4 sm:top-7 sm:rounded-2xl sm:px-4 sm:py-2.5"
            >
              <p className="font-heading text-lg font-bold gradient-text sm:text-2xl">
                20+
              </p>
              <p className="text-[9px] text-muted-foreground sm:text-xs">Projects</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
