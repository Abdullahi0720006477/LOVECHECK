import React, { useEffect, useState } from 'react'
import { LoveResult } from '../types'
import { useCountUp } from '../hooks/useCountUp'
import { useTheme } from '../context/ThemeContext'

interface ResultCardProps {
  result: LoveResult
  name1: string
  name2: string
  onReset: () => void
}

/* ── Vibe config ── */
const VIBE = {
  soulmate:      { label: '💍 SOULMATE DETECTED',   bg: 'rgba(74,222,128,0.15)',  border: '#4ade80', text: '#4ade80',  bar: ['#4ade80','#86efac'] },
  solid:         { label: '🥰 SOLID LOVE',           bg: 'rgba(255,79,139,0.12)',  border: '#ff4f8b', text: '#ff4f8b', bar: ['#ff4f8b','#fb7bb8'] },
  situationship: { label: '😏 SITUATIONSHIP ENERGY', bg: 'rgba(251,191,36,0.12)',  border: '#fbbf24', text: '#fbbf24', bar: ['#fbbf24','#fcd34d'] },
  suspicious:    { label: '👀 SOMETHING IS SUS',     bg: 'rgba(251,146,60,0.12)',  border: '#fb923c', text: '#fb923c', bar: ['#fb923c','#fdba74'] },
  redflag:       { label: '🚩 RED FLAGS EVERYWHERE', bg: 'rgba(239,68,68,0.12)',   border: '#ef4444', text: '#ef4444', bar: ['#ef4444','#f87171'] },
  disaster:      { label: '💀 TOTAL DISASTER',       bg: 'rgba(168,85,247,0.12)',  border: '#a855f7', text: '#a855f7', bar: ['#a855f7','#c084fc'] },
}

/* ── Cheat meter ── */
const CHEAT = [
  { max: 20,  label: '😇 Clean conscience',    color: '#4ade80' },
  { max: 40,  label: '🤔 Slightly suspicious', color: '#a3e635' },
  { max: 60,  label: '👀 Something is off...',  color: '#fbbf24' },
  { max: 80,  label: '🚩 Major red flag',       color: '#fb923c' },
  { max: 101, label: '💀 They are CHEATING',    color: '#ef4444' },
]

/* ── Emoji comment pills by score ── */
const COMMENTS: Record<string, { emoji: string; text: string }[]> = {
  soulmate: [
    { emoji: '💍', text: 'Propose already!' },
    { emoji: '🥹', text: 'Literally adorable' },
    { emoji: '🔐', text: 'Lock it down NOW' },
    { emoji: '👨‍👩‍👧', text: 'Family goals fr' },
  ],
  solid: [
    { emoji: '💕', text: 'Real potential' },
    { emoji: '☕', text: 'Date night energy' },
    { emoji: '📱', text: 'Text them first!' },
    { emoji: '😌', text: 'Solid vibes only' },
  ],
  situationship: [
    { emoji: '🤔', text: 'Define the vibe' },
    { emoji: '👀', text: 'Mixed signals' },
    { emoji: '☕', text: 'Have THE talk' },
    { emoji: '😅', text: 'Chaotic energy' },
  ],
  suspicious: [
    { emoji: '🚩', text: 'Sus behavior' },
    { emoji: '👀', text: 'Who is gym buddy?' },
    { emoji: '📵', text: '2nd phone energy' },
    { emoji: '🏃', text: 'Exit plan needed' },
  ],
  redflag: [
    { emoji: '🚨', text: 'RUN bestie!' },
    { emoji: '🔐', text: 'Change passwords' },
    { emoji: '🗑️', text: 'Delete their texts' },
    { emoji: '✨', text: 'You deserve better' },
  ],
  disaster: [
    { emoji: '💀', text: 'Certified disaster' },
    { emoji: '📵', text: 'Block & delete' },
    { emoji: '📺', text: 'Cry + ice cream' },
    { emoji: '🧸', text: 'Call your bestie' },
  ],
}

/* ── Animated bar ── */
const Bar: React.FC<{ value: number; from: string; to: string; delay?: number }> = ({ value, from, to, delay = 0 }) => {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(value), 150 + delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(128,128,128,0.15)' }}>
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${w}%`, background: `linear-gradient(90deg, ${from}, ${to})`, boxShadow: `0 0 10px ${from}55` }}
      />
    </div>
  )
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, name1, name2, onReset }) => {
  const { isDark } = useTheme()
  const pct   = useCountUp(result.percentage, 2200)
  const cheat = useCountUp(result.cheat_level, 1800)

  const v      = VIBE[result.vibe] || VIBE.situationship
  const ci     = CHEAT.find(c => result.cheat_level < c.max) ?? CHEAT[CHEAT.length - 1]
  const pills  = COMMENTS[result.vibe] || COMMENTS.situationship

  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setShow2(true), 900)
    const t2 = setTimeout(() => setShow3(true), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const card   = isDark ? 'rgba(20,14,32,0.97)' : 'rgba(255,255,255,0.98)'
  const textCol = isDark ? '#f1f5f9' : '#1a0a2e'
  const mutedCol = isDark ? 'rgba(241,245,249,0.5)' : 'rgba(26,10,46,0.45)'
  const pillBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
  const pillBdr = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'

  return (
    <div className="space-y-3 w-full animate-slide-up">

      {/* ① Vibe banner */}
      <div
        className="text-center py-2.5 px-4 rounded-2xl font-label text-xs tracking-[0.22em] uppercase font-black animate-bounce"
        style={{ background: v.bg, border: `1.5px solid ${v.border}`, color: v.text }}
      >
        {v.label}
      </div>

      {/* ② MAIN SCORE CARD */}
      <div
        className="rounded-3xl p-6 relative overflow-hidden"
        style={{ background: card, border: `1.5px solid ${v.border}`, boxShadow: `0 0 60px ${v.bg}` }}
      >
        {/* Corner glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: v.bg }} />

        <div className="relative text-center">

          {/* Names row */}
          <p className="font-label text-[9px] tracking-[0.28em] uppercase mb-2" style={{ color: mutedCol }}>
            Love Score for
          </p>
          <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
            <span className="font-headline text-lg font-black uppercase tracking-tight" style={{ color: textCol }}>{name1}</span>
            <span className="text-xl" style={{ animation: 'pulse 1.5s infinite', filter: `drop-shadow(0 0 8px ${v.text})` }}>💗</span>
            <span className="font-headline text-lg font-black uppercase tracking-tight" style={{ color: textCol }}>{name2}</span>
          </div>

          {/* BIG emoji */}
          <div className="text-6xl mb-2 animate-pop-in" style={{ filter: `drop-shadow(0 0 24px ${v.text})` }}>
            {result.emoji}
          </div>

          {/* ★ HUGE PERCENTAGE ★ */}
          <div className="my-2">
            <span
              className="font-headline font-black leading-none"
              style={{
                fontSize: 'clamp(5rem,22vw,8rem)',
                background: `linear-gradient(135deg, ${v.text} 0%, ${isDark ? '#fff' : v.text} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 4px 24px ${v.text}55)`,
              }}
            >
              {pct}%
            </span>
          </div>

          {/* Love bar */}
          <div className="space-y-1.5 mb-5">
            <Bar value={result.percentage} from={v.bar[0]} to={v.bar[1]} />
            <div className="flex justify-between font-label text-[8px] tracking-widest uppercase" style={{ color: mutedCol }}>
              <span>❄️ Cold Soul</span>
              <span>🔥 Burning Passion</span>
            </div>
          </div>

          {/* Verdict */}
          <div
            className="inline-block px-4 py-2 rounded-xl mb-4"
            style={{ background: `${v.bg}`, border: `1px solid ${v.border}` }}
          >
            <p className="font-headline text-base italic font-bold" style={{ color: v.text }}>{result.verdict}</p>
          </div>

          {/* ★ COMMENT PILLS ★ */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            {pills.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2.5 rounded-2xl transition-all duration-500"
                style={{
                  background: pillBg,
                  border: `1px solid ${pillBdr}`,
                  opacity: show2 ? 1 : 0,
                  transform: show2 ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className="text-lg flex-shrink-0">{p.emoji}</span>
                <span className="font-label text-[9px] tracking-wider uppercase font-bold leading-tight" style={{ color: mutedCol }}>
                  {p.text}
                </span>
              </div>
            ))}
          </div>

          {/* Funny line */}
          <blockquote
            className="mt-4 font-body text-xs leading-relaxed italic text-left px-4 py-3 rounded-2xl"
            style={{ color: mutedCol, background: pillBg, borderLeft: `3px solid ${v.text}` }}
          >
            "{result.funny_line}"
          </blockquote>
        </div>
      </div>

      {/* ③ CHEAT-O-METER */}
      <div
        className="rounded-3xl p-5 transition-all duration-700"
        style={{ background: card, border: `1.5px solid ${ci.color}33`, opacity: show2 ? 1 : 0, transform: show2 ? 'translateY(0)' : 'translateY(10px)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🕵️</span>
          <p className="font-label text-[10px] tracking-[0.22em] uppercase font-black" style={{ color: ci.color }}>
            Cheat-O-Meter™
          </p>
          <span className="ml-auto font-headline text-2xl font-black" style={{ color: ci.color }}>{cheat}%</span>
        </div>
        <Bar value={result.cheat_level} from="#4ade80" to="#ef4444" delay={400} />
        <p className="mt-2.5 font-label text-[9px] tracking-widest uppercase text-center font-bold" style={{ color: ci.color }}>
          {ci.label}
        </p>
      </div>

      {/* ④ RED FLAGS */}
      <div
        className="rounded-3xl p-5 space-y-2.5 transition-all duration-700"
        style={{ background: card, border: '1.5px solid rgba(239,68,68,0.2)', opacity: show3 ? 1 : 0, transform: show3 ? 'translateY(0)' : 'translateY(10px)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🚩</span>
          <p className="font-label text-[10px] tracking-[0.22em] uppercase font-black text-red-400">Red Flags Detected</p>
        </div>
        {result.red_flags.map((flag, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 p-3 rounded-xl"
            style={{ background: isDark ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">▶</span>
            <p className="font-body text-xs leading-relaxed" style={{ color: isDark ? 'rgba(241,245,249,0.75)' : 'rgba(26,10,46,0.65)' }}>
              {flag}
            </p>
          </div>
        ))}
      </div>

      {/* ⑤ ADVICE */}
      <div
        className="rounded-3xl p-5 text-center transition-all duration-700"
        style={{ background: v.bg, border: `1.5px solid ${v.border}`, opacity: show3 ? 1 : 0, transform: show3 ? 'translateY(0)' : 'translateY(10px)' }}
      >
        <p className="font-label text-[9px] tracking-widest uppercase mb-1.5 font-bold" style={{ color: v.text, opacity: 0.7 }}>💡 Our Advice</p>
        <p className="font-headline text-lg italic font-bold" style={{ color: v.text }}>{result.advice}</p>
      </div>

      {/* ⑥ TRY AGAIN */}
      <button
        onClick={onReset}
        className="w-full py-5 rounded-2xl font-label text-[11px] tracking-[0.25em] uppercase font-black transition-all duration-300 active:scale-95 group"
        style={{
          background: isDark ? 'rgba(255,79,139,0.1)' : 'rgba(255,79,139,0.08)',
          border: '1.5px solid rgba(255,79,139,0.3)',
          color: '#ff4f8b',
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <span className="group-hover:rotate-180 transition-transform duration-500 inline-block">🔄</span>
          Try with different names
        </span>
      </button>

    </div>
  )
}
