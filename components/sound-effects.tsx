'use client'

import { useEffect, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

export function SoundEffects() {
  const [mounted, setMounted] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const playChime = () => {
    if (muted) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15) // C6

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.16)
    } catch {
      // Audio context ignored if blocked
    }
  }

  useEffect(() => {
    if (muted || !mounted) return

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.closest('button') ||
        target?.closest('a')
      ) {
        playChime()
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [muted, mounted])

  if (!mounted) return null

  return (
    <div className="fixed bottom-24 right-5 z-40">
      <button
        onClick={() => {
          setMuted((prev) => !prev)
          if (muted) playChime()
        }}
        title={muted ? 'Enable UI Audio Feedback' : 'Mute UI Audio'}
        aria-label={muted ? 'Enable audio feedback' : 'Mute audio feedback'}
        className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-lg transition-all active:scale-90 ${
          !muted
            ? 'border-primary/50 bg-primary/20 text-primary shadow-primary/20'
            : 'border-border bg-card/80 text-muted-foreground hover:text-foreground'
        }`}
      >
        {!muted ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
      </button>
    </div>
  )
}
