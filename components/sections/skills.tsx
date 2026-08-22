'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiBootstrap,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiTypescript,
  SiNextdotjs,
  SiFigma,
} from 'react-icons/si'
import { TbApi, TbLayoutGrid, TbCode, TbDeviceMobile } from 'react-icons/tb'
import { FiCheckCircle, FiCpu, FiLayers } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { skillCategories } from '@/lib/data'

const iconMap: Record<string, IconType> = {
  'React.js Architecture': SiReact,
  'React Native & Expo': TbDeviceMobile,
  'JavaScript (ES6+) & TypeScript': SiTypescript,
  'HTML5 / CSS3 / Tailwind CSS': SiTailwindcss,
  'Bootstrap 5 & Laravel Blade': SiBootstrap,
  'Node.js & Express.js REST APIs': SiNodedotjs,
  'MongoDB & Mongoose Schemas': SiMongodb,
  'Prisma ORM & PostgreSQL': SiPostgresql,
  'JWT Auth & Wallet Payment Engines': TbApi,
  'Socket.io WebSockets Chat': TbCode,
  'A-to-Z Mobile & Web UI Design': TbLayoutGrid,
  'Component-Based Architecture': FiCheckCircle,
  'Flexbox & CSS Grid Layouts': TbLayoutGrid,
  'Responsive Mobile-First UX': TbDeviceMobile,
  'Git & GitHub Workflows': SiGit,
  'Postman & API Testing': TbApi,
}

export function Skills() {
  const [selectedTab, setSelectedTab] = useState<string>('All')

  const filterCategories = skillCategories.filter((cat) => {
    if (selectedTab === 'All') return true
    if (selectedTab === 'Frontend & Mobile') {
      return cat.title.includes('Frontend') || cat.title.includes('Mobile')
    }
    if (selectedTab === 'Backend & Database') {
      return cat.title.includes('Backend') || cat.title.includes('Database')
    }
    if (selectedTab === 'Design & Tools') {
      return cat.title.includes('UI/UX') || cat.title.includes('Workflow')
    }
    return true
  })

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 lg:py-32"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute left-1/4 bottom-10 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Technical Stack &amp; Capabilities"
            title="Full Stack &amp; Mobile Engineering Toolkit"
            description="End-to-end expertise across React Native, Next.js, Node.js REST APIs, MongoDB, UI/UX wireframing, and Play Store publishing."
          />

          {/* Category Filter Pills */}
          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {['All', 'Frontend & Mobile', 'Backend & Database', 'Design & Tools'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  selectedTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 via-primary to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'border border-indigo-500/30 bg-slate-900/60 text-slate-300 hover:border-cyan-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filterCategories.map((category) => (
                <motion.div
                  key={category.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-cyan-500/30 glass-card p-6 sm:p-8 shadow-xl hover:border-cyan-400/60 transition-all"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-7 w-2 rounded-full bg-gradient-to-b from-cyan-400 via-primary to-indigo-500" />
                    <h3 className="font-heading text-xl font-black text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {category.skills.map((skill) => {
                      const Icon = iconMap[skill.name]
                      return (
                        <div key={skill.name}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-2.5 text-sm font-extrabold text-slate-200">
                              {Icon ? (
                                <Icon className="text-cyan-400" size={19} />
                              ) : (
                                <FiCheckCircle className="text-cyan-400" size={17} />
                              )}
                              {skill.name}
                            </span>
                            <span className="text-xs font-black text-cyan-400 font-mono">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-950 border border-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-primary"
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
