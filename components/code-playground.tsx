'use client'

import { useState } from 'react'
import {
  FiTerminal,
  FiCode,
  FiUser,
  FiSend,
  FiCopy,
  FiCheck,
  FiLayers,
  FiPlay,
  FiZap,
} from 'react-icons/fi'
import { personal } from '@/lib/data'

interface HistoryItem {
  cmd: string
  output: React.ReactNode
}

export function CodePlayground() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'config' | 'stack'>('terminal')
  const [inputVal, setInputVal] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      cmd: 'welcome',
      output: (
        <div className="text-cyan-400 font-mono text-xs sm:text-sm leading-relaxed">
          <p>🚀 Sunaina Sharma Interactive Developer CLI [v2.5.0]</p>
          <p className="text-slate-400">Type <span className="text-emerald-400 font-bold">help</span> to list available commands or click quick presets below.</p>
        </div>
      ),
    },
  ])

  const handleCommand = (commandOverride?: string) => {
    const cmd = (commandOverride || inputVal).trim().toLowerCase()
    if (!cmd) return

    let output: React.ReactNode

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p><strong className="text-cyan-400">help</strong> — Display available terminal commands</p>
            <p><strong className="text-cyan-400">skills</strong> — Print technical skills &amp; stack</p>
            <p><strong className="text-cyan-400">projects</strong> — Show live production web &amp; Play Store apps</p>
            <p><strong className="text-cyan-400">contact</strong> — Get email &amp; WhatsApp details</p>
            <p><strong className="text-cyan-400">hire</strong> — Direct recruiter WhatsApp launch</p>
            <p><strong className="text-cyan-400">clear</strong> — Clear terminal screen</p>
          </div>
        )
        break
      case 'skills':
        output = (
          <div className="space-y-1 text-purple-300 text-xs font-mono">
            <p>⚡ <strong className="text-white">Mobile:</strong> React Native, Expo, Play Store Publishing</p>
            <p>⚡ <strong className="text-white">Frontend:</strong> React.js 19, Next.js 15, TypeScript, Tailwind CSS</p>
            <p>⚡ <strong className="text-white">Backend:</strong> Node.js, Express.js, REST APIs, JWT Auth</p>
            <p>⚡ <strong className="text-white">Databases:</strong> MongoDB, PostgreSQL, Mongoose</p>
          </div>
        )
        break
      case 'projects':
        output = (
          <div className="space-y-1 text-sky-300 text-xs font-mono">
            <p>🎬 <strong className="text-white">VIZ TV OTT:</strong> 4K Streaming Play Store app</p>
            <p>📱 <strong className="text-white">Fluencer:</strong> Paid creator brand deals Play Store app</p>
            <p>❤️ <strong className="text-white">Rishta24:</strong> Matrimonial React Native app</p>
            <p>🌾 <strong className="text-white">FarmMart24:</strong> Organic farm e-commerce (farmart24.com)</p>
            <p>🔮 <strong className="text-white">AstroStar:</strong> Astrologer Kundli platform</p>
          </div>
        )
        break
      case 'contact':
        output = (
          <div className="space-y-1 text-emerald-300 text-xs font-mono">
            <p>📧 Email: {personal.email}</p>
            <p>📱 Phone / WhatsApp: {personal.phone}</p>
            <p>🌐 GitHub: {personal.github}</p>
          </div>
        )
        break
      case 'hire':
        output = (
          <div className="space-y-1 text-amber-300 text-xs font-mono">
            <p>🎉 Sunaina is available for full-time roles &amp; custom projects!</p>
            <p>Opening direct WhatsApp chat...</p>
            {setTimeout(() => {
              window.open(personal.whatsapp, '_blank')
            }, 800) as unknown as number}
          </div>
        )
        break
      case 'clear':
        setHistory([])
        setInputVal('')
        return
      default:
        output = (
          <p className="text-rose-400 text-xs font-mono">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-cyan-400 font-bold">help</span> for available commands.
          </p>
        )
    }

    setHistory((prev) => [...prev, { cmd, output }])
    setInputVal('')
  }

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const codeSnippet = `// developer.config.ts
export const sunainaProfile = {
  name: "${personal.name}",
  role: "${personal.title}",
  company: "VIZ Digital — Motiaz Zirakpur",
  status: "Available for Projects & Roles 🚀",
  primaryStack: [
    "React Native",
    "React.js 19",
    "Next.js 15",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Play Store Deployment"
  ],
  contact: {
    email: "${personal.email}",
    whatsapp: "${personal.phone}"
  },
  capabilities: "A-to-Z Full Stack, UI/UX Design, Mobile Publishing"
};`

  const jsonSnippet = `{
  "developer": "Sunaina Sharma",
  "experience": "1+ Year Professional",
  "appsCount": "20+ Production Applications",
  "specialization": ["Play Store Apps", "MERN Stack", "Next.js Platforms"],
  "location": "Zirakpur / Mohali / Remote",
  "openForHire": true
}`

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/35 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-400 backdrop-blur-md">
            <FiCode size={14} /> Interactive Developer Playground
          </span>
          <h2 className="mt-3.5 text-3xl font-black text-white sm:text-4xl">
            Live Interactive <span className="gradient-text">Developer IDE &amp; Shell</span>
          </h2>
          <p className="mt-2.5 text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Test CLI terminal commands, inspect live profile specs, or view developer JSON configuration.
          </p>
        </div>

        {/* IDE Outer Window */}
        <div className="overflow-hidden rounded-3xl border border-cyan-500/35 bg-[#090e17] shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">
          {/* Top Window Title Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#0d1424] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-slate-400 font-semibold hidden sm:inline">
                sunaina-sharma-dev-terminal
              </span>
            </div>

            {/* IDE Tabs Switcher */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FiTerminal size={13} /> CLI Shell
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  activeTab === 'config'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FiCode size={13} /> developer.config.ts
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  activeTab === 'stack'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FiLayers size={13} /> profile.json
              </button>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-4 sm:p-6 min-h-[320px] flex flex-col justify-between">
            {activeTab === 'terminal' && (
              <div>
                {/* Preset Fast Command Buttons */}
                <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400 mr-1">Fast Commands:</span>
                  {['help', 'skills', 'projects', 'contact', 'hire', 'clear'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleCommand(cmd)}
                      className="rounded-md border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-[11px] font-mono font-bold text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>

                {/* History list */}
                <div className="space-y-3 font-mono text-xs sm:text-sm overflow-y-auto max-h-[260px] pr-2">
                  {history.map((h, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-emerald-400 font-bold">sunaina@portfolio:~$</span>
                        <span className="text-white font-bold">{h.cmd}</span>
                      </div>
                      <div className="pl-4">{h.output}</div>
                    </div>
                  ))}
                </div>

                {/* Input Prompt */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleCommand()
                  }}
                  className="mt-4 flex items-center gap-2 border-t border-slate-800 pt-3"
                >
                  <span className="text-emerald-400 font-mono text-xs sm:text-sm font-bold shrink-0">
                    sunaina@portfolio:~$
                  </span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type command (e.g. help, skills, projects, hire)..."
                    className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all shrink-0"
                  >
                    <FiSend size={14} />
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="relative">
                <button
                  onClick={() => copyCode(codeSnippet)}
                  className="absolute right-2 top-2 flex items-center gap-1 rounded-lg border border-indigo-500/40 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
                >
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs sm:text-sm text-indigo-200 leading-relaxed border border-slate-800">
                  {codeSnippet}
                </pre>
              </div>
            )}

            {activeTab === 'stack' && (
              <div className="relative">
                <button
                  onClick={() => copyCode(jsonSnippet)}
                  className="absolute right-2 top-2 flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
                >
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
                <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed border border-slate-800">
                  {jsonSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
