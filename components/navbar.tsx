'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { navLinks, personal } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  // Scroll lock when mobile menu is open
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
    const onScroll = () => setScrolled(window.scrollY > 24)
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
        'fixed inset-x-0 top-0 z-[60] transition-all duration-300',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6',
          (scrolled || open)
            ? 'glass border-border shadow-lg shadow-black/20'
            : 'border-transparent',
        )}
      >
        <a
          href="#home"
          className="font-heading text-base font-bold tracking-tight text-foreground sm:text-lg"
        >
          {personal.name.split(' ')[0]}
          <span className="text-primary">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 md:inline-flex"
        >
          Let&apos;s Talk
        </a>

        {/* Mobile hamburger - custom animated (clear X when open) */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all active:scale-[0.94] md:hidden",
            open
              ? "border-primary/40 bg-primary/10 text-primary backdrop-blur-md"
              : "border-border bg-card/80 text-foreground backdrop-blur-md"
          )}
        >
          <div className="relative h-[17px] w-5">
            {/* Top line */}
            <motion.span
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 5.5 : 0,
                width: open ? "100%" : "100%",
              }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 block h-[2px] w-5 rounded-full bg-current"
            />
            {/* Middle line */}
            <motion.span
              animate={{
                opacity: open ? 0 : 1,
                x: open ? 3 : 0,
              }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rounded-full bg-current"
            />
            {/* Bottom line */}
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
      </nav>

      {/* Premium Full-Screen Mobile Menu - tighter + more animated */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-2xl md:hidden"
            onClick={() => setOpen(false)}
          >
            {/* Inner content */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col px-5 pb-8 pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar inside menu with explicit close */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mb-3 flex items-center justify-between"
              >
                <a
                  href="#home"
                  onClick={() => setOpen(false)}
                  className="font-heading text-lg font-semibold tracking-tight text-foreground"
                >
                  {personal.name.split(' ')[0]}
                  <span className="text-primary">.dev</span>
                </a>

                {/* Explicit close button at top of menu - very clear */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur transition active:scale-95 hover:bg-card"
                >
                  <span className="text-2xl leading-none -mt-0.5">×</span>
                </button>
              </motion.div>

              {/* Nav Links - tighter + better stagger */}
              <div className="flex flex-col">
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
                        'group flex items-center justify-between rounded-2xl px-4 py-3 text-[21px] font-medium tracking-[-0.2px] transition-all active:bg-white/5',
                        isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active-dot"
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  )
                })}
              </div>

              {/* CTA Button - nicer entrance */}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.26 }}
                whileTap={{ scale: 0.985 }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 active:bg-primary/90"
              >
                Let&apos;s Talk
              </motion.a>

              {/* Socials - closer and more animated */}
              <div className="mt-8 flex items-center justify-center gap-2.5">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all hover:border-primary hover:text-primary"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>

              {/* Small footer note */}
              <p className="mt-6 text-center text-[10px] text-muted-foreground/60">
                {personal.name} — Available for freelance
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
