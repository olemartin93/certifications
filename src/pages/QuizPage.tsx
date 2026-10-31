import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCertification, getModule } from '../data/catalog'
import type { QuizQuestion } from '../data/types'
import { accentClasses } from '../lib/accent'
import { MOCK_EXAM_ID, buildMockExam, shuffle } from '../lib/quiz'
import { recordQuizResult } from '../lib/progress'
import { Layout } from '../components/Layout'
import { Quiz } from '../components/Quiz'
import { NotFoundPage } from './NotFoundPage'

export function QuizPage() {
  const { certId, quizId } = useParams()
  const cert = getCertification(certId)
  const mod = cert && quizId !== MOCK_EXAM_ID ? getModule(cert, quizId) : undefined
  const isMock = quizId === MOCK_EXAM_ID
  const [attempt, setAttempt] = useState(0)
  const [questions, setQuestions] = useState<readonly QuizQuestion[]>(() => build())

  function build(): readonly QuizQuestion[] {
    if (!cert) return []
    if (isMock) return buildMockExam(cert)
    return mod ? shuffle(mod.quiz) : []
  }

  if (!cert || (!isMock && !mod) || questions.length === 0) return <NotFoundPage />

  const accent = accentClasses[cert.accent]
  const title = isMock ? `${cert.title} mock exam` : `Quiz: ${mod?.title ?? ''}`
  const backTo = mod ? `/${cert.id}/modules/${mod.id}` : `/${cert.id}`

  return (
    <Layout title={title} back={{ to: backTo, label: mod ? mod.title : cert.title }}>
      {isMock ? (
        <p className="mb-4 text-sm text-slate-400">
          {questions.length} practice questions drawn from every module. The real exam has {cert.exam.questions} questions in {cert.exam.durationMinutes} minutes.
        </p>
      ) : null}
      <Quiz
        key={attempt}
        questions={questions}
        passMarkPercent={cert.exam.passMarkPercent}
        buttonClass={accent.button}
        barClass={accent.bar}
        onFinish={(correct, total) => recordQuizResult(cert.id, quizId ?? '', correct, total)}
        onRestart={() => {
          setQuestions(build())
          setAttempt((a) => a + 1)
        }}
      />
      <Link to={`/${cert.id}`} className="mt-8 block text-center text-sm text-slate-400 underline underline-offset-2">
        Back to {cert.title}
      </Link>
    </Layout>
  )
}
