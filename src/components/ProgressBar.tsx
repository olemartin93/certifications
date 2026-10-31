interface ProgressBarProps {
  readonly value: number
  readonly max: number
  readonly label: string
  readonly barClass: string
}

export function ProgressBar({ value, max, label, barClass }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div className={`h-full rounded-full transition-all ${barClass}`} style={{ width: `${pct}%` }} />
    </div>
  )
}
