import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="flex items-center justify-center h-20 px-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#FF4F8B] text-2xl drop-shadow-[0_0_15px_rgba(255,79,139,0.4)]" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
          <span className="font-headline tracking-[0.2em] uppercase text-sm text-[#FF4F8B]">LoveCheck</span>
        </div>
      </div>
    </header>
  )
}
