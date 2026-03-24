import React, { useEffect, useState } from 'react'

interface LoveMeterProps {
  percentage: number
}

export const LoveMeter: React.FC<LoveMeterProps> = ({ percentage }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Initial delay for animation feel
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="space-y-3">
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-container to-tertiary transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(238,193,60,0.4)]"
          style={{ width: `${width}%` }}
        ></div>
      </div>
      <div className="flex justify-between font-label text-[9px] text-on-surface-variant tracking-widest uppercase opacity-60">
        <span>Cold Soul</span>
        <span>Burning Passion</span>
      </div>
    </div>
  )
}
