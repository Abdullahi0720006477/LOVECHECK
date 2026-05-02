import React, { useState } from 'react'
import { Header } from './components/Header'
import { InputCard } from './components/InputCard'
import { ThumbScanner } from './components/ThumbScanner'
import { ResultCard } from './components/ResultCard'
import { FloatingHearts } from './components/FloatingHearts'
import { LoveResult } from './types'
import { checkLove } from './api/loveCheck'
import { useTheme } from './context/ThemeContext'

type Step = 'input' | 'scan' | 'result'

const FACTS = [
  '🔬 Powered by certified love science™',
  '👀 34,821 cheaters exposed today',
  '💍 12,004 soulmates found this week',
  '🚩 Red flags caught: 99,999+',
  '📵 Do NOT show this to your ex',
  '🧬 Biometric thumb DNA activated',
  '☕ The tea has been spilled',
]

const App: React.FC = () => {
  const { isDark } = useTheme()
  const [name1, setName1]   = useState('')
  const [name2, setName2]   = useState('')
  const [step, setStep]     = useState<Step>('input')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<LoveResult | null>(null)
  const [error, setError]   = useState<string | null>(null)
  const [showHearts, setShowHearts] = useState(false)
  const [factIdx]           = useState(() => Math.floor(Math.random() * FACTS.length))

  const handleContinue = () => {
    if (!name1.trim() || !name2.trim()) return
    setError(null)
    setStep('scan')
  }

  const handleScanComplete = async () => {
    setLoading(true)
    try {
      const data = await checkLove(name1, name2)
      setResult(data)
      setStep('result')
      if (data.percentage >= 65) {
        setShowHearts(true)
        setTimeout(() => setShowHearts(false), 5000)
      }
    } catch {
      setError('Something broke — maybe the love was too powerful 💥')
      setStep('input')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setName1(''); setName2(''); setResult(null); setError(null)
    setStep('input'); setLoading(false)
  }

  const textCol  = isDark ? '#f1f5f9' : '#1a0a2e'
  const mutedCol = isDark ? 'rgba(241,245,249,0.45)' : 'rgba(26,10,46,0.45)'

  return (
    /* Root div carries the .light class for CSS variable switching */
    <div
      className={isDark ? '' : 'light'}
      style={{ minHeight: '100vh', background: 'var(--c-bg)', color: textCol, fontFamily: 'inherit', transition: 'background 0.4s, color 0.3s' }}
    >
      <Header />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[130px]" style={{ background: 'var(--c-blob1)' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[130px]" style={{ background: 'var(--c-blob2)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px]" style={{ background: 'var(--c-blob3)' }} />
      </div>

      <main className="relative z-10 pt-20 pb-24 px-4 flex flex-col items-center">

        {/* ── HERO ── */}
        {step !== 'result' && (
          <section className="text-center mb-8 max-w-sm w-full">
            <div className="text-5xl mb-3 inline-block" style={{ filter: 'drop-shadow(0 0 28px rgba(255,79,139,0.55))', animation: 'pulse 2s infinite' }}>💗</div>
            <h1
              className="font-headline font-black tracking-tighter italic mb-2"
              style={{ fontSize: 'clamp(3rem,14vw,5rem)', background: 'linear-gradient(135deg,#ff4f8b 0%,#c084fc 50%,#ff4f8b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              LoveCheck
            </h1>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: mutedCol }}>
              Enter names → Scan thumb → Get the truth 💀
            </p>
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(255,79,139,0.1)', border: '1px solid rgba(255,79,139,0.22)', color: '#ff4f8b' }}
            >
              <span className="animate-pulse">📡</span>
              {FACTS[factIdx]}
            </div>
          </section>
        )}

        {/* ── STEP DOTS ── */}
        {step !== 'result' && (
          <div className="flex items-center gap-2 mb-7">
            {(['input', 'scan'] as Step[]).map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500"
                    style={{
                      background: step === s ? 'linear-gradient(135deg,#ff4f8b,#c084fc)' : step === 'scan' && s === 'input' ? 'rgba(74,222,128,0.2)' : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                      border: `2px solid ${step === s ? 'transparent' : step === 'scan' && s === 'input' ? '#4ade80' : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                      color: step === s ? '#fff' : step === 'scan' && s === 'input' ? '#4ade80' : mutedCol,
                    }}
                  >
                    {step === 'scan' && s === 'input' ? '✓' : i + 1}
                  </div>
                  <span className="font-label text-[8px] tracking-widest uppercase" style={{ color: mutedCol }}>
                    {s === 'input' ? '✏️ Names' : '👆 Scan'}
                  </span>
                </div>
                {i < 1 && (
                  <div className="w-10 h-px mb-5 transition-all duration-700"
                    style={{ background: step === 'scan' ? 'linear-gradient(90deg,#4ade80,#ff4f8b)' : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── CONTENT ── */}
        <div className="w-full max-w-sm space-y-4">

          {step === 'input' && (
            <InputCard name1={name1} name2={name2} setName1={setName1} setName2={setName2}
              onContinue={handleContinue} loading={loading} error={error} />
          )}

          {step === 'scan' && (
            <div className="space-y-4">
              <ThumbScanner name1={name1} name2={name2} onScanComplete={handleScanComplete} />
              {loading && (
                <div className="rounded-2xl p-4 flex items-center gap-3"
                  style={{ background: 'rgba(255,79,139,0.08)', border: '1px solid rgba(255,79,139,0.2)' }}>
                  <span className="text-2xl animate-spin inline-block">🔄</span>
                  <div>
                    <p className="font-label text-[10px] tracking-widest uppercase font-bold" style={{ color: '#ff4f8b' }}>
                      Consulting the love oracle...
                    </p>
                    <p className="font-label text-[9px] tracking-widest uppercase mt-0.5" style={{ color: mutedCol }}>
                      Spilling the tea ☕
                    </p>
                  </div>
                </div>
              )}
              {!loading && (
                <button onClick={() => setStep('input')}
                  className="font-label text-[10px] tracking-widest uppercase opacity-40 hover:opacity-80 transition-opacity flex items-center justify-center gap-1.5 mx-auto"
                  style={{ color: textCol }}>
                  ← Change Names
                </button>
              )}
            </div>
          )}

          {step === 'result' && result && (
            <>
              <p className="text-center font-label text-[9px] tracking-[0.3em] uppercase" style={{ color: mutedCol }}>
                🔮 The Verdict Is In
              </p>
              <ResultCard result={result} name1={name1} name2={name2} onReset={handleReset} />
            </>
          )}
        </div>

        {/* ── BOTTOM STATS (input only) ── */}
        {step === 'input' && (
          <div className="w-full max-w-sm mt-12 grid grid-cols-3 gap-3">
            {[
              { emoji: '💍', number: '12K+', label: 'Soulmates Found' },
              { emoji: '🚩', number: '99K+', label: 'Red Flags Caught' },
              { emoji: '👀', number: '34K+', label: 'Cheaters Exposed' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-3.5 text-center"
                style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)' }}>
                <p className="text-xl mb-1">{s.emoji}</p>
                <p className="font-headline text-lg font-black" style={{ color: '#ff4f8b' }}>{s.number}</p>
                <p className="font-label text-[7px] tracking-wider uppercase leading-tight mt-0.5" style={{ color: mutedCol }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

      </main>

      <footer className="relative z-10 pb-8 px-4 text-center">
        <p className="font-label text-[8px] uppercase tracking-[0.3em]" style={{ color: mutedCol, opacity: 0.5 }}>
          © 2026 LOVECHECK · For entertainment only · Do not use as relationship advice 😂
        </p>
      </footer>

      <div className="fixed bottom-0 left-0 w-full h-40 pointer-events-none z-0"
        style={{ background: `linear-gradient(to top, ${isDark ? '#0d0816' : '#fdf4ff'}, transparent)` }} />

      {showHearts && <FloatingHearts />}
    </div>
  )
}

export default App
