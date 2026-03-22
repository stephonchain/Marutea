import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-terra text-white hover:bg-terra/90',
  secondary: 'bg-sage text-white hover:bg-sage/90',
  outline: 'border-2 border-dark text-dark hover:bg-dark hover:text-cream',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded-sm font-body font-medium tracking-wide transition-colors duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
