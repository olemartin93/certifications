import { Link, useParams } from 'react-router-dom'
import { getCertification } from '../data/catalog'
import { accentClasses } from '../lib/accent'
import { MOCK_EXAM_ID } from '../lib/quiz'
import { progressKey, resetProgress, useProgress } from '../lib/progress'
import { Layout } from '../components/Layout'
import { Tldr } from '../components/Tldr'
import { NotFoundPage } from './NotFoundPage'

export function CertificationPage() {
  const { certId } = useParams()
  const cert = getCertification(certId)
  const progress = useProgress()
  if (!cert) return <NotFoundPage />

  const accent = accentClasses[cert.accent]
  const mock = progress.quizzes[progressKey(cert.id, MOCK_EXAM_ID)]

  return (
    <Layout title={cert.title} back={{ to: '/', label: 'catalog' }}>
      <div className="space-y-6">
        <div className={`rounded-2xl bg-gradient-to-br p-5 text-white ${accent.gradient}`}>
          <p className="text-sm text-white/80">
            {cert.provider} · {cert.level}
          </p>
          <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-black/15 p-2">
              <dt className="text-xs text-white/75">Questions</dt>
              <dd className="text-lg font-bold">{cert.exam.questions}</dd>
            </div>
            <div className="rounded-xl bg-black/15 p-2">
              <dt className="text-xs text-white/75">Minutes</dt>
              <dd className="text-lg font-bold">{cert.exam.durationMinutes}</dd>
            </div>
            <div className="rounded-xl bg-black/15 p-2">
              <dt className="text-xs text-white/75">Pass mark</dt>
              <dd className="text-lg font-bold">{cert.exam.passMarkPercent}%</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-white/85">{cert.exam.format}</p>
        </div>

        <Tldr points={cert.tldr} />

        <section>
          <h2 className="mb-3 text-lg font-semibold">Learning materials</h2>
          <ol className="space-y-2.5">
            {cert.modules.map((m, i) => {
              const key = progressKey(cert.id, m.id)
              const read = progress.readModules[key] === true
              const result = progress.quizzes[key]
              return (
                <li key={m.id}>
                  <Link to={`/${cert.id}/modules/${m.id}`} className="flex items-center gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${read ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-300'}`}
                      aria-label={read ? 'Read' : undefined}
                    >
                      {read ? '✓' : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{m.title}</span>
                      <span className="block text-xs text-slate-400">
                        {m.quiz.length} quiz questions
                        {result ? ` · best ${result.best}/${result.total}` : ''}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-slate-500">›</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>

        <Link to={`/${cert.id}/quiz/${MOCK_EXAM_ID}`} className={`block rounded-xl px-4 py-4 text-center font-semibold text-white ${accent.button}`}>
          Take a mock exam 📝
          {mock ? <span className="block text-xs font-normal opacity-85">Best so far: {mock.best}/{mock.total}</span> : null}
        </Link>

        <section aria-labelledby="sources-heading" className="rounded-2xl bg-white/5 p-4 text-sm ring-1 ring-white/10">
          <h2 id="sources-heading" className="mb-2 font-semibold">Sources</h2>
          <ul className="space-y-1.5">
            {cert.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-2 ${accent.text}`}>
                  {s.title}
                </a>
                <span className="text-slate-400"> · {s.publisher}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-400">
            Content last reviewed {cert.lastReviewed}. Always check the official syllabus before your exam; questions here are practice questions, not official exam questions.
          </p>
        </section>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all progress and quiz scores?')) resetProgress()
          }}
          className="w-full text-center text-xs text-slate-500 underline underline-offset-2"
        >
          Reset progress
        </button>
      </div>
    </Layout>
  )
}
