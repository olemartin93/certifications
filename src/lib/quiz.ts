import type { Certification, QuizQuestion } from '../data/types'

export const MOCK_EXAM_ID = 'mock'

export type RandomFn = () => number

/** Fisher–Yates shuffle that returns a new array. */
export function shuffle<T>(items: readonly T[], random: RandomFn = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    const a = result[i] as T
    result[i] = result[j] as T
    result[j] = a
  }
  return result
}

/** A mock exam draws from every module, up to the real exam's question count. */
export function buildMockExam(cert: Certification, random: RandomFn = Math.random): QuizQuestion[] {
  const all = cert.modules.flatMap((m) => m.quiz)
  return shuffle(all, random).slice(0, Math.min(cert.exam.questions, all.length))
}

export function scorePercent(correct: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((correct / total) * 100)
}

export function isPass(correct: number, total: number, passMarkPercent: number): boolean {
  return total > 0 && (correct / total) * 100 >= passMarkPercent
}
