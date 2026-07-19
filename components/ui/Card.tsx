import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-3xl bg-white/70 p-8 shadow-[0_4px_30px_rgba(44,36,25,0.06)] ${className}`}
    >
      {children}
    </div>
  )
}
