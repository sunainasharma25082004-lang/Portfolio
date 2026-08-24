'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiSearch,
  FiSmartphone,
  FiLayers,
} from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs } from 'react-icons/si'
import { MagneticButton } from '@/components/magnetic-button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { personal } from '@/lib/data'

interface HeroProps {
  onOpenResume?: () => void
  onOpenCommandPalette?: () => void
}

const roles = [
  'Full Stack & Mobile Engineer',
  'React Native & Play Store Publisher',
  'Next.js 15 & React Web Architect',
  'Node.js REST API Architect',
]

export function Hero({ onOpenResume, onOpenCommandPalette }: HeroProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timer: NodeJS.Timeout

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, 60)
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1))
        }, 35)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

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
      className="relative flex min-h-[90dvh] items-center overflow-x-hidden overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:min-h-[100dvh] lg:pt-32 lg:pb-20"
    >
      {/* Background Mesh Orbs */}
      <motion.div
        aria-hidden
        animate={{ x: mouse.x * -20, y: mouse.y * -20 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
        className="pointer-events-none absolute -left-16 top-16 h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px] sm:-left-32 sm:top-28 sm:h-[480px] sm:w-[480px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: mouse.x * 24, y: mouse.y * 24 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
        className="pointer-events-none absolute -right-12 bottom-8 h-72 w-72 rounded-full bg-emerald-500/20 blur-[110px] sm:-right-24 sm:bottom-16 sm:h-[520px] sm:w-[520px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:gap-14 lg:grid-cols-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          {/* Status pill & command palette shortcut */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-emerald-400 shadow-md backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Full Stack &amp; Mobile Engineer @ VIZ Digital
            </span>

            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/25 transition-all active:scale-95"
              >
                <FiSearch size={12} /> Press <kbd className="rounded bg-indigo-500/30 px-1 py-0.2 text-[10px] font-mono text-white">Ctrl+K</kbd>
              </button>
            )}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-4 sm:mt-6 font-heading text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-white"
          >
            Hi, I&apos;m <span className="text-white">{personal.name.split(' ')[0]}</span>
            <br />
            <span className="gradient-text inline-block min-h-[1.3em]">{displayText}</span>
            <span className="animate-pulse text-indigo-400 font-mono font-normal">|</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3.5 max-w-xl text-xs sm:text-base lg:text-lg leading-relaxed text-slate-300 sm:mt-5 lg:mx-0 font-medium px-1 sm:px-0"
          >
            {personal.intro}
          </motion.p>

          {/* Quick Info Badges */}
          <motion.div variants={fadeUp} className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-slate-900/90 px-3 py-1.5 text-[11px] sm:text-xs font-bold text-slate-200 shadow-sm backdrop-blur-md">
              <FiSmartphone className="text-emerald-400 shrink-0" /> Play Store Developer
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-slate-900/90 px-3 py-1.5 text-[11px] sm:text-xs font-bold text-slate-200 shadow-sm backdrop-blur-md">
              <FiLayers className="text-indigo-400 shrink-0" /> Full Stack Architect
            </span>
          </motion.div>

          {/* Mobile-Optimized Action Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3"
          >
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="shimmer-btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-primary to-blue-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <FiFileText size={16} /> Digital Resume &amp; Specs
              </button>
            )}
            <MagneticButton href="#projects" variant="outline">
              Explore Live Apps <FiArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <HiOutlineMail size={16} /> Contact Me
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center justify-center gap-3 lg:justify-start"
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1">Connect:</span>
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900/80 text-slate-400 transition-all hover:border-emerald-400 hover:text-emerald-400 hover:scale-110 shadow-md"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Portrait Container with Mobile-Friendly Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[210px] xs:max-w-[240px] sm:max-w-xs lg:max-w-sm mt-4 lg:mt-0"
        >
          <motion.div
            animate={{ x: mouse.x * 6, y: mouse.y * 6 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="relative"
          >
            {/* Glowing Backdrop */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-emerald-500/30 via-indigo-500/35 to-purple-500/30 blur-2xl animate-pulse" />
            
            {/* Main Portrait Box */}
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.4rem] border-2 border-indigo-500/40 glass-card shadow-2xl">
              <Image
                src="/image/sunaina-img.jpeg"
                alt={`Portrait of ${personal.name}`}
                width={800}
                height={1000}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Orbit Badges tuned for mobile bounds */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-2 -left-1 sm:-top-3 sm:-left-3 rounded-xl sm:rounded-2xl border border-emerald-500/50 bg-slate-950/90 p-1.5 sm:p-3 text-emerald-400 shadow-xl backdrop-blur-xl scale-75 xs:scale-90 sm:scale-100"
              title="React & React Native"
            >
              <SiReact size={18} className="sm:size-6" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -top-2 -right-1 sm:-top-3 sm:-right-3 rounded-xl sm:rounded-2xl border border-indigo-500/50 bg-slate-950/90 p-1.5 sm:p-3 text-white shadow-xl backdrop-blur-xl scale-75 xs:scale-90 sm:scale-100"
              title="Next.js"
            >
              <SiNextdotjs size={18} className="sm:size-6" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-2 -right-1 sm:-bottom-3 sm:-right-3 rounded-xl sm:rounded-2xl border border-purple-500/50 bg-slate-950/90 p-1.5 sm:p-3 text-purple-400 shadow-xl backdrop-blur-xl scale-75 xs:scale-90 sm:scale-100"
              title="TypeScript"
            >
              <SiTypescript size={18} className="sm:size-6" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 1.2 }}
              className="absolute bottom-12 -left-1 sm:bottom-16 sm:-left-4 rounded-xl sm:rounded-2xl border border-cyan-500/50 bg-slate-950/90 p-1.5 sm:p-3 text-cyan-400 shadow-xl backdrop-blur-xl scale-75 xs:scale-90 sm:scale-100"
              title="Node.js & MongoDB"
            >
              <SiNodedotjs size={18} className="sm:size-6" />
            </motion.div>

            {/* Experience Floating Chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-3 left-1 sm:left-4 rounded-xl border border-emerald-500/40 glass px-2.5 py-1.5 sm:px-5 sm:py-2.5 shadow-xl scale-90 sm:scale-100"
            >
              <p className="font-heading text-xs font-black text-emerald-400 sm:text-2xl leading-none">
                1+ Year
              </p>
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-300 mt-0.5 sm:text-[11px]">
                Industry Exp
              </p>
            </motion.div>

            {/* Projects Floating Chip */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="absolute -right-1 top-8 sm:-right-4 sm:top-14 rounded-xl border border-indigo-500/40 glass px-2.5 py-1.5 sm:px-5 sm:py-2.5 shadow-xl scale-90 sm:scale-100"
            >
              <p className="font-heading text-xs font-black gradient-text sm:text-2xl leading-none">
                20+ Apps
              </p>
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-300 mt-0.5 sm:text-[11px]">
                Web &amp; Play Store
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
