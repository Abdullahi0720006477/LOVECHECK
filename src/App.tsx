import React, { useState } from 'react'
import { Header } from './components/Header'
import { InputCard } from './components/InputCard'
import { ThumbScanner } from './components/ThumbScanner'
import { ResultCard } from './components/ResultCard'
import { FloatingHearts } from './components/FloatingHearts'
import { LoveResult } from './types'
import { checkLove } from './api/loveCheck'

type Step = 'input' | 'scan' | 'result'

const App: React.FC = () => {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [step, setStep] = useState<Step>('input')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<LoveResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHearts, setShowHearts] = useState(false)

  // Step 1 → Step 2: move to thumb scanner
  const handleContinue = () => {
    if (!name1.trim() || !name2.trim()) return
    setError(null)
    setStep('scan')
  }

  // Step 2 done → call API
  const handleScanComplete = async () => {
    setLoading(true)
    try {
      const data = await checkLove(name1, name2)
      setResult(data)
      setStep('result')
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 5000)
    } catch {
      setError('Something broke — maybe the love was too powerful 💥')
      setStep('input')
    } finally {
      setLoading(false)
    }
  }

  // Reset everything
  const handleReset = () => {
    setName1('')
    setName2('')
    setResult(null)
    setError(null)
    setStep('input')
    setLoading(false)
  }

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative">
      <Header />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-container opacity-10 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary-container opacity-10 blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-20 px-4 flex flex-col items-center">

        {/* Hero */}
        <section className="text-center mb-16 max-w-2xl">
          <div className="inline-flex items-center justify-center mb-6 text-6xl drop-shadow-[0_0_20px_rgba(255,79,139,0.5)] transition-transform duration-700 hover:scale-110">
            💗
          </div>
          <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-gradient-primary mb-4 italic">
            LoveCheck
          </h1>
          <p className="font-body text-on-surface-variant text-lg tracking-wide uppercase opacity-80">
            Find out if it's love... or a <span className="text-error font-semibold italic">red flag</span> 🚩
          </p>
        </section>

        {/* Step indicator dots */}
        {step !== 'result' && (
          <div className="flex items-center gap-3 mb-10">
            {(['input', 'scan'] as Step[]).map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-label text-[10px] font-bold transition-all duration-500"
                    style={{
                      background: step === s ? 'var(--color-primary-container, #ff4f8b)' : 'transparent',
                      border: `2px solid ${step === s ? 'transparent' : 'rgba(255,255,255,0.2)'}`,
                      color: step === s ? '#fff' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {step === 'scan' && s === 'input' ? '✓' : i + 1}
                  </div>
                  <span className="font-label text-[8px] tracking-widest uppercase opacity-50">
                    {s === 'input' ? 'Names' : 'Scan'}
                  </span>
                </div>
                {i < 1 && (
                  <div
                    className="w-12 h-[1px] mb-4 transition-all duration-500"
                    style={{ background: step === 'scan' ? '#ff4f8b' : 'rgba(255,255,255,0.15)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Main content area */}
        <div className="w-full max-w-lg space-y-12">
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
              <ThumbScanner
                name1={name1}
                name2={name2}
                onScanComplete={handleScanComplete}
              />
              {/* Loading overlay when API is being called after scan */}
              {loading && (
                <div className="surface-container rounded-xl p-6 border border-outline-variant/10 flex items-center justify-center gap-4">
                  <span className="material-symbols-outlined text-primary-container text-3xl animate-spin">refresh</span>
                  <p className="font-label text-[10px] tracking-widest text-primary-container uppercase">
                    Calculating your love score...
                  </p>
                </div>
              )}
              {/* Back button */}
              {!loading && (
                <button
                  onClick={() => setStep('input')}
                  className="font-label text-[10px] tracking-[0.3em] text-on-surface-variant uppercase hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                  Change Names
                </button>
              )}
            </div>
          )}

          {step === 'result' && result && (
            <ResultCard
              result={result}
              name1={name1}
              name2={name2}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Bottom info section */}
        {step === 'input' && (
          <section className="max-w-4xl w-full mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
            <div className="md:col-span-2 surface-container rounded-xl p-8 flex flex-col justify-between border border-outline-variant/5">
              <span className="font-label text-[10px] tracking-widest text-primary mb-8 uppercase italic">01 / The Algorithm</span>
              <h4 className="font-headline text-4xl leading-tight mb-4">Deep Emotional <br/>Architecture.</h4>
              <p className="font-body text-on-surface-variant/70 text-sm leading-loose">
                Our proprietary LoveCheck engine analyzes phonetic resonance, historical romantic archetypes, and celestial alignment — verified by your unique biometric thumb scan.
              </p>
            </div>
            <div className="surface-container-low rounded-xl p-8 flex flex-col items-center justify-center gap-6 border border-outline-variant/5 group">
              <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-4xl">👆</span>
              </div>
              <div className="text-center">
                <p className="font-headline text-2xl italic tracking-tight">Thumb Certified</p>
                <p className="font-label text-[9px] tracking-widest opacity-40 uppercase">Biometric Standard</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 border-t border-outline-variant/10 pt-12">
          <div className="flex flex-wrap justify-center gap-12">
            <a href="#" className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/40 hover:text-[#E8E0EC] transition-all">Privacy</a>
            <a href="#" className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/40 hover:text-[#E8E0EC] transition-all">Terms</a>
            <a href="#" className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/40 hover:text-[#E8E0EC] transition-all">Our Method</a>
          </div>
          <p className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/20">© 2026 LOVECHECK. AN EDITORIAL EXPERIENCE.</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 w-full h-[265px] bg-gradient-to-t from-surface to-transparent pointer-events-none z-0"></div>

      {showHearts && <FloatingHearts />}
    </div>
  )
}

export default App
