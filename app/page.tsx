'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ScrollProgress } from '@/components/scroll-progress'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Experience } from '@/components/sections/experience'
import { Services } from '@/components/sections/services'
import { Testimonials } from '@/components/sections/testimonials'
import { Contact } from '@/components/sections/contact'

import { ParticleBackground } from '@/components/particle-background'
import { CustomCursor } from '@/components/custom-cursor'
import { CodePlayground } from '@/components/code-playground'
import { CommandPalette } from '@/components/command-palette'
import { ResumeModal } from '@/components/resume-modal'
import { ProjectModal } from '@/components/project-modal'
import { SoundEffects } from '@/components/sound-effects'
import { projects, Project } from '@/lib/data'

export default function Page() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null)

  useEffect(() => {
    const handleOpenCommandPalette = () => setIsCommandPaletteOpen(true)
    window.addEventListener('open-command-palette', handleOpenCommandPalette)
    return () => window.removeEventListener('open-command-palette', handleOpenCommandPalette)
  }, [])

  const handleSelectProjectFromPalette = (projectId: string) => {
    const found = projects.find((p) => p.id === projectId)
    if (found) {
      setSelectedProjectModal(found)
    }
  }

  return (
    <>
      {/* Creative Backgrounds & Cursor Interactivity */}
      <ParticleBackground />
      <CustomCursor />
      <SoundEffects />

      <ScrollProgress />
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      <main className="relative z-10">
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <About />
        <CodePlayground />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Global Creative Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={handleSelectProjectFromPalette}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <ProjectModal
        project={selectedProjectModal}
        onClose={() => setSelectedProjectModal(null)}
      />
    </>
  )
}
