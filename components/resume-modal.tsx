'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiDownload,
  FiPrinter,
  FiBriefcase,
  FiCheckCircle,
  FiAward,
  FiBookOpen,
  FiSmartphone,
} from 'react-icons/fi'
import { personal, skillCategories, timeline, education, languages } from '@/lib/data'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Resume Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-[#0d1322] p-6 shadow-2xl sm:p-10 text-foreground"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-cyan-500/15 p-2 text-cyan-400 border border-cyan-500/30">
                <FiAward size={20} />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-white">{personal.name} — Executive Resume</h2>
                <p className="text-xs text-cyan-400 font-bold">{personal.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-border bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-all"
              >
                <FiPrinter size={14} /> Print
              </button>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-cyan-500 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-primary/20 hover:opacity-95 transition-all"
              >
                <FiDownload size={14} /> Download PDF
              </a>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-slate-900 text-slate-300 hover:text-white active:scale-95 transition-all"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="space-y-8">
            {/* Header Box */}
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-primary/10 to-indigo-500/10 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-2xl font-black text-white sm:text-3xl">{personal.name}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/40">
                  <FiSmartphone size={13} /> Google Play Store Developer
                </span>
              </div>
              <p className="text-sm font-extrabold text-cyan-400 mt-1">{personal.title}</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-medium">{personal.intro}</p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-300 border-t border-border/40 pt-3">
                <span>📧 {personal.email}</span>
                <span>📱 {personal.phone}</span>
                <span>📍 {personal.location}</span>
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2 mb-4 border-b border-border/40 pb-2">
                <FiBriefcase className="text-cyan-400" /> Work Experience &amp; Impact
              </h3>
              <div className="space-y-6">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-cyan-500/40">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-cyan-400" />
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className="text-sm font-extrabold text-white">{item.title}</h4>
                      <span className="text-xs font-bold text-cyan-400">{item.date}</span>
                    </div>
                    <p className="text-xs font-bold text-indigo-400 mt-0.5">{item.org}</p>
                    {item.bulletPoints ? (
                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                        {item.bulletPoints.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2 mb-4 border-b border-border/40 pb-2">
                <FiBookOpen className="text-indigo-400" /> Education
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="rounded-xl border border-border/70 bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-white">{edu.degree}</h4>
                      <span className="text-[11px] font-bold text-cyan-400">{edu.period}</span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-300 mt-1">{edu.institution} | {edu.university}</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Languages */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 mb-3 border-b border-border/40 pb-2">
                  <FiAward className="text-cyan-400" /> Technical Stack
                </h3>
                <div className="space-y-3">
                  {skillCategories.map((cat) => (
                    <div key={cat.title}>
                      <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                        {cat.title}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s) => (
                          <span
                            key={s.name}
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-slate-900/80 px-2 py-0.5 text-xs font-semibold text-slate-200"
                          >
                            <FiCheckCircle size={10} className="text-cyan-400" /> {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 mb-3 border-b border-border/40 pb-2">
                  🌐 Languages Spoken
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs font-semibold">
                      <span className="text-slate-200">{lang.name}</span>
                      <span className="text-cyan-400 font-bold">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
