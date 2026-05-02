import React, { useState, useEffect } from 'react'

const TAGLINES = [
  'is it love? 💘',
  'or a red flag? 🚩',
  'or are they cheating? 👀',
  'spill the tea ☕',
  'the truth hurts 💀',
]

export const Header: React.FC = () => {
  const [tagIdx, setTagIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setTagIdx(i => (i + 1) % TAGLINES.length)
        setVisible(true)
      }, 300)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="fixed top-0 w-full z-50" style={{ background: 'rgba(15,10,25,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,79,139,0.12)' }}>
      <div className="flex items-center justify-between h-16 px-5 max-w-lg mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-pulse" style={{ filter: 'drop-shadow(0 0 10px #ff4f8b)' }}>💗</span>
          <span className="font-headline tracking-[0.15em] uppercase text-sm font-bold" style={{ color: '#ff4f8b' }}>
            Love<span style={{ color: '#c084fc' }}>Check</span>
          </span>
        </div>

        {/* Cycling tagline */}
        <div
          className="font-label text-[10px] tracking-widest uppercase transition-all duration-300"
          style={{ color: 'rgba(255,255,255,0.45)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-4px)' }}
        >
          {TAGLINES[tagIdx]}
        </div>

        {/* Vibe badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,79,139,0.1)', border: '1px solid rgba(255,79,139,0.25)' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="font-label text-[9px] tracking-widest uppercase" style={{ color: '#ff4f8b' }}>Live</span>
        </div>
      </div>
    </header>
  )
}
