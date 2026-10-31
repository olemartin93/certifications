import { Link } from 'react-router-dom'
import { catalog } from '../data/catalog'
import { accentClasses } from '../lib/accent'
import { progressKey, useProgress } from '../lib/progress'
import { Layout } from '../components/Layout'
import { ProgressBar } from '../components/ProgressBar'

export function CatalogPage() {
  const progress = useProgress()
  return (
    <Layout title="Certified 😏">
      <p className="mb-5 text-slate-400">Pick a certification to start studying. Everything works offline.</p>
      <ul className="space-y-4">
        {catalog.map((cert) => {
          const accent = accentClasses[cert.accent]
          const read = cert.modules.filter((m) => progress.readModules[progressKey(cert.id, m.id)]).length
          return (
            <li key={cert.id}>
              <Link
                to={`/${cert.id}`}
                className={`block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:ring-2 focus-visible:ring-2 ${accent.ring}`}
              >
                <div className={`flex items-center gap-3 bg-gradient-to-br p-4 ${accent.gradient}`}>
                  <span className="text-4xl" aria-hidden="true">{cert.emoji}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{cert.title}</h2>
                    <p className="text-sm text-white/80">{cert.level}</p>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <p className="text-sm leading-relaxed text-slate-300">{cert.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full bg-white/10 px-2.5 py-1">{cert.modules.length} modules</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1">{cert.exam.questions} exam questions</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1">{cert.exam.durationMinutes} min</span>
                  </div>
                  <ProgressBar value={read} max={cert.modules.length} label={`${cert.title} modules read`} barClass={accent.bar} />
                  <p className="text-xs text-slate-400">
                    {read} of {cert.modules.length} modules read
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="mt-8 text-center text-xs leading-relaxed text-slate-500">
        Independent study notes based on official, publicly available sources. Not affiliated with PeopleCert or AXELOS. PRINCE2® and PRINCE2 Agile® are registered trademarks of PeopleCert group.
      </p>
    </Layout>
  )
}
