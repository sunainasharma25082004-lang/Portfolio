'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { personal } from '@/lib/data'

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group">
      {/* Tooltip Label */}
      <span className="hidden sm:inline-block rounded-xl border border-emerald-500/40 bg-slate-950/90 px-3 py-1.5 text-xs font-black text-emerald-400 shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat with Sunaina 💬
      </span>

      <motion.a
        href={personal.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 font-bold shadow-2xl shadow-emerald-500/40 transition-all focus:outline-none"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-300" />
        </span>
        <FaWhatsapp size={32} />
      </motion.a>
    </div>
  )
}
