import React, { useState, useEffect, useRef } from 'react'

interface ThumbScannerProps {
  name1: string
  name2: string
  onScanComplete: () => void
}

type ScanState = 'idle' | 'scanning' | 'done'

const SCAN_MESSAGES = [
  'Reading love signals...',
  'Analyzing heartbeat patterns...',
  'Measuring emotional frequency...',
  'Detecting romantic chemistry...',
  'Calculating compatibility index...',
  'Almost there... 💘',
]

// Fingerprint SVG paths - concentric arcs simulating a real thumbprint
const FingerprintSVG: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Thumb base shape */}
    <path d="M60 130 C30 130 10 110 10 80 L10 50 C10 25 33 8 60 8 C87 8 110 25 110 50 L110 80 C110 110 90 130 60 130Z"
      fill="none" stroke={color} strokeWidth="1.5" opacity={opacity * 0.3} />

    {/* Fingerprint rings - innermost to outermost */}
    <ellipse cx="60" cy="65" rx="6" ry="5" stroke={color} strokeWidth="1.8" opacity={opacity} />
    <ellipse cx="60" cy="65" rx="13" ry="11" stroke={color} strokeWidth="1.6" opacity={opacity * 0.95} />
    <ellipse cx="60" cy="65" rx="20" ry="17" stroke={color} strokeWidth="1.5" opacity={opacity * 0.9} />
    <ellipse cx="60" cy="65" rx="27" ry="23" stroke={color} strokeWidth="1.4" opacity={opacity * 0.85} />
    <ellipse cx="60" cy="65" rx="34" ry="29" stroke={color} strokeWidth="1.3" opacity={opacity * 0.8} />
    <ellipse cx="60" cy="65" rx="41" ry="34" stroke={color} strokeWidth="1.2" opacity={opacity * 0.7}
      strokeDasharray="3 2" />

    {/* Center dot */}
    <circle cx="60" cy="65" r="2.5" fill={color} opacity={opacity} />

    {/* Subtle vertical line details */}
    <line x1="60" y1="10" x2="60" y2="28" stroke={color} strokeWidth="1" opacity={opacity * 0.4} strokeDasharray="2 3" />
  </svg>
)

export const ThumbScanner: React.FC<ThumbScannerProps> = ({ name1, name2, onScanComplete }) => {
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [beamY, setBeamY] = useState(100)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const msgRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startScan = () => {
    if (scanState !== 'idle') return
    setScanState('scanning')
    setProgress(0)
    setBeamY(100)
    setMsgIndex(0)

    // Progress counter
    let prog = 0
    intervalRef.current = setInterval(() => {
      prog += 1.6
      setProgress(Math.min(prog, 100))
      // Beam sweeps up and down (oscillates)
      setBeamY(prev => {
        const next = prev - 3.2
        return next < 0 ? 100 : next
      })
      if (prog >= 100) {
        clearInterval(intervalRef.current!)
        setScanState('done')
        setTimeout(onScanComplete, 900)
      }
    }, 40)

    // Message cycling
    let mi = 0
    msgRef.current = setInterval(() => {
      mi = Math.min(mi + 1, SCAN_MESSAGES.length - 1)
      setMsgIndex(mi)
      if (mi >= SCAN_MESSAGES.length - 1) clearInterval(msgRef.current!)
    }, 400)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (msgRef.current) clearInterval(msgRef.current)
    }
  }, [])

  const isScanning = scanState === 'scanning'
  const isDone = scanState === 'done'
  const isIdle = scanState === 'idle'

  // Dynamic colors
  const ringColor = isDone ? '#4ade80' : isScanning ? '#ff4f8b' : '#8b5cf6'
  const glowColor = isDone ? 'rgba(74,222,128,0.35)' : isScanning ? 'rgba(255,79,139,0.35)' : 'rgba(139,92,246,0.15)'
  const beamColor = isDone ? '#4ade80' : '#ff4f8b'

  return (
    <div className="surface-container rounded-xl p-8 shadow-2xl relative overflow-hidden border border-outline-variant/10">
      {/* Background glow */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* Title */}
        <div className="text-center">
          <p className="font-label text-[10px] tracking-[0.25em] text-on-surface-variant uppercase mb-1">
            Step 2 of 2
          </p>
          <h3 className="font-headline text-2xl italic tracking-tight" style={{ color: ringColor }}>
            {isDone ? '💘 Love DNA Captured!' : 'Thumb Scan'}
          </h3>
        </div>

        {/* Names row */}
        <div className="flex items-center gap-3 text-sm">
          <span className="font-headline text-lg uppercase tracking-tight text-on-surface">{name1}</span>
          <span className="text-xl animate-pulse">💗</span>
          <span className="font-headline text-lg uppercase tracking-tight text-on-surface">{name2}</span>
        </div>

        {/* Scanner area */}
        <div
          onClick={startScan}
          className="relative flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-500 select-none"
          style={{
            width: 180,
            height: 220,
            cursor: isIdle ? 'pointer' : 'default',
            border: `2px solid ${ringColor}`,
            boxShadow: isScanning
              ? `0 0 40px ${glowColor}, inset 0 0 30px ${glowColor}`
              : isDone
              ? `0 0 50px rgba(74,222,128,0.5), inset 0 0 20px rgba(74,222,128,0.2)`
              : `0 0 20px rgba(139,92,246,0.2)`,
            background: 'rgba(20,16,28,0.7)',
          }}
        >
          {/* Fingerprint SVG */}
          <div
            className="absolute inset-4 transition-all duration-300"
            style={{ opacity: isDone ? 1 : isScanning ? 0.9 : 0.5 }}
          >
            <FingerprintSVG color={ringColor} opacity={isDone ? 1 : isScanning ? 0.85 : 0.6} />
          </div>

          {/* Scanning beam */}
          {isScanning && (
            <div
              className="absolute left-0 right-0 pointer-events-none transition-none"
              style={{
                top: `${beamY}%`,
                height: '4px',
                background: `linear-gradient(90deg, transparent 0%, ${beamColor} 30%, #fff 50%, ${beamColor} 70%, transparent 100%)`,
                opacity: 0.85,
                boxShadow: `0 0 12px 4px ${beamColor}`,
              }}
            />
          )}

          {/* Corner brackets */}
          {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 ${pos}`}
              style={{
                borderTop: i < 2 ? `2px solid ${ringColor}` : 'none',
                borderBottom: i >= 2 ? `2px solid ${ringColor}` : 'none',
                borderLeft: i % 2 === 0 ? `2px solid ${ringColor}` : 'none',
                borderRight: i % 2 === 1 ? `2px solid ${ringColor}` : 'none',
                opacity: 0.8,
              }}
            />
          ))}

          {/* Idle tap hint */}
          {isIdle && (
            <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1 animate-pulse">
              <span className="text-2xl">👆</span>
              <span className="font-label text-[9px] tracking-widest text-on-surface-variant uppercase">
                Tap to scan
              </span>
            </div>
          )}

          {/* Done checkmark */}
          {isDone && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="text-5xl animate-bounce">✅</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[220px]">
          <div className="h-1.5 rounded-full bg-outline-variant/20 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, #8b5cf6, ${beamColor})`,
                boxShadow: isScanning ? `0 0 8px ${beamColor}` : 'none',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-label text-[9px] tracking-widest text-on-surface-variant uppercase">
              Love DNA
            </span>
            <span className="font-label text-[9px] tracking-widest uppercase" style={{ color: ringColor }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Status message */}
        <p className="font-body text-sm text-center italic transition-all duration-300" style={{ color: ringColor, minHeight: 20 }}>
          {isDone
            ? `${name1} & ${name2} — chemistry detected 🔥`
            : isScanning
            ? SCAN_MESSAGES[msgIndex]
            : `Place your thumb on the scanner, ${name1}`}
        </p>

        {/* Scanning pulse rings */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute rounded-full animate-ping"
                style={{
                  width: 180 + i * 40,
                  height: 220 + i * 30,
                  border: `1px solid ${beamColor}`,
                  opacity: 0.15 - i * 0.04,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
