import React, { useEffect, useState } from 'react'
import { LoveResult } from '../types'
import { useCountUp } from '../hooks/useCountUp'

interface ResultCardProps {
  result: LoveResult
  name1: string
  name2: string
  onReset: () => void
}

const VIBE_CONFIG = {
  soulmate:      { label: '💍 SOULMATE DETECTED',    bg: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.5)',  text: '#4ade80', bar: 'from-green-400 to-emerald-300' },
  solid:         { label: '🥰 SOLID LOVE',            bg: 'rgba(255,79,139,0.12)', border: 'rgba(255,79,139,0.5)', text: '#ff4f8b', bar: 'from-pink-400 to-rose-300' },
  situationship: { label: '😏 SITUATIONSHIP ENERGY',  bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.5)', text: '#fbbf24', bar: 'from-yellow-400 to-amber-300' },
  suspicious:    { label: '👀 SOMETHING IS SUS',      bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.5)', text: '#fb923c', bar: 'from-orange-400 to-amber-400' },
  redflag:       { label: '🚩 RED FLAGS EVERYWHERE',  bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.5)',  text: '#ef4444', bar: 'from-red-500 to-rose-500' },
  disaster:      { label: '💀 TOTAL DISASTER',        bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.5)', text: '#a855f7', bar: 'from-purple-500 to-violet-400' },
}

const CHEAT_LABELS = [
  { max: 20,  label: '😇 Clean conscience',    color: '#4ade80' },
  { max: 40,  label: '🤔 Slightly suspicious', color: '#a3e635' },
  { max: 60,  label: '👀 Something is off...',  color: '#fbbf24' },
  { max: 80,  label: '🚩 Major red flag',       color: '#fb923c' },
  { max: 101, label: '💀 They are CHEATING',    color: '#ef4444' },
]

function getCheatLabel(level: number) {
  return CHEAT_LABELS.find(l => level < l.max) || CHEAT_LABELS[CHEAT_LABELS.length - 1]
}

// Animated number bar
const AnimatedBar: React.FC<{ value: number; colorClass: string; delay?: number }> = ({ value, colorClass, delay = 0 }) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 200 + delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
        style={{ width: `${width}%`, boxShadow: `0 0 12px rgba(255,255,255,0.2)` }}
      />
    </div>
  )
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, name1, name2, onReset }) => {
  const animatedPct = useCountUp(result.percentage, 2000)
  const animatedCheat = useCountUp(result.cheat_level, 1800)
  const vibe = VIBE_CONFIG[result.vibe] || VIBE_CONFIG.situationship
  const cheatInfo = getCheatLabel(result.cheat_level)

  const [showFlags, setShowFlags] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowFlags(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-4 w-full">

      {/* ── VIBE BADGE ── */}
      <div
        className="text-center py-3 px-5 rounded-2xl font-label text-xs tracking-[0.22em] uppercase font-bold animate-bounce"
        style={{ background: vibe.bg, border: `1px solid ${vibe.border}`, color: vibe.text }}
      >
        {vibe.label}
      </div>

      {/* ── MAIN SCORE CARD ── */}
      <div
        className="rounded-3xl p-7 relative overflow-hidden"
        style={{ background: 'rgba(20,14,32,0.95)', border: `1px solid ${vibe.border}`, boxShadow: `0 0 60px ${vibe.bg}` }}
      >
        {/* Glow orb */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: vibe.bg }} />

        <div className="relative text-center space-y-5">
          {/* Names */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="font-headline text-xl uppercase tracking-tight" style={{ color: '#f1f5f9' }}>{name1}</span>
            <span className="text-2xl animate-pulse">💗</span>
            <span className="font-headline text-xl uppercase tracking-tight" style={{ color: '#f1f5f9' }}>{name2}</span>
          </div>

          {/* Big emoji + percentage */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl" style={{ filter: `drop-shadow(0 0 20px ${vibe.text})`, animation: 'bounce 1s infinite' }}>
              {result.emoji}
            </span>
            <div>
              <span
                className="font-headline font-extrabold"
                style={{ fontSize: 'clamp(4rem,18vw,7rem)', lineHeight: 1, background: `linear-gradient(135deg, ${vibe.text}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {animatedPct}%
              </span>
            </div>
          </div>

          {/* Love bar */}
          <div className="space-y-1.5">
            <AnimatedBar value={result.percentage} colorClass={vibe.bar} />
            <div className="flex justify-between font-label text-[9px] tracking-widest uppercase opacity-50">
              <span>❄️ Cold Soul</span>
              <span>🔥 Burning Passion</span>
            </div>
          </div>

          {/* Verdict pill */}
          <div className="inline-block px-5 py-2.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="font-headline text-lg italic" style={{ color: vibe.text }}>{result.verdict}</p>
          </div>

          {/* Funny line */}
          <blockquote
            className="font-body text-sm leading-relaxed italic mx-auto max-w-xs"
            style={{ color: 'rgba(241,245,249,0.7)', borderLeft: `3px solid ${vibe.text}`, paddingLeft: 12, textAlign: 'left' }}
          >
            "{result.funny_line}"
          </blockquote>
        </div>
      </div>

      {/* ── CHEAT-O-METER ── */}
      <div
        className="rounded-3xl p-6"
        style={{ background: 'rgba(20,14,32,0.95)', border: `1px solid ${cheatInfo.color}33` }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🕵️</span>
          <p className="font-label text-[10px] tracking-[0.22em] uppercase font-bold" style={{ color: cheatInfo.color }}>
            Cheat-O-Meter™
          </p>
          <span className="ml-auto font-headline text-xl font-bold" style={{ color: cheatInfo.color }}>
            {animatedCheat}%
          </span>
        </div>
        <AnimatedBar value={result.cheat_level} colorClass="from-green-400 via-yellow-400 to-red-500" delay={300} />
        <p className="mt-3 font-label text-[10px] tracking-widest uppercase text-center" style={{ color: cheatInfo.color }}>
          {cheatInfo.label}
        </p>
      </div>

      {/* ── RED FLAGS ── */}
      <div
        className="rounded-3xl p-6 space-y-3 transition-all duration-700"
        style={{ background: 'rgba(20,14,32,0.95)', border: '1px solid rgba(239,68,68,0.2)', opacity: showFlags ? 1 : 0, transform: showFlags ? 'translateY(0)' : 'translateY(12px)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🚩</span>
          <p className="font-label text-[10px] tracking-[0.22em] uppercase font-bold text-red-400">Red Flags Detected</p>
        </div>
        <div className="space-y-2">
          {result.red_flags.map((flag, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', animationDelay: `${i * 150}ms` }}
            >
              <span className="text-red-400 mt-0.5 text-xs">▶</span>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(241,245,249,0.75)' }}>{flag}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVICE CARD ── */}
      <div
        className="rounded-3xl p-5 text-center"
        style={{ background: `${vibe.bg}`, border: `1px solid ${vibe.border}` }}
      >
        <p className="font-label text-[9px] tracking-widest uppercase mb-2" style={{ color: vibe.text, opacity: 0.7 }}>
          💡 Our Advice
        </p>
        <p className="font-headline text-lg italic" style={{ color: vibe.text }}>
          {result.advice}
        </p>
      </div>

      {/* ── TRY AGAIN ── */}
      <button
        onClick={onReset}
        className="w-full py-5 rounded-2xl font-label text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-300 active:scale-95 group"
        style={{ background: 'rgba(255,79,139,0.12)', border: '1px solid rgba(255,79,139,0.3)', color: '#ff4f8b' }}
      >
        <span className="flex items-center justify-center gap-2">
          <span className="group-hover:rotate-180 transition-transform duration-500 inline-block">🔄</span>
          Try with different names
        </span>
      </button>

    </div>
  )
}
