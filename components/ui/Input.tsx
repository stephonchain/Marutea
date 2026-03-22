import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-dark/80">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-4 py-3 border border-sand/40 rounded-sm bg-white text-dark placeholder:text-sand focus:outline-none focus:ring-2 focus:ring-terra/40 focus:border-terra transition-colors ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
