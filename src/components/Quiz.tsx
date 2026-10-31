import { useState } from 'react'
import type { QuizQuestion } from '../data/types'
import { isPass, scorePercent } from '../lib/quiz'
import { ProgressBar } from './ProgressBar'

interface QuizProps {
  readonly questions: readonly QuizQuestion[]
  readonly passMarkPercent: number
  readonly buttonClass: string
  readonly barClass: string
  readonly onFinish: (correct: number, total: number) => void
  readonly onRestart: () => void
}

export function Quiz({ questions, passMarkPercent, buttonClass, barClass, onFinish, onRestart }: QuizProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [missed, setMissed] = useState<readonly QuizQuestion[]>([])
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const total = questions.length
  const question = questions[index]

  if (done || !question) {
    const pct = scorePercent(correct, total)
    const passed = isPass(correct, total, passMarkPercent)
    return (
      <section aria-live="polite" className="space-y-5">
        <div className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10">
          <p className="text-5xl" aria-hidden="true">{passed ? '🎉' : '📚'}</p>
          <h2 className="mt-3 text-2xl font-bold">
            {correct} / {total} correct
          </h2>
          <p className="mt-1 text-slate-300">
            {pct}% · pass mark {passMarkPercent}%
          </p>
          <p className={`mt-3 font-semibold ${passed ? 'text-emerald-300' : 'text-rose-300'}`}>
            {passed ? 'Passed! Nicely done 😏' : 'Not quite yet. Review and try again.'}
          </p>
          <button type="button" onClick={onRestart} className={`mt-5 w-full rounded-xl px-4 py-3 font-semibold text-white ${buttonClass}`}>
            Try again
          </button>
        </div>
        {missed.length > 0 ? (
          <div>
            <h3 className="mb-2 font-semibold text-slate-200">Review what you missed</h3>
            <ul className="space-y-3">
              {missed.map((q) => (
                <li key={q.id} className="rounded-xl bg-white/5 p-4 text-sm ring-1 ring-white/10">
                  <p className="font-medium">{q.question}</p>
                  <p className="mt-1 text-emerald-300">✓ {q.options[q.answerIndex]}</p>
                  <p className="mt-1 text-slate-400">{q.explanation}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    )
  }

  const answered = selected !== null
  const isLast = index === total - 1

  function choose(optionIndex: number) {
    if (answered || !question) return
    setSelected(optionIndex)
    if (optionIndex === question.answerIndex) setCorrect((c) => c + 1)
    else setMissed((m) => [...m, question])
  }

  function next() {
    if (isLast) {
      setDone(true)
      onFinish(correct, total)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>{correct} correct</span>
      </div>
      <ProgressBar value={index + (answered ? 1 : 0)} max={total} label="Quiz progress" barClass={barClass} />
      <h2 className="pt-2 text-xl leading-snug font-semibold">{question.question}</h2>
      <ul className="space-y-2.5" aria-label="Answer options">
        {question.options.map((option, i) => {
          const isCorrect = i === question.answerIndex
          const isChosen = i === selected
          let style = 'bg-white/5 ring-white/10 hover:bg-white/10'
          if (answered && isCorrect) style = 'bg-emerald-500/20 ring-2 ring-emerald-400'
          else if (answered && isChosen) style = 'bg-rose-500/20 ring-2 ring-rose-400'
          else if (answered) style = 'bg-white/5 ring-white/10 opacity-60'
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={answered}
                aria-pressed={isChosen}
                className={`flex w-full items-start gap-3 rounded-xl p-4 text-left ring-1 transition ${style}`}
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {answered && isCorrect ? <span className="ml-auto text-emerald-300" aria-label="Correct answer">✓</span> : null}
                {answered && isChosen && !isCorrect ? <span className="ml-auto text-rose-300" aria-label="Your answer, incorrect">✗</span> : null}
              </button>
            </li>
          )
        })}
      </ul>
      {answered ? (
        <div aria-live="polite" className="space-y-4">
          <div className={`rounded-xl p-4 text-sm ${selected === question.answerIndex ? 'bg-emerald-500/10 text-emerald-100' : 'bg-rose-500/10 text-rose-100'}`}>
            <p className="font-semibold">{selected === question.answerIndex ? 'Correct!' : 'Not quite.'}</p>
            <p className="mt-1 opacity-90">{question.explanation}</p>
          </div>
          <button type="button" onClick={next} className={`w-full rounded-xl px-4 py-3 font-semibold text-white ${buttonClass}`}>
            {isLast ? 'See results' : 'Next question'}
          </button>
        </div>
      ) : null}
    </section>
  )
}
