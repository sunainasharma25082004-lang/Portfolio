'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch,
  FiX,
  FiFolder,
  FiLayers,
  FiMail,
  FiArrowRight,
  FiDownload,
  FiTerminal,
} from 'react-icons/fi'
import { projects, personal, navLinks } from '@/lib/data'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSelectProject?: (projectId: string) => void
  onOpenResume?: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          window.dispatchEvent(new CustomEvent('open-command-palette'))
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  )

  const filteredNavLinks = navLinks.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Command Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          {/* Search Box */}
          <div className="flex items-center border-b border-border/60 px-4 py-3.5 bg-muted/30">
            <FiSearch size={18} className="text-primary mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search projects, skills, or navigate..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-medium"
            />
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Search Results List */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
            {/* Quick Actions */}
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Quick Actions
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onClose()
                    if (onOpenResume) onOpenResume()
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-left font-medium"
                >
                  <span className="flex items-center gap-2.5">
                    <FiDownload className="text-primary" /> View & Download Digital Resume
                  </span>
                  <kbd className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">PDF</kbd>
                </button>

                <a
                  href={`mailto:${personal.email}`}
                  onClick={onClose}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-left font-medium"
                >
                  <span className="flex items-center gap-2.5">
                    <FiMail className="text-secondary" /> Email {personal.name} ({personal.email})
                  </span>
                  <FiArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            {filteredNavLinks.length > 0 && (
              <div>
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Page Navigation
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {filteredNavLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <FiLayers className="text-primary/70" /> {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Matches */}
            {filteredProjects.length > 0 && (
              <div>
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Projects ({filteredProjects.length})
                </p>
                <div className="space-y-1">
                  {filteredProjects.slice(0, 6).map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        onClose()
                        if (onSelectProject) onSelectProject(proj.id)
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-left font-medium"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <FiFolder className="shrink-0 text-primary" />
                        <span className="truncate font-semibold">{proj.title}</span>
                      </div>
                      <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {proj.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredProjects.length === 0 && filteredNavLinks.length === 0 && (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No matching projects or sections found for &quot;{query}&quot;.
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <FiTerminal size={12} className="text-primary" /> Sunaina Portfolio Command Palette
            </span>
            <span>
              Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono">ESC</kbd> to exit
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
