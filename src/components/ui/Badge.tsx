import React from 'react'

interface BadgeProps {
  variant?: 'emerald' | 'rose' | 'neutral'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'emerald', children, className = '' }: BadgeProps) {
  const variantClasses = {
    emerald: 'bg-emerald-100 text-emerald-900',
    rose: 'bg-rose-100 text-emerald-900',
    neutral: 'bg-gray-100 text-gray-700'
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
