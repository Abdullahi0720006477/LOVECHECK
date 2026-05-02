import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface InputCardProps {
  name1: string
  name2: string
  setName1: (v: string) => void
  setName2: (v: string) => void
  onContinue: () => void
  loading: boolean
  error: string | null
}

export const InputCard: React.FC<InputCardProps> = ({
  name1, name2, setName1, setName2, onContinue, loading, error,
}) => {
  const { isDark } = useTheme()
  const ready = name1.trim().length > 0 && name2.trim().length > 0

  const card    = isDark ? 'rgba(20,14,32,0.97)' : 'rgba(255,255,255,0.98)'
  const textCol = isDark ? '#f1f5f9' : '#1a0a2e'
  const muted   = isDark ? 'rgba(241,245,249,0.45)' : 'rgba(26,10,46,0.45)'
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,79,139,0.03)'

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && ready && !loading) onContinue()
  }

  return (
    <div
      className="rounded-3xl p-7 relative overflow-hidden"
      style={{ background: card, border: '1.5px solid rgba(255,79,139,0.18)', boxShadow: isDark ? '0 25px 80px rgba(255,79,139,0.1)' : '0 8px 40px rgba(255,79,139,0.08)' }}
    >
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-28 h-28 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(192,132,252,0.1)' }} />

      <div className="relative space-y-6">

        {/* Your Name */}
        <div>
          <label className="flex items-center gap-1.5 font-label text-[9px] tracking-[0.28em] uppercase font-black mb-2" style={{ color: '#ff4f8b' }}>
            💝 Your Name
          </label>
          <div className="relative">
            <input
              className="w-full py-3.5 px-4 rounded-2xl font-headline text-xl italic uppercase tracking-tight outline-none transition-all duration-300"
              style={{ background: inputBg, border: `1.5px solid ${name1 ? 'rgba(255,79,139,0.55)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`, color: textCol, caretColor: '#ff4f8b' }}
              placeholder="Your name..."
              type="text"
              value={name1}
              onChange={e => setName1(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              autoFocus
            />
            {name1 && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base">✅</span>}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />
          <span className="text-xl" style={{ filter: 'drop-shadow(0 0 8px rgba(255,79,139,0.6))', animation: 'pulse 1.5s infinite' }}>💗</span>
          <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />
        </div>

        {/* Who you love */}
        <div>
          <label className="flex items-center gap-1.5 font-label text-[9px] tracking-[0.28em] uppercase font-black mb-2" style={{ color: '#c084fc' }}>
            😍 Who Do You Love?
          </label>
          <div className="relative">
            <input
              className="w-full py-3.5 px-4 rounded-2xl font-headline text-xl italic uppercase tracking-tight outline-none transition-all duration-300"
              style={{ background: inputBg, border: `1.5px solid ${name2 ? 'rgba(192,132,252,0.55)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`, color: textCol, caretColor: '#c084fc' }}
              placeholder="Their name..."
              type="text"
              value={name2}
              onChange={e => setName2(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            {name2 && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base">✅</span>}
          </div>
        </div>

        {/* Ready hint */}
        {ready && (
          <div
            className="rounded-2xl p-2.5 text-center font-label text-[9px] tracking-widest uppercase font-black animate-pulse"
            style={{ background: 'rgba(255,79,139,0.08)', border: '1px solid rgba(255,79,139,0.2)', color: '#ff4f8b' }}
          >
            🔍 Ready to reveal the truth...
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onContinue}
          disabled={!ready || loading}
          className="w-full py-5 rounded-2xl font-label font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 active:scale-95"
          style={{
            background: ready ? 'linear-gradient(135deg,#ff4f8b 0%,#c084fc 50%,#ff4f8b 100%)' : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            border: ready ? 'none' : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
            color: ready ? '#fff' : muted,
            boxShadow: ready ? '0 10px 40px rgba(255,79,139,0.3)' : 'none',
            cursor: ready ? 'pointer' : 'not-allowed',
          }}
        >
          {ready ? '👆 Scan Your Thumb →' : 'Enter both names first 🙏'}
        </button>

        {/* Disclaimer */}
        <p className="text-center font-label text-[8px] tracking-widest uppercase" style={{ color: muted, opacity: 0.55 }}>
          ⚠️ Results may reveal uncomfortable truths
        </p>

        {error && (
          <div className="rounded-2xl p-3 text-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
            <p className="font-label text-[10px] tracking-widest uppercase" style={{ color: '#ef4444' }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
