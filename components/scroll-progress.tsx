'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-primary to-secondary"
      />
      <AnimatePresence>
        {visible && (
          <motion.a
            href="#home"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ y: -4 }}
            aria-label="Scroll to top"
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
          >
            <FiArrowUp size={20} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  )
}
