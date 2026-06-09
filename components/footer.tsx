'use client'

import { motion } from 'framer-motion'
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { navLinks, personal } from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/40 pt-10 pb-6 sm:pt-14 sm:pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a
              href="#home"
              className="font-heading text-2xl font-bold tracking-tight text-foreground"
            >
              {personal.name.split(' ')[0]}
              <span className="text-primary">.dev</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {personal.title} building fast, scalable, and user-focused web
              applications. Always open to new opportunities and collaborations.
            </p>
            <div className="mt-5 flex gap-3">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-foreground">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {personal.email}
                </a>
              </li>
              <li>{personal.phone}</li>
              <li>{personal.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <motion.a
            href="#home"
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Back to top <FiArrowUp size={14} />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
