import React, { useEffect, useState } from 'react'

interface Heart {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 50,
      size: 10 + Math.random() * 30,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-primary-container animate-float opacity-0"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            animationName: 'float-up',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards'
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) translateX(${(Math.random() - 0.5) * 100}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
