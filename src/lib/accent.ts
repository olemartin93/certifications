import type { Accent } from '../data/types'

interface AccentClasses {
  readonly gradient: string
  readonly text: string
  readonly ring: string
  readonly button: string
  readonly bar: string
}

// Full class names so Tailwind can find them at build time.
export const accentClasses: Readonly<Record<Accent, AccentClasses>> = {
  indigo: { gradient: 'from-indigo-500 to-violet-600', text: 'text-indigo-300', ring: 'ring-indigo-400/40', button: 'bg-indigo-500 hover:bg-indigo-400', bar: 'bg-indigo-400' },
  emerald: { gradient: 'from-emerald-500 to-teal-600', text: 'text-emerald-300', ring: 'ring-emerald-400/40', button: 'bg-emerald-600 hover:bg-emerald-500', bar: 'bg-emerald-400' },
  amber: { gradient: 'from-amber-500 to-orange-600', text: 'text-amber-300', ring: 'ring-amber-400/40', button: 'bg-amber-600 hover:bg-amber-500', bar: 'bg-amber-400' },
  rose: { gradient: 'from-rose-500 to-pink-600', text: 'text-rose-300', ring: 'ring-rose-400/40', button: 'bg-rose-600 hover:bg-rose-500', bar: 'bg-rose-400' },
  sky: { gradient: 'from-sky-500 to-blue-600', text: 'text-sky-300', ring: 'ring-sky-400/40', button: 'bg-sky-600 hover:bg-sky-500', bar: 'bg-sky-400' },
  violet: { gradient: 'from-violet-500 to-fuchsia-600', text: 'text-violet-300', ring: 'ring-violet-400/40', button: 'bg-violet-600 hover:bg-violet-500', bar: 'bg-violet-400' },
}
