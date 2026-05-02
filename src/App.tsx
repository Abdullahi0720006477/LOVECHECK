import React, { useState } from 'react'
import { Header } from './components/Header'
import { InputCard } from './components/InputCard'
import { ThumbScanner } from './components/ThumbScanner'
import { ResultCard } from './components/ResultCard'
import { FloatingHearts } from './components/FloatingHearts'
import { LoveResult } from './types'
import { checkLove } from './api/loveCheck'

type Step = 'input' | 'scan' | 'result'

// Fun fact ticker
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
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [step, setStep] = useState<Step>('input')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<LoveResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHearts, setShowHearts] = useState(false)
  const [factIdx] = useState(() => Math.floor(Math.random() * FACTS.length))

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
    setName1('')
    setName2('')
    setResult(null)
    setError(null)
    setStep('input')
    setLoading(false)
  }

  return (
    <div
      className="font-body min-h-screen overflow-x-hidden relative"
      style={{ background: 'linear-gradient(160deg, #0d0816 0%, #130820 40%, #0f0a1a 100%)', color: '#f1f5f9' }}
    >
      <Header />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-[130px]" style={{ background: '#ff4f8b' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-[130px]" style={{ background: '#7c3aed' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-[100px]" style={{ background: '#c084fc' }} />
      </div>

      <main className="relative z-10 pt-24 pb-24 px-4 flex flex-col items-center">

        {/* ── HERO ── */}
        {step !== 'result' && (
          <section className="text-center mb-10 max-w-sm w-full">
            <div
              className="text-6xl mb-4 inline-block"
              style={{ filter: 'drop-shadow(0 0 30px rgba(255,79,139,0.6))', animation: 'pulse 2s infinite' }}
            >
              💗
            </div>
            <h1
              className="font-headline font-black tracking-tighter italic mb-3"
              style={{ fontSize: 'clamp(3rem,14vw,5.5rem)', background: 'linear-gradient(135deg, #ff4f8b 0%, #c084fc 50%, #ff4f8b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              LoveCheck
            </h1>
            <p className="text-sm uppercase tracking-widest opacity-60 mb-5">
              Enter names → Scan thumb → Get the truth 💀
            </p>

            {/* Ticker */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(255,79,139,0.1)', border: '1px solid rgba(255,79,139,0.2)', color: '#ff4f8b' }}
            >
              <span className="animate-pulse">📡</span>
              {FACTS[factIdx]}
            </div>
          </section>
        )}

        {/* ── STEP INDICATORS ── */}
        {step !== 'result' && (
          <div className="flex items-center gap-2 mb-8">
            {(['input', 'scan'] as Step[]).map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500"
                    style={{
                      background: step === s
                        ? 'linear-gradient(135deg,#ff4f8b,#c084fc)'
                        : step === 'scan' && s === 'input'
                        ? 'rgba(74,222,128,0.2)'
                        : 'rgba(255,255,255,0.07)',
                      border: `2px solid ${step === s ? 'transparent' : step === 'scan' && s === 'input' ? '#4ade80' : 'rgba(255,255,255,0.15)'}`,
                      color: step === s ? '#fff' : step === 'scan' && s === 'input' ? '#4ade80' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {step === 'scan' && s === 'input' ? '✓' : i + 1}
                  </div>
                  <span className="font-label text-[8px] tracking-widest uppercase opacity-40">
                    {s === 'input' ? '✏️ Names' : '👆 Scan'}
                  </span>
                </div>
                {i < 1 && (
                  <div
                    className="w-10 h-px mb-5 transition-all duration-700"
                    style={{ background: step === 'scan' ? 'linear-gradient(90deg,#4ade80,#ff4f8b)' : 'rgba(255,255,255,0.12)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── CONTENT ── */}
        <div className="w-full max-w-sm space-y-4">

          {step === 'input' && (
            <InputCard
              name1={name1}
              name2={name2}
              setName1={setName1}
              setName2={setName2}
              onContinue={handleContinue}
              loading={loading}
              error={error}
            />
          )}

          {step === 'scan' && (
            <div className="space-y-4">
              <ThumbScanner name1={name1} name2={name2} onScanComplete={handleScanComplete} />
              {loading && (
                <div
                  className="rounded-2xl p-5 flex items-center gap-4"
                  style={{ background: 'rgba(255,79,139,0.08)', border: '1px solid rgba(255,79,139,0.2)' }}
                >
                  <span className="text-2xl animate-spin inline-block">🔄</span>
                  <div>
                    <p className="font-label text-[10px] tracking-widest uppercase font-bold" style={{ color: '#ff4f8b' }}>
                      Consulting the love oracle...
                    </p>
                    <p className="font-label text-[9px] tracking-widest uppercase opacity-40 mt-0.5">
                      Spilling the tea ☕
                    </p>
                  </div>
                </div>
              )}
              {!loading && (
                <button
                  onClick={() => setStep('input')}
                  className="font-label text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 mx-auto"
                  style={{ color: '#f1f5f9' }}
                >
                  ← Change Names
                </button>
              )}
            </div>
          )}

          {step === 'result' && result && (
            <>
              {/* Result header */}
              <div className="text-center mb-2">
                <p className="font-label text-[10px] tracking-[0.3em] uppercase opacity-50">🔮 The Verdict Is In</p>
              </div>
              <ResultCard result={result} name1={name1} name2={name2} onReset={handleReset} />
            </>
          )}

        </div>

        {/* ── BOTTOM STATS — only on input step ── */}
        {step === 'input' && (
          <div className="w-full max-w-sm mt-16 grid grid-cols-3 gap-3">
            {[
              { emoji: '💍', number: '12K+', label: 'Soulmates Found' },
              { emoji: '🚩', number: '99K+', label: 'Red Flags Caught' },
              { emoji: '👀', number: '34K+', label: 'Cheaters Exposed' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-2xl mb-1">{stat.emoji}</p>
                <p className="font-headline text-lg font-black" style={{ color: '#ff4f8b' }}>{stat.number}</p>
                <p className="font-label text-[8px] tracking-wider uppercase opacity-40 leading-tight mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-10 px-4 text-center">
        <p className="font-label text-[9px] uppercase tracking-[0.3em] opacity-20">
          © 2026 LOVECHECK · For entertainment only · Do not use as relationship advice 😂
        </p>
      </footer>

      <div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0d0816] to-transparent pointer-events-none z-0" />

      {showHearts && <FloatingHearts />}
    </div>
  )
}

export default App
