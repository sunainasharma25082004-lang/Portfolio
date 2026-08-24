'use client'

import { motion } from 'framer-motion'
import { FiBriefcase, FiCheckCircle, FiSmartphone, FiGlobe, FiCalendar } from 'react-icons/fi'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { timeline } from '@/lib/data'

export function Experience() {
  return (
    <section id="experience" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Career Progression"
            title="Work Experience &amp; Impact"
            description="End-to-end full-stack web platforms, mobile app engineering, REST API architecture, and Google Play Store app publishing."
          />

          <div className="relative">
            {/* Vertical glowing timeline line */}
            <span className="absolute left-3.5 top-3 h-[calc(100%-1.5rem)] w-0.5 bg-gradient-to-b from-emerald-400 via-primary to-indigo-500 sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-8 sm:space-y-14">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title + i}
                  variants={fadeUp}
                  className={`relative flex flex-col gap-2 pl-9 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0
                      ? 'sm:pr-12 sm:text-right'
                      : 'sm:ml-auto sm:pl-12'
                  }`}
                >
                  {/* Timeline node beacon */}
                  <span
                    className={`absolute left-3.5 top-2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-emerald-400 bg-slate-950 text-emerald-400 sm:left-auto sm:h-9 sm:w-9 shadow-lg shadow-emerald-500/30 ${
                      i % 2 === 0
                        ? 'sm:-right-4.5 sm:translate-x-1/2'
                        : 'sm:-left-4.5 sm:-translate-x-1/2'
                    }`}
                  >
                    <FiBriefcase size={14} className="sm:size-4" />
                  </span>

                  <motion.div
                    whileHover={{ y: -6 }}
                    className="rounded-3xl border border-indigo-500/30 glass-card p-6 shadow-xl hover:border-emerald-400/50 transition-all text-left"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 shadow-sm backdrop-blur-md">
                        <FiCalendar size={12} /> {item.date}
                      </span>
                      {i === 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
                          <FiSmartphone size={11} /> Play Store Apps Live
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-heading text-lg sm:text-xl font-black text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-extrabold text-indigo-300 mt-1 flex items-center gap-1.5">
                      <FiGlobe size={14} /> {item.org}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
                      {item.description}
                    </p>

                    {item.bulletPoints && (
                      <div className="mt-4 border-t border-slate-800 pt-3">
                        <ul className="space-y-2 text-xs text-slate-300">
                          {item.bulletPoints.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <FiCheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
