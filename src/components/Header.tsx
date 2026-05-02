import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const TAGLINES = [
  'is it love? 💘',
  'or a red flag? 🚩',
  'or are they cheating? 👀',
  'spill the tea ☕',
  'the truth hurts 💀',
  'thumb never lies 👆',
]

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const [tagIdx, setTagIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setTagIdx(i => (i + 1) % TAGLINES.length)
        setVisible(true)
      }, 280)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{ background: 'var(--c-nav-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--c-nav-bdr)' }}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-sm mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl" style={{ filter: 'drop-shadow(0 0 8px #ff4f8b)', animation: 'pulse 2s infinite' }}>💗</span>
          <span className="font-headline tracking-[0.1em] uppercase text-sm font-black" style={{ color: '#ff4f8b' }}>
            Love<span style={{ color: isDark ? '#c084fc' : '#7c3aed' }}>Check</span>
          </span>
        </div>

        {/* Tagline */}
        <span
          className="font-label text-[9px] tracking-widest uppercase transition-all duration-280 hidden sm:block"
          style={{ color: 'var(--c-muted)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-3px)' }}
        >
          {TAGLINES[tagIdx]}
        </span>

        {/* Right side: live dot + theme toggle */}
        <div className="flex items-center gap-2">
          {/* Live indicator */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,79,139,0.1)', border: '1px solid rgba(255,79,139,0.22)' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-500"></span>
            </span>
            <span className="font-label text-[8px] tracking-widest uppercase" style={{ color: '#ff4f8b' }}>Live</span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-base transition-all duration-300 active:scale-90"
            style={{
              background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,79,139,0.1)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,79,139,0.25)'}`,
            }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

      </div>
    </header>
  )
}
