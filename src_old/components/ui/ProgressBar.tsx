interface ProgressBarProps {
  current: number
  max: number
  label?: string
  showPercentage?: boolean
}

export function ProgressBar({ current, max, label, showPercentage = false }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-emerald-900">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-emerald-900">{current} / {max}</span>
          )}
        </div>
      )}
      <div className="w-full h-3 bg-emerald-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-900 to-emerald-700 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
