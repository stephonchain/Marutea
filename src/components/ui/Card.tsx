import React from 'react'

interface CardProps {
  variant?: 'bubble' | 'gentle'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function Card({ variant = 'bubble', className = '', children, onClick }: CardProps) {
  const variantClasses = {
    bubble: 'card-bubble',
    gentle: 'card-gentle'
  }

  const clickable = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-300' : ''

  return (
    <div
      className={`${variantClasses[variant]} ${clickable} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
