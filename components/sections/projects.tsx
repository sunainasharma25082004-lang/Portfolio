'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiExternalLink,
  FiGithub,
  FiPlay,
  FiPause,
  FiX,
  FiCheckCircle,
  FiMaximize2,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiLayers,
  FiGrid,
  FiMonitor,
  FiActivity,
  FiGlobe,
  FiCode,
  FiCpu,
  FiSmartphone,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/motion'
import { projects, type Project } from '@/lib/data'

const categories = ['All', 'Full Stack', 'Mobile App', 'Frontend', 'Web Apps'] as const

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'spotlight' | 'grid'>('spotlight')
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState<number>(0)
  const [spotlightTab, setSpotlightTab] = useState<'features' | 'tech' | 'links'>('features')
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true)
  const [isMuted, setIsMuted] = useState<boolean>(true)

  const [detailProject, setDetailProject] = useState<Project | null>(null)
  const [activeVideoModal, setActiveVideoModal] = useState<Project | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)

  const featuredProjects = projects

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true
    return p.category === selectedCategory
  })

  const currentFeatured = featuredProjects[activeFeaturedIndex] || featuredProjects[0]

  useEffect(() => {
    if (videoRef.current) {
      if (isPlayingVideo) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlayingVideo, activeFeaturedIndex])

  const openDetails = (project: Project) => {
    setDetailProject(project)
    setActiveImageIndex(0)
  }

  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background Decorative Neon Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div variants={staggerContainer} initial="show" animate="show">
          <SectionHeading
            eyebrow="Interactive Production Showcase"
            title="Featured Projects & Client Applications"
            description="Explore live production web platforms and Android apps published on the Google Play Store built with Next.js, React Native, Node.js, and MongoDB."
          />

          {/* RECRUITER IMPACT STATS BAR */}
          <motion.div variants={fadeUp} className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-card/80 p-4 backdrop-blur-md shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <FiGlobe size={22} />
              </div>
              <div>
                <div className="text-lg font-black text-foreground sm:text-xl">3+ Live</div>
                <div className="text-[11px] font-bold text-muted-foreground">Production Web Apps</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-card/80 p-4 backdrop-blur-md shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <FiSmartphone size={22} />
              </div>
              <div>
                <div className="text-lg font-black text-foreground sm:text-xl">Google Play</div>
                <div className="text-[11px] font-bold text-muted-foreground">Published Mobile Apps</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-card/80 p-4 backdrop-blur-md shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <FiCode size={22} />
              </div>
              <div>
                <div className="text-lg font-black text-foreground sm:text-xl">MERN &amp; Next</div>
                <div className="text-[11px] font-bold text-muted-foreground">Full Stack Architecture</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-card/80 p-4 backdrop-blur-md shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <FiActivity size={22} />
              </div>
              <div>
                <div className="text-lg font-black text-foreground sm:text-xl">REST &amp; DB</div>
                <div className="text-[11px] font-bold text-muted-foreground">MongoDB &amp; PostgreSQL</div>
              </div>
            </div>
          </motion.div>

          {/* MAIN SPOTLIGHT SHOWCASE CAROUSEL */}
          {featuredProjects.length > 0 && (
            <motion.div variants={fadeUp} className="mb-12">
              <div className="relative overflow-hidden rounded-2xl border border-primary/35 bg-card/90 p-5 sm:p-6 md:p-8 shadow-xl backdrop-blur-2xl">
                {/* Top Selector Tabs Bar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                      <FiStar className="fill-amber-400" size={13} /> Production Spotlight
                    </span>
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-muted-foreground">
                      ({activeFeaturedIndex + 1}/{featuredProjects.length})
                    </span>
                  </div>

                  {/* Project Selector Switcher */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                    {featuredProjects.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveFeaturedIndex(idx)
                          setIsPlayingVideo(true)
                        }}
                        className={`shrink-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                          activeFeaturedIndex === idx
                            ? 'bg-primary text-primary-foreground shadow-md scale-105'
                            : 'border border-border bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        <FiGlobe size={12} /> {p.title.split('—')[0].trim()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Spotlight Project View */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeatured.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-6 lg:grid-cols-12 lg:items-center"
                  >
                    {/* Left Column: Details & In-Card Interactive Tabs */}
                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-[11px] font-extrabold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                          </span>
                          {currentFeatured.id.includes('app') ? 'Live Play Store App' : 'Live Production Website'}
                        </span>
                        <span className="text-[11px] font-black text-primary uppercase tracking-wider">
                          {currentFeatured.category}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-heading text-xl font-black text-foreground sm:text-2xl lg:text-3xl">
                        {currentFeatured.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {currentFeatured.description}
                      </p>

                      {/* IN-CARD INTERACTIVE TABS */}
                      <div className="mt-4 rounded-xl border border-border bg-slate-950/60 p-3 backdrop-blur-md">
                        <div className="flex items-center gap-1.5 border-b border-border/80 pb-2">
                          <button
                            onClick={() => setSpotlightTab('features')}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                              spotlightTab === 'features'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            💡 Key Capabilities
                          </button>
                          <button
                            onClick={() => setSpotlightTab('tech')}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                              spotlightTab === 'tech'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            🛠️ Tech Stack
                          </button>
                          <button
                            onClick={() => setSpotlightTab('links')}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                              spotlightTab === 'links'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            🔗 Repos &amp; Links
                          </button>
                        </div>

                        <div className="mt-3 min-h-[90px]">
                          {spotlightTab === 'features' && (
                            <div className="grid grid-cols-2 gap-2">
                              {currentFeatured.highlights.map((h) => (
                                <div
                                  key={h}
                                  className="flex items-center gap-1.5 text-[11px] font-bold text-foreground/90"
                                >
                                  <FiCheckCircle size={14} className="text-secondary shrink-0" />
                                  <span className="truncate">{h}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {spotlightTab === 'tech' && (
                            <div className="flex flex-wrap gap-1.5">
                              {currentFeatured.tech.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-md border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}

                          {spotlightTab === 'links' && (
                            <div className="space-y-1 text-[11px] font-mono text-muted-foreground">
                              <div className="truncate">
                                🌐 <span className="font-bold text-foreground">Live App:</span>{' '}
                                <a
                                  href={currentFeatured.demo}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-primary underline hover:text-primary/80"
                                >
                                  {currentFeatured.demo}
                                </a>
                              </div>
                              <div className="truncate">
                                📂 <span className="font-bold text-foreground">GitHub Repo:</span>{' '}
                                <a
                                  href={currentFeatured.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-secondary underline hover:text-secondary/80"
                                >
                                  {currentFeatured.github}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-5 flex flex-wrap items-center gap-2.5">
                        <a
                          href={currentFeatured.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-extrabold text-primary-foreground shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary/90"
                        >
                          <FiExternalLink size={15} /> Launch App ↗
                        </a>
                        <a
                          href={currentFeatured.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground transition-all hover:border-foreground/40 hover:bg-accent"
                        >
                          <FiGithub size={15} /> GitHub Code
                        </a>
                        {currentFeatured.videoDemo && (
                          <button
                            onClick={() => setActiveVideoModal(currentFeatured)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-secondary/40 bg-secondary/10 px-4 py-2.5 text-xs font-bold text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
                          >
                            <FiPlay size={14} /> Fullscreen Video
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Column: REALISTIC COMPACT DEVICE FRAME WITH LIVE AUTOPLAY VIDEO / SCREENSHOT */}
                    <div className="lg:col-span-5 flex justify-center">
                      {currentFeatured.videoDemo ? (
                        /* MOBILE SMARTPHONE DEVICE FRAME */
                        <div className="relative w-full max-w-[240px] sm:max-w-[260px] rounded-[36px] border-[5px] border-slate-800 bg-slate-950 p-1.5 shadow-[0_0_35px_rgba(99,102,241,0.25)] transition-transform duration-300 hover:scale-[1.02]">
                          {/* iPhone Notch Dynamic Island */}
                          <div className="absolute top-3 left-1/2 z-20 h-3.5 w-24 -translate-x-1/2 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-end px-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>

                          {/* Controls Bar Overlay */}
                          <div className="absolute top-8 right-4 z-20 flex gap-1.5">
                            <button
                              onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                              className="rounded-full bg-black/70 p-1.5 text-white backdrop-blur-md hover:bg-black"
                              title={isPlayingVideo ? 'Pause Video' : 'Play Video'}
                            >
                              {isPlayingVideo ? <FiPause size={12} /> : <FiPlay size={12} />}
                            </button>
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="rounded-full bg-black/70 p-1.5 text-white backdrop-blur-md hover:bg-black"
                              title={isMuted ? 'Unmute' : 'Mute'}
                            >
                              {isMuted ? <FiVolumeX size={12} /> : <FiVolume2 size={12} />}
                            </button>
                          </div>

                          {/* Phone Screen Display with Live Video */}
                          <div className="relative aspect-[9/18] w-full overflow-hidden rounded-[28px] bg-black">
                            <video
                              key={currentFeatured.id}
                              ref={videoRef}
                              src={currentFeatured.videoDemo}
                              autoPlay={isPlayingVideo}
                              loop
                              muted={isMuted}
                              playsInline
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute bottom-3 left-2 right-2 rounded-lg bg-black/70 p-2 backdrop-blur-md border border-white/10 text-center">
                              <span className="text-[10px] font-extrabold text-white">
                                🎬 Autoplay App Video
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* DESKTOP MACOS WINDOW FRAME FOR WEB APPS */
                        <div
                          className="group relative w-full cursor-pointer overflow-hidden rounded-xl border border-border/90 bg-slate-950 shadow-xl transition-all duration-300 hover:border-primary/60 hover:shadow-primary/20"
                          onClick={() => openDetails(currentFeatured)}
                        >
                          {/* macOS Window Top Bar */}
                          <div className="flex items-center justify-between border-b border-border/80 bg-slate-900/90 px-3 py-2 backdrop-blur-md">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                            </div>

                            {/* Address Bar */}
                            <div className="flex flex-1 max-w-[180px] items-center justify-center rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-white/10">
                              <span className="truncate">{currentFeatured.demo}</span>
                            </div>

                            <div className="text-[10px] font-bold text-primary">HTTPS 🔒</div>
                          </div>

                          {/* Screenshot Content Area */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                            <Image
                              src={currentFeatured.image}
                              alt={currentFeatured.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg bg-black/70 px-3 py-2 backdrop-blur-md border border-white/10">
                              <span className="text-[11px] font-bold text-white">
                                Click to inspect architecture
                              </span>
                              <span className="rounded-md bg-primary px-2.5 py-0.5 text-[10px] font-extrabold text-primary-foreground">
                                View Specs ↗
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* VIEW MODE & CATEGORY FILTER CONTROL BAR */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4"
          >
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md scale-105'
                      : 'border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
              <button
                onClick={() => setViewMode('spotlight')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === 'spotlight'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FiMonitor size={14} /> Spotlight
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FiGrid size={14} /> Grid ({filteredProjects.length})
              </button>
            </div>
          </motion.div>

          {/* ALL PROJECTS GRID */}
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  variants={scaleIn}
                  initial="show"
                  animate="show"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Window Bar Header */}
                  <div className="flex items-center justify-between border-b border-border/70 bg-muted/60 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500/70" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                      <span className="h-2 w-2 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                      {project.category}
                    </span>
                  </div>

                  {/* Image Display */}
                  <div
                    className="relative aspect-[16/9] overflow-hidden cursor-pointer bg-slate-950"
                    onClick={() => openDetails(project)}
                  >
                    <Image
                      src={project.image}
                          alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-90" />

                    {/* Video Demo Badge if available */}
                    {project.videoDemo && (
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-secondary/20 border border-secondary/40 px-2.5 py-0.5 text-[9px] font-bold text-secondary backdrop-blur-md flex items-center gap-1">
                        🎬 Video Demo
                      </span>
                    )}

                    {/* Live Badge if production */}
                    {project.demo.includes('http') && (
                      <span className="absolute top-2.5 right-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[9px] font-bold text-emerald-400 backdrop-blur-md">
                        🟢 Live Production
                      </span>
                    )}

                    {/* Hover Quick Action */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/65 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      {project.videoDemo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveVideoModal(project)
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-extrabold text-secondary-foreground shadow-md transition-transform hover:scale-105"
                        >
                          <FiPlay size={13} /> Watch Video
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openDetails(project)
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-105"
                      >
                        <FiMaximize2 size={13} /> View Specs
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3
                      onClick={() => openDetails(project)}
                      className="cursor-pointer font-heading text-base font-black text-foreground group-hover:text-primary transition-colors line-clamp-1"
                    >
                      {project.title}
                    </h3>

                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    {project.highlights && (
                      <div className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1 text-[11px]">
                        {project.highlights.slice(0, 2).map((h) => (
                          <span key={h} className="inline-flex items-center gap-1 font-semibold text-foreground/80">
                            <FiCheckCircle size={12} className="text-secondary shrink-0" /> {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-bold text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/80 pt-3">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-primary/30 bg-primary/10 py-2 text-xs font-extrabold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <FiExternalLink size={13} /> Live App ↗
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold text-foreground hover:border-foreground/40 transition-all"
                        title="View Source Code"
                      >
                        <FiGithub size={14} /> Code
                      </a>
                      <button
                        onClick={() => openDetails(project)}
                        className="flex items-center justify-center rounded-lg border border-border bg-muted/80 p-2 text-xs font-bold text-foreground hover:bg-accent hover:border-primary/40 transition-all"
                        title="View Full Details"
                      >
                        <FiInfo size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* GitHub Profile Callout */}
          <motion.div variants={fadeUp} className="mt-16 text-center">
            <a
              href="https://github.com/sunainasharma25082004-lang"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 text-sm font-extrabold text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-xl shadow-md"
            >
              <FiGithub size={20} /> Explore All Repositories on GitHub ↗
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* INTERACTIVE FULL DETAILS & SPECS MODAL */}
      <AnimatePresence>
        {detailProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setDetailProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailProject(null)}
                className="absolute top-5 right-5 rounded-full bg-muted/80 p-2.5 text-foreground hover:bg-accent border border-border transition-all z-10"
              >
                <FiX size={20} />
              </button>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-extrabold text-primary border border-primary/20 uppercase tracking-wider">
                  {detailProject.category}
                </span>
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <FiLayers size={14} /> Comprehensive Technical Specs
                </span>
              </div>

              <h2 className="mt-3 font-heading text-2xl font-black text-foreground sm:text-3xl">
                {detailProject.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {detailProject.description}
              </p>

              {/* Screenshots Carousel / Video Viewer */}
              {detailProject.screenshots.length > 0 && (
                <div className="mt-6">
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black cursor-pointer group"
                    onClick={() => setZoomImage(detailProject.screenshots[activeImageIndex])}
                  >
                    <Image
                      src={detailProject.screenshots[activeImageIndex]}
                      alt={`${detailProject.title} screenshot ${activeImageIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="rounded-xl bg-black/70 px-4 py-2 text-xs font-bold text-white backdrop-blur-md border border-white/20">
                        🔍 Click to Zoom Image
                      </span>
                    </div>

                    {detailProject.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : detailProject.screenshots.length - 1))
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black transition-all"
                        >
                          <FiChevronLeft size={22} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveImageIndex((prev) => (prev < detailProject.screenshots.length - 1 ? prev + 1 : 0))
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black transition-all"
                        >
                          <FiChevronRight size={22} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {detailProject.screenshots.length > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-3">
                      {detailProject.screenshots.map((img, idx) => (
                        <button
                          key={img + idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-14 w-24 overflow-hidden rounded-lg border-2 transition-all ${
                            activeImageIndex === idx ? 'border-primary scale-105' : 'border-border opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image src={img} alt="Thumbnail" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Highlights Grid */}
              {detailProject.highlights && (
                <div className="mt-6 border-t border-border pt-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground/70">
                    Key Architectural Features &amp; Capabilities
                  </h4>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {detailProject.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-muted/40 p-3 text-xs font-bold text-foreground">
                        <FiCheckCircle size={16} className="text-secondary shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mt-6 border-t border-border pt-6">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground/70">
                  Technologies Used
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {detailProject.tech.map((t) => (
                    <span key={t} className="rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-extrabold text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-border pt-6">
                {detailProject.videoDemo && (
                  <button
                    onClick={() => {
                      const p = detailProject
                      setDetailProject(null)
                      setActiveVideoModal(p)
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-secondary/40 bg-secondary/10 px-5 py-3 text-xs font-bold text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                  >
                    <FiPlay size={15} /> Watch Fullscreen Video
                  </button>
                )}
                <a
                  href={detailProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-foreground hover:bg-accent transition-all"
                >
                  <FiGithub size={16} /> GitHub Code
                </a>
                <a
                  href={detailProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
                >
                  <FiExternalLink size={16} /> Visit Live Web App ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN VIDEO MODAL */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {activeVideoModal.title} — Video Walkthrough
                  </h3>
                  <p className="text-xs text-muted-foreground">Interactive demo preview video</p>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="rounded-full bg-muted p-2 text-foreground hover:bg-card border border-border transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                {activeVideoModal.videoDemo?.includes('youtube') ? (
                  <iframe
                    src={activeVideoModal.videoDemo}
                    title={activeVideoModal.title}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeVideoModal.videoDemo}
                    controls
                    autoPlay
                    className="h-full w-full object-contain"
                  />
                )}
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <a
                  href={activeVideoModal.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                >
                  <FiExternalLink size={14} /> Open Live Web Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
