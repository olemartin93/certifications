interface TldrProps {
  readonly points: readonly string[]
}

export function Tldr({ points }: TldrProps) {
  return (
    <section aria-labelledby="tldr-heading" className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4">
      <h2 id="tldr-heading" className="mb-2 text-sm font-bold tracking-wide text-amber-300 uppercase">
        TL;DR
      </h2>
      <ul className="space-y-1.5 text-[15px] leading-relaxed text-amber-50">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span aria-hidden="true" className="text-amber-300">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
