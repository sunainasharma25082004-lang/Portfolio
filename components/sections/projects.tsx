'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion'
import { projects } from '@/lib/data'

export function Projects() {
  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured projects"
            description="A selection of products I've designed and built — each focused on real-world performance and polish."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border glass"
              >
                <div className="relative aspect-video overflow-hidden sm:aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                  {/* Desktop hover overlay for quick actions */}
                  <div className="absolute inset-0 hidden items-center justify-center gap-3 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 md:flex">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                    >
                      <FiExternalLink size={18} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} source code`}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground transition-transform hover:scale-110"
                    >
                      <FiGithub size={18} />
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3 border-t border-border pt-4 md:hidden">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-muted py-2 text-sm font-semibold text-foreground active:bg-muted/80"
                    >
                      <FiExternalLink size={15} /> Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border py-2 text-sm font-semibold text-foreground active:bg-muted/60"
                    >
                      <FiGithub size={15} /> Code
                    </a>
                  </div>

                  {/* Desktop bottom links */}
                  <div className="mt-5 hidden gap-3 border-t border-border pt-4 md:flex">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                    >
                      <FiExternalLink size={15} /> Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <FiGithub size={15} /> Code
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-12 text-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <FiGithub size={16} /> View more on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
