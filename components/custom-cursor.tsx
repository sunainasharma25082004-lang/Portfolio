'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Only run on desktop devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null ||
        target.classList.contains('interactive')

      setIsHovered(!!isInteractive)
    }

    const handleMouseLeaveWindow = () => setIsVisible(false)
    const handleMouseEnterWindow = () => setIsVisible(true)

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
    }
  }, [])

  if (!mounted || !isVisible) return null

  return (
    <>
      {/* Outer Glowing Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.07), transparent 80%)`,
        }}
      />

      {/* Small Glowing Cursor Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-primary/50 mix-blend-screen shadow-[0_0_15px_rgba(99,102,241,0.5)]"
        animate={{
          x: position.x - (isHovered ? 24 : 12),
          y: position.y - (isHovered ? 24 : 12),
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          borderColor: isHovered ? 'rgba(56, 189, 248, 0.8)' : 'rgba(99, 102, 241, 0.5)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
          mass: 0.1,
        }}
      />
    </>
  )
}
