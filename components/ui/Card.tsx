interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-sm shadow-sm border border-sand/20 p-6 ${className}`}
    >
      {children}
    </div>
  )
}
