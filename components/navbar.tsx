'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiSearch, FiMessageSquare } from 'react-icons/fi'
import { navLinks, personal } from '@/lib/data'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-[60] transition-all duration-300 px-3 sm:px-6',
        scrolled ? 'py-3.5' : 'py-5',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-6',
          (scrolled || open)
            ? 'glass border-indigo-500/35 shadow-2xl shadow-indigo-500/10'
            : 'border-indigo-500/20 bg-slate-950/40 backdrop-blur-md',
        )}
      >
        <a
          href="#home"
          className="font-heading text-base font-black tracking-tight text-white sm:text-xl flex items-center gap-1.5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-400 text-xs font-black text-slate-950 shadow-md">
            S
          </span>
          {personal.name.split(' ')[0]}
          <span className="text-emerald-400">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold transition-colors',
                  active === link.href
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white',
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/25 via-emerald-500/20 to-indigo-500/25 border border-indigo-500/40"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              title="Open Command Palette (Ctrl+K)"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900/90 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 transition-all shadow-md active:scale-95"
            >
              <FiSearch size={16} />
            </button>
          )}

          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-indigo-600 via-primary to-emerald-500 px-5 py-2 text-xs font-black text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 md:inline-flex items-center gap-1.5"
          >
            <FiMessageSquare size={14} /> Let&apos;s Talk
          </a>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all active:scale-95 md:hidden",
              open
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 backdrop-blur-md"
                : "border-indigo-500/30 bg-slate-900 text-white backdrop-blur-md"
            )}
          >
            <div className="relative h-[17px] w-5">
              <motion.span
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 5.5 : 0,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 block h-[2px] w-5 rounded-full bg-current"
              />
              <motion.span
                animate={{
                  opacity: open ? 0 : 1,
                  x: open ? 3 : 0,
                }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rounded-full bg-current"
              />
              <motion.span
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? -5.5 : 0,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 bottom-0 block h-[2px] w-5 rounded-full bg-current"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[55] bg-slate-950/95 backdrop-blur-2xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col px-5 pb-8 pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                <a
                  href="#home"
                  onClick={() => setOpen(false)}
                  className="font-heading text-lg font-black text-white"
                >
                  {personal.name.split(' ')[0]}
                  <span className="text-emerald-400">.dev</span>
                </a>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-white backdrop-blur transition active:scale-95"
                >
                  <span className="text-2xl leading-none -mt-0.5">×</span>
                </button>
              </div>

              <div className="flex flex-col space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = active === link.href
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.04 + index * 0.032,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        'group flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-extrabold transition-all active:bg-white/5',
                        isActive
                          ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                          : 'text-slate-300 hover:text-white'
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      )}
                    </motion.a>
                  )
                })}
              </div>

              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.26 }}
                whileTap={{ scale: 0.985 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-emerald-500 px-7 py-3.5 text-base font-black text-white shadow-xl shadow-indigo-500/30"
              >
                <FiMessageSquare size={18} /> Let&apos;s Talk
              </motion.a>

              <div className="mt-8 flex items-center justify-center gap-3">
                {[
                  { icon: FiGithub, href: personal.github, label: 'GitHub' },
                  { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
                  { icon: FiTwitter, href: personal.twitter, label: 'Twitter' },
                ].map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.32 + i * 0.045, type: 'spring', stiffness: 280, damping: 18 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-all hover:border-emerald-400 hover:text-emerald-400"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
