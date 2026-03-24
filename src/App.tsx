import React, { useState } from 'react'
import { Header } from './components/Header'
import { InputCard } from './components/InputCard'
import { ResultCard } from './components/ResultCard'
import { FloatingHearts } from './components/FloatingHearts'
import { LoveResult } from './types'
import { checkLove } from './api/loveCheck'

const App: React.FC = () => {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<LoveResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHearts, setShowHearts] = useState(false)

  const handleSubmit = async () => {
    if (!name1.trim() || !name2.trim()) return

    setLoading(true)
    clearResultAndError()

    try {
      const data = await checkLove(name1, name2)
      setResult(data)
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 4000)
    } catch (err) {
      setError("Something broke — maybe the love was too powerful 💥")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setName1("")
    setName2("")
    setResult(null)
    setError(null)
  }

  const clearResultAndError = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative">
      <Header />
      
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-container opacity-10 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary-container opacity-10 blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-20 px-4 flex flex-col items-center">
        {/* Hero Branding Section */}
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

        {/* Calculation Canvas */}
        <div className="w-full max-w-lg space-y-12">
          {!result ? (
            <div className="space-y-6">
              <InputCard
                name1={name1}
                name2={name2}
                setName1={setName1}
                setName2={setName2}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
              />
            </div>
          ) : (
            <ResultCard
              result={result}
              name1={name1}
              name2={name2}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Method Section (Bento Inspired) - Hide when result is shown for better focus? 
            The prompt design has it at the bottom. I'll keep it. */}
        <section className="max-w-4xl w-full mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
          <div className="md:col-span-2 surface-container rounded-xl p-8 flex flex-col justify-between border border-outline-variant/5">
            <span className="font-label text-[10px] tracking-widest text-primary mb-8 uppercase italic">01 / The Algorithm</span>
            <h4 className="font-headline text-4xl leading-tight mb-4">Deep Emotional <br/>Architecture.</h4>
            <p className="font-body text-on-surface-variant/70 text-sm leading-loose">
              Our proprietary LoveCheck engine analyzes phonetic resonance, historical romantic archetypes, and celestial alignment to determine if your connection is built on marble or matches.
            </p>
          </div>
          <div className="surface-container-low rounded-xl p-8 flex flex-col items-center justify-center gap-6 border border-outline-variant/5 group">
            <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div className="text-center">
              <p className="font-headline text-2xl italic tracking-tight">Vibe Certified</p>
              <p className="font-label text-[9px] tracking-widest opacity-40 uppercase">Luxury Standard</p>
            </div>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="w-full py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 border-t border-outline-variant/10 pt-12">
          <div className="flex flex-wrap justify-center gap-12">
            <a href="#" className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/40 hover:text-[#E8E0EC] transition-all">Privacy</a>
            <a href="#" className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/40 hover:text-[#E8E0EC] transition-all">Terms</a>
            <a href="#" className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/40 hover:text-[#E8E0EC] transition-all">Our Method</a>
          </div>
          <p className="font-label text-[10px] uppercase tracking-widest text-[#E8E0EC]/20">© 2024 LOVECHECK. AN EDITORIAL EXPERIENCE.</p>
        </div>
      </footer>

      {/* Decorative Gradient Mesh Bottom */}
      <div className="fixed bottom-0 left-0 w-full h-[265px] bg-gradient-to-t from-surface to-transparent pointer-events-none z-0"></div>

      {showHearts && <FloatingHearts />}
    </div>
  )
}

export default App
