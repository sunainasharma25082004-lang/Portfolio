'use client'

import { motion } from 'framer-motion'
import {
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { TbApi } from 'react-icons/tb'
import type { IconType } from 'react-icons'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { skillCategories } from '@/lib/data'

const iconMap: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': TbApi,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  Figma: SiFigma,
  'VS Code': VscVscode,
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-card/40 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Skills"
            title="My technical toolkit"
            description="A versatile stack I use to design, build, and ship complete web applications end to end."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-border bg-card p-5 sm:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-primary to-secondary" />
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill) => {
                    const Icon = iconMap[skill.name]
                    return (
                      <div key={skill.name}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                            {Icon ? (
                              <Icon className="text-secondary" size={18} />
                            ) : null}
                            {skill.name}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
