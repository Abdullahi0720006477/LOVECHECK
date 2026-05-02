import React from 'react'

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
  const ready = name1.trim().length > 0 && name2.trim().length > 0

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && ready && !loading) onContinue()
  }

  return (
    <div
      className="rounded-3xl p-7 relative overflow-hidden"
      style={{ background: 'rgba(20,14,32,0.95)', border: '1px solid rgba(255,79,139,0.18)', boxShadow: '0 25px 80px rgba(255,79,139,0.1)' }}
    >
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(192,132,252,0.1)' }} />

      <div className="relative space-y-7">

        {/* Name 1 — YOUR name */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 font-label text-[9px] tracking-[0.28em] uppercase font-bold" style={{ color: '#ff4f8b' }}>
            <span>💝</span> Your Name
          </label>
          <div className="relative">
            <input
              className="w-full py-4 px-4 rounded-2xl font-headline text-xl italic uppercase tracking-tight outline-none transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${name1 ? 'rgba(255,79,139,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: '#f1f5f9',
                caretColor: '#ff4f8b',
              }}
              placeholder="Your name here..."
              type="text"
              value={name1}
              onChange={e => setName1(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              autoFocus
            />
            {name1 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">✅</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span className="text-2xl" style={{ filter: 'drop-shadow(0 0 8px rgba(255,79,139,0.6))', animation: 'pulse 1.5s infinite' }}>
            💗
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Name 2 — WHO they love */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 font-label text-[9px] tracking-[0.28em] uppercase font-bold" style={{ color: '#c084fc' }}>
            <span>😍</span> Who Do You Love?
          </label>
          <div className="relative">
            <input
              className="w-full py-4 px-4 rounded-2xl font-headline text-xl italic uppercase tracking-tight outline-none transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${name2 ? 'rgba(192,132,252,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: '#f1f5f9',
                caretColor: '#c084fc',
              }}
              placeholder="Their name here..."
              type="text"
              value={name2}
              onChange={e => setName2(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            {name2 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">✅</span>
            )}
          </div>
        </div>

        {/* Hint when both filled */}
        {ready && (
          <div
            className="rounded-2xl p-3 text-center font-label text-[10px] tracking-widest uppercase font-bold animate-pulse"
            style={{ background: 'rgba(255,79,139,0.08)', border: '1px solid rgba(255,79,139,0.2)', color: '#ff4f8b' }}
          >
            🔍 Ready to expose the truth...
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={onContinue}
          disabled={!ready || loading}
          className="w-full py-5 rounded-2xl font-label font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 active:scale-95 relative overflow-hidden"
          style={{
            background: ready
              ? 'linear-gradient(135deg, #ff4f8b 0%, #c084fc 50%, #ff4f8b 100%)'
              : 'rgba(255,255,255,0.05)',
            border: ready ? 'none' : '1px solid rgba(255,255,255,0.08)',
            color: ready ? '#fff' : 'rgba(255,255,255,0.2)',
            boxShadow: ready ? '0 10px 40px rgba(255,79,139,0.35)' : 'none',
            cursor: ready ? 'pointer' : 'not-allowed',
          }}
        >
          {ready ? '👆 Scan Your Thumb →' : 'Enter both names first 🙏'}
        </button>

        {/* Warning footer */}
        <p className="text-center font-label text-[8px] tracking-widest uppercase opacity-30">
          ⚠️ Results may reveal uncomfortable truths
        </p>

        {error && (
          <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <p className="font-label text-[10px] tracking-widest uppercase" style={{ color: '#ef4444' }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
