import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-dark/80">
          {label}
        </label>
      )}
      <input id={id} className={`input-site ${className}`} {...props} />
      {error && <p className="mt-1 text-sm text-terra">{error}</p>}
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-dark/80">
          {label}
        </label>
      )}
      <textarea id={id} rows={4} className={`input-site ${className}`} {...props} />
      {error && <p className="mt-1 text-sm text-terra">{error}</p>}
    </div>
  )
}
