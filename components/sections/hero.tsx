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
  FiZap,
  FiCheckCircle,
} from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiMongodb } from 'react-icons/si'
import { MagneticButton } from '@/components/magnetic-button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { personal } from '@/lib/data'

interface HeroProps {
  onOpenResume?: () => void
  onOpenCommandPalette?: () => void
}

const roles = [
  'Full Stack & Mobile App Engineer',
  'React Native & Google Play Store Publisher',
  'Next.js 15 & React.js Web Architect',
  'Node.js REST API & Database Engineer',
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
        }, 65)
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200)
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
      className="relative flex min-h-[92dvh] items-center overflow-x-hidden overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-16 lg:min-h-[100dvh] lg:pt-32 lg:pb-20"
    >
      {/* Dynamic Background Mesh Orbs */}
      <motion.div
        aria-hidden
        animate={{ x: mouse.x * -24, y: mouse.y * -24 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-indigo-600/25 blur-[120px] sm:-left-32 sm:top-28 sm:h-[480px] sm:w-[480px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: mouse.x * 32, y: mouse.y * 32 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-[130px] sm:-right-24 sm:bottom-16 sm:h-[520px] sm:w-[520px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-64 w-64 rounded-full bg-purple-600/15 blur-[100px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:gap-14 lg:grid-cols-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          {/* Status pill & command palette shortcut */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 shadow-md backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Full Stack &amp; Mobile Engineer @ VIZ Digital Zirakpur
            </span>

            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/25 hover:border-indigo-400 transition-all active:scale-95"
              >
                <FiSearch size={13} /> Press <kbd className="rounded bg-indigo-500/30 px-1.5 py-0.5 text-[10px] font-mono text-white">Ctrl+K</kbd>
              </button>
            )}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 sm:mt-7 font-heading text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-white">{personal.name.split(' ')[0]}</span>
            <br />
            <span className="gradient-text inline-block min-h-[1.25em]">{displayText}</span>
            <span className="animate-pulse text-indigo-400 font-mono font-normal">|</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-lg lg:mx-0 font-medium"
          >
            {personal.intro}
          </motion.p>

          {/* Quick Info Badges */}
          <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-slate-900/90 px-3.5 py-1.5 text-xs font-bold text-slate-200 shadow-sm backdrop-blur-md">
              <FiSmartphone className="text-emerald-400" /> Google Play Store Developer
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-slate-900/90 px-3.5 py-1.5 text-xs font-bold text-slate-200 shadow-sm backdrop-blur-md">
              <FiLayers className="text-indigo-400" /> End-to-End MERN &amp; Next Architecture
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-primary to-blue-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
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
            className="mt-7 flex items-center justify-center gap-3 lg:justify-start"
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-1">Connect:</span>
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900/80 text-slate-400 transition-all hover:border-emerald-400 hover:text-emerald-400 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 sm:h-11 sm:w-11"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Portrait Container with Floating Orbit Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[240px] sm:max-w-xs lg:max-w-sm"
        >
          <motion.div
            animate={{ x: mouse.x * 10, y: mouse.y * 10 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="relative"
          >
            {/* Glowing Backdrop Mesh */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-[3rem] bg-gradient-to-tr from-emerald-500/30 via-indigo-500/40 to-purple-500/30 blur-3xl animate-pulse" />
            
            {/* Main Portrait Box */}
            <div className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[2.5rem] border-2 border-indigo-500/40 glass-card shadow-2xl">
              <Image
                src="/image/sunaina-img.jpeg"
                alt={`Portrait of ${personal.name}`}
                width={800}
                height={1000}
                priority
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating Tech Icon Badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 rounded-2xl border border-emerald-500/50 bg-slate-950/90 p-2.5 sm:p-3 text-emerald-400 shadow-2xl backdrop-blur-xl"
              title="React & React Native"
            >
              <SiReact size={20} className="sm:size-6" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 rounded-2xl border border-indigo-500/50 bg-slate-950/90 p-2.5 sm:p-3 text-white shadow-2xl backdrop-blur-xl"
              title="Next.js"
            >
              <SiNextdotjs size={20} className="sm:size-6" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 rounded-2xl border border-purple-500/50 bg-slate-950/90 p-2.5 sm:p-3 text-purple-400 shadow-2xl backdrop-blur-xl"
              title="TypeScript"
            >
              <SiTypescript size={20} className="sm:size-6" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 1.2 }}
              className="absolute bottom-14 -left-4 sm:bottom-16 sm:-left-5 rounded-2xl border border-cyan-500/50 bg-slate-950/90 p-2.5 sm:p-3 text-cyan-400 shadow-2xl backdrop-blur-xl"
              title="Node.js & MongoDB"
            >
              <SiNodedotjs size={20} className="sm:size-6" />
            </motion.div>

            {/* Experience Floating Chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 left-3 sm:left-5 rounded-2xl border border-emerald-500/40 glass px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xl"
            >
              <p className="font-heading text-lg font-black text-emerald-400 sm:text-2xl leading-none">
                1+ Year
              </p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-300 mt-0.5 sm:text-[11px]">
                Industry Experience
              </p>
            </motion.div>

            {/* Projects Floating Chip */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="absolute -right-3 top-12 sm:-right-5 sm:top-14 rounded-2xl border border-indigo-500/40 glass px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xl"
            >
              <p className="font-heading text-lg font-black gradient-text sm:text-2xl leading-none">
                20+ Apps
              </p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-300 mt-0.5 sm:text-[11px]">
                Web &amp; Play Store
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
