import React from 'react'
import { LoveResult } from '../types'
import { useCountUp } from '../hooks/useCountUp'
import { LoveMeter } from './LoveMeter'

interface ResultCardProps {
  result: LoveResult
  name1: string
  name2: string
  onReset: () => void
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  name1,
  name2,
  onReset,
}) => {
  const animatedPercentage = useCountUp(result.percentage)

  return (
    <div className="surface-container-highest rounded-xl p-10 relative overflow-hidden border border-tertiary/10 transition-all duration-1000 shadow-2xl">
      <div className="absolute top-0 right-0 p-4">
        <span className="material-symbols-outlined text-tertiary/20 text-6xl rotate-12 select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
      </div>
      
      <div className="text-center space-y-8 relative">
        <div className="space-y-2">
          <p className="font-label text-[10px] tracking-[0.3em] text-tertiary uppercase italic">The Verdict is in</p>
          <h3 className="font-headline text-3xl text-on-surface tracking-tighter uppercase">
            {name1} <span className="text-primary-container mx-2">+</span> {name2}
          </h3>
        </div>

        <div className="relative py-4">
          <span className="font-headline text-8xl md:text-9xl font-extrabold text-gradient-gold drop-shadow-sm select-none">
            {animatedPercentage}%
          </span>
        </div>

        <LoveMeter percentage={result.percentage} />

        <div className="pt-4 space-y-4">
          <div className="inline-block bg-surface-container-highest px-6 py-2 rounded-full border border-tertiary/20">
            <span className="text-2xl mr-2">{result.emoji}</span>
            <span className="font-headline text-xl text-tertiary italic">{result.verdict}</span>
          </div>
          <p className="font-body text-on-surface/80 max-w-xs mx-auto text-sm leading-relaxed italic">
            "{result.funny_line}"
          </p>
        </div>

        <button 
          onClick={onReset}
          className="font-label text-[10px] tracking-[0.3em] text-on-surface-variant uppercase hover:text-primary transition-colors pt-8 flex items-center justify-center gap-2 mx-auto group"
        >
          <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">
            refresh
          </span>
          Try Again
        </button>
      </div>
    </div>
  )
}
