import { Link, useParams } from 'react-router-dom'
import { getCertification, getModule } from '../data/catalog'
import { accentClasses } from '../lib/accent'
import { progressKey, setModuleRead, useProgress } from '../lib/progress'
import { Layout } from '../components/Layout'
import { Tldr } from '../components/Tldr'
import { NotFoundPage } from './NotFoundPage'

export function ModulePage() {
  const { certId, moduleId } = useParams()
  const progress = useProgress()
  const cert = getCertification(certId)
  const mod = cert ? getModule(cert, moduleId) : undefined
  if (!cert || !mod) return <NotFoundPage />

  const accent = accentClasses[cert.accent]
  const index = cert.modules.indexOf(mod)
  const prev = cert.modules[index - 1]
  const next = cert.modules[index + 1]
  const read = progress.readModules[progressKey(cert.id, mod.id)] === true

  return (
    <Layout title={mod.title} back={{ to: `/${cert.id}`, label: cert.title }}>
      <article className="space-y-6">
        <p className={`text-sm font-medium ${accent.text}`}>
          Module {index + 1} of {cert.modules.length}
        </p>
        <Tldr points={mod.tldr} />

        {mod.sections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="leading-relaxed text-slate-300">{p}</p>
            ))}
            {section.bullets ? (
              <ul className="list-disc space-y-1.5 pl-5 leading-relaxed text-slate-300 marker:text-slate-500">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section>
          <h2 className="mb-2 text-lg font-semibold">Key terms</h2>
          <dl className="space-y-2">
            {mod.keyTerms.map((k) => (
              <div key={k.term} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                <dt className={`font-semibold ${accent.text}`}>{k.term}</dt>
                <dd className="mt-0.5 text-sm text-slate-300">{k.definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setModuleRead(cert.id, mod.id, !read)}
            aria-pressed={read}
            className={`w-full rounded-xl px-4 py-3 font-medium ring-1 ${read ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/40' : 'bg-white/5 ring-white/15'}`}
          >
            {read ? '✓ Marked as read' : 'Mark as read'}
          </button>
          <Link to={`/${cert.id}/quiz/${mod.id}`} className={`block rounded-xl px-4 py-3 text-center font-semibold text-white ${accent.button}`}>
            Take the quiz ({mod.quiz.length} questions)
          </Link>
        </div>

        <nav className="flex justify-between gap-3 text-sm" aria-label="Module navigation">
          {prev ? (
            <Link to={`/${cert.id}/modules/${prev.id}`} className="text-slate-400 hover:text-white">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/${cert.id}/modules/${next.id}`} className="text-right text-slate-400 hover:text-white">
              {next.title} →
            </Link>
          ) : null}
        </nav>
      </article>
    </Layout>
  )
}
