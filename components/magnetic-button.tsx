'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
  download?: boolean | string
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  download,
  type = 'button',
  disabled,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setPos({ x: x * 0.25, y: y * 0.25 })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  const styles = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 sm:px-6 sm:py-3',
    variant === 'primary' &&
      'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25',
    variant === 'outline' &&
      'border border-border bg-transparent text-foreground hover:border-primary hover:text-primary',
    variant === 'ghost' && 'bg-card text-foreground hover:bg-muted',
    className,
  )

  const inner = <span className="flex items-center gap-2">{children}</span>

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.3 }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          download={download}
          target={href.startsWith('#') ? undefined : '_blank'}
          rel={href.startsWith('#') ? undefined : 'noreferrer'}
          className={styles}
          {...rest}
        >
          {inner}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={styles}
          {...rest}
        >
          {inner}
        </button>
      )}
    </motion.div>
  )
}
