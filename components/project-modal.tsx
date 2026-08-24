'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCheckCircle,
  FiPlay,
  FiImage,
  FiLayers,
} from 'react-icons/fi'
import { Project } from '@/lib/data'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'media'>('overview')
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      setSelectedImage(project.image)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  if (!project) return null

  const isVideo = (url?: string) => Boolean(url && url.toLowerCase().includes('.mp4'))

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-xl"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-[#0d1322] p-5 shadow-2xl sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/80 text-muted-foreground transition-all hover:bg-card hover:text-foreground active:scale-95"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>

          {/* Header Tag & Title */}
          <div className="pr-12">
            <span className="inline-block rounded-full bg-primary/15 border border-primary/30 px-3.5 py-1 text-xs font-semibold text-primary">
              {project.category}
            </span>
            <h2 className="mt-3 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
              {project.title}
            </h2>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex items-center gap-2 border-b border-border/50 pb-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              <FiLayers size={16} /> Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === 'media'
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              {project.videoDemo ? <FiPlay size={16} /> : <FiImage size={16} />} Media & Screenshots
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="mt-6 grid gap-6 lg:grid-cols-5">
              {/* Media Preview Box */}
              <div className="lg:col-span-3 space-y-4">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 shadow-lg">
                  {project.videoDemo && isVideo(project.videoDemo) ? (
                    <video
                      key={project.id}
                      src={project.videoDemo}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-auto max-h-[320px] object-cover"
                    />
                  ) : (
                    <Image
                      src={selectedImage || project.image}
                      alt={project.title}
                      width={900}
                      height={600}
                      className="w-full h-auto max-h-[320px] object-cover"
                    />
                  )}
                </div>

                {/* Screenshots Selector Thumbnails */}
                {project.screenshots && project.screenshots.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {project.screenshots.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                          selectedImage === img ? 'border-primary scale-105' : 'border-border/50 opacity-70'
                        }`}
                      >
                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
                    >
                      <FiExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card/80 transition-all active:scale-95"
                    >
                      <FiGithub size={16} /> Source Code
                    </a>
                  )}
                </div>
              </div>

              {/* Text & Tech Info */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                </div>

                {/* Key Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Features & Architecture
                    </h3>
                    <ul className="mt-2.5 space-y-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <FiCheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Media Gallery */}
          {activeTab === 'media' && (
            <div className="mt-6 space-y-6">
              {project.videoDemo && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <FiPlay className="text-primary" /> Full Video Demo Walkthrough
                  </h3>
                  <div className="overflow-hidden rounded-2xl border border-border bg-black">
                    {isVideo(project.videoDemo) ? (
                      <video
                        src={project.videoDemo}
                        controls
                        className="w-full h-auto max-h-[450px]"
                      />
                    ) : (
                      <iframe
                        src={project.videoDemo}
                        className="w-full h-[360px]"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FiImage className="text-primary" /> Application Screenshots
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.screenshots.map((img, idx) => (
                    <div key={idx} className="overflow-hidden rounded-xl border border-border">
                      <Image
                        src={img}
                        alt={`Screenshot ${idx + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
