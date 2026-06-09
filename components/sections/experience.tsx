'use client'

import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { timeline } from '@/lib/data'

export function Experience() {
  return (
    <section id="experience" className="relative bg-card/40 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <SectionHeading
            eyebrow="Journey"
            title="Experience & growth"
            description="The path that shaped me into the developer I am today."
          />

          <div className="relative">
            {/* Vertical timeline line - left on mobile, center on sm+ */}
            <span className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-6 sm:space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className={`relative flex flex-col gap-2 pl-9 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0
                      ? 'sm:pr-10 sm:text-right'
                      : 'sm:ml-auto sm:pl-10'
                  }`}
                >
                  {/* Timeline node */}
                  <span
                    className={`absolute left-4 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary/40 bg-card text-primary sm:left-auto sm:h-8 sm:w-8 ${
                      i % 2 === 0
                        ? 'sm:-right-4 sm:translate-x-1/2'
                        : 'sm:-left-4 sm:-translate-x-1/2'
                    }`}
                  >
                    <FiBriefcase size={12} />
                  </span>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-border bg-card p-4 sm:p-6"
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                      {item.date}
                    </span>
                    <h3 className="mt-1 font-heading text-base font-bold text-foreground sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {item.org}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
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
