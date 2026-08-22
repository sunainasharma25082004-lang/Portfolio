'use client'

import { motion } from 'framer-motion'
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiHeart, FiSmartphone } from 'react-icons/fi'
import { navLinks, personal } from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative border-t border-indigo-500/30 bg-[#070b12] pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#home"
              className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-white inline-block"
            >
              {personal.name.split(' ')[0]}
              <span className="text-emerald-400">.dev</span>
            </a>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
              {personal.title} engineering high-impact web platforms, Node.js REST APIs, and production Play Store mobile apps. Available for remote roles &amp; custom engineering projects.
            </p>
            <div className="flex items-center gap-3 pt-2">
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900 text-slate-400 transition-all hover:border-emerald-400 hover:text-emerald-400 hover:scale-110 shadow-md"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xs font-black uppercase tracking-widest text-emerald-400">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-semibold text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xs font-black uppercase tracking-widest text-emerald-400">
              Direct Contact
            </h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="transition-colors hover:text-emerald-400 font-bold"
                >
                  📧 {personal.email}
                </a>
              </li>
              <li className="font-bold">📱 {personal.phone}</li>
              <li className="font-bold">📍 {personal.location}</li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
                  <FiSmartphone size={12} /> Play Store Publisher
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 sm:flex-row">
          <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
            © {new Date().getFullYear()} {personal.name}. Built with React 19, Next.js 15 &amp; Tailwind CSS.
          </p>
          <motion.a
            href="#home"
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 rounded-full border border-indigo-500/40 bg-slate-900 px-5 py-2 text-xs font-bold text-white transition-all hover:border-emerald-400 hover:text-emerald-400 shadow-md"
          >
            Back to Top <FiArrowUp size={14} />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
